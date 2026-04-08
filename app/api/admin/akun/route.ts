import { db } from "@/src/db";
import { user } from "@/auth-schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/password";

export async function GET() {
    try {
        // Cek apakah db terinisialisasi
        if (!db) {
        throw new Error("Database connection not established");
        }

        const data = await db.select().from(user).orderBy(desc(user.createdAt));
        
        // Pastikan selalu mengembalikan array
        return NextResponse.json(data || []);
    } catch (error: any) {
        // LIHAT ERROR INI DI TERMINAL VSCODE ANDA
        console.error("CRITICAL_DATABASE_ERROR:", error.message);
        
        return NextResponse.json(
        { error: "Gagal memuat data database", message: error.message },
        { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log("Data diterima API:", body);

        // Validasi input
        if (!body.username || !body.password) {
            return NextResponse.json(
                { error: "Username dan password wajib diisi" },
                { status: 400 }
            );
        }

        // Hash password sebelum disimpan
        const hashedPassword = await hashPassword(body.password);
        console.log("Password berhasil di-hash");

        // Simpan ke database dengan password yang sudah di-hash
        const result = await db.insert(user).values({
            username: body.username,
            password: hashedPassword,
            role: body.role || "view",
        });

        console.log("Hasil Insert:", result);
        return NextResponse.json({ success: true, message: "Data tersimpan" });
    } catch (error: any) {
        console.error("Gagal Simpan:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}