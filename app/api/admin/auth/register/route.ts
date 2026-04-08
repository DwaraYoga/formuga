import { NextRequest, NextResponse } from "next/server";
import { db } from "@/src/db";
import { user } from "@/auth-schema";
import { eq } from "drizzle-orm";
import { hashPassword } from "@/lib/password";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { username, password, role = "view" } = body;

        // Validasi input
        if (!username || !password) {
            return NextResponse.json(
                { error: "Username dan password diperlukan" },
                { status: 400 }
            );
        }

        // Cek apakah username sudah ada
        const existingUser = await db
            .select()
            .from(user)
            .where(eq(user.username, username))
            .limit(1);

        if (existingUser.length > 0) {
            return NextResponse.json(
                { error: "Username sudah terdaftar" },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Buat user baru
        const newUser = await db.insert(user).values({
            id: `user_${Date.now()}`,
            username,
            password: hashedPassword,
            role: role as "admin" | "view",
        });

        return NextResponse.json(
            { message: "User berhasil dibuat", username },
            { status: 201 }
        );
    } catch (error) {
        console.error("Register error:", error);
        return NextResponse.json(
            { error: "Gagal membuat user" },
            { status: 500 }
        );
    }
}
