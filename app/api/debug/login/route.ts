import { NextRequest, NextResponse } from "next/server";
import { db } from "@/src/db";
import { user } from "@/auth-schema";
import { eq } from "drizzle-orm";
import { verifyPassword } from "@/lib/password";

/**
 * DEBUG ENDPOINT - Untuk test login tanpa better-auth
 * GET http://localhost:3000/api/debug/login?username=admin&password=123456
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const username = searchParams.get("username");
        const password = searchParams.get("password");

        if (!username || !password) {
            return NextResponse.json({
                error: "Username dan password diperlukan",
                hint: "GET /api/debug/login?username=admin&password=123456",
            });
        }

        // Cari user di database
        const users = await db
            .select()
            .from(user)
            .where(eq(user.username, username))
            .limit(1);

        if (users.length === 0) {
            return NextResponse.json({
                success: false,
                error: "Username tidak ditemukan",
                searchedUsername: username,
            });
        }

        const foundUser = users[0];

        // Verify password
        const isPasswordValid = await verifyPassword(
            password,
            foundUser.password
        );

        if (!isPasswordValid) {
            return NextResponse.json({
                success: false,
                error: "Password salah",
                username: foundUser.username,
                dbPasswordHash: foundUser.password.substring(0, 20) + "...",
            });
        }

        return NextResponse.json({
            success: true,
            message: "Login berhasil",
            user: {
                id: foundUser.id,
                username: foundUser.username,
                role: foundUser.role,
                createdAt: foundUser.createdAt,
            },
        });
    } catch (error) {
        console.error("Debug login error:", error);
        return NextResponse.json(
            {
                error: "Terjadi kesalahan",
                details: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}
