import { NextRequest, NextResponse } from "next/server";
import { db } from "@/src/db";
import { user, session as sessionTable } from "@/auth-schema";
import { eq } from "drizzle-orm";
import { verifyPassword } from "@/lib/password";
import { z } from "zod";
import { randomBytes } from "crypto";

const signInSchema = z.object({
    username: z.string().min(1),
    password: z.string().min(1),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { username, password } = signInSchema.parse(body);

        // Cari user di database
        const users = await db
            .select()
            .from(user)
            .where(eq(user.username, username))
            .limit(1);

        if (users.length === 0) {
            return NextResponse.json(
                { error: "Username atau password salah" },
                { status: 401 }
            );
        }

        const foundUser = users[0];

        // Verify password
        const isPasswordValid = await verifyPassword(
            password,
            foundUser.password
        );

        if (!isPasswordValid) {
            return NextResponse.json(
                { error: "Username atau password salah" },
                { status: 401 }
            );
        }

        // Create session token di database
        const sessionId = `session_${Date.now()}`;
        const sessionToken = randomBytes(32).toString("hex");
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

        await db.insert(sessionTable).values({
            id: sessionId,
            userId: foundUser.id,
            token: sessionToken,
            expiresAt: expiresAt,
            ipAddress: request.headers.get("x-forwarded-for") || "127.0.0.1",
            userAgent: request.headers.get("user-agent") || "",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const response = NextResponse.json(
            {
                success: true,
                user: {
                    id: foundUser.id,
                    username: foundUser.username,
                    role: foundUser.role,
                },
            },
            { status: 200 }
        );

        // Set session cookie
        response.cookies.set("__auth__", sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60, // 7 days
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Sign in error:", error);
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: "Username dan password diperlukan" },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { error: "Gagal login" },
            { status: 500 }
        );
    }
}
