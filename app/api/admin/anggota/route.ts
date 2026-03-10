import { db } from "@/src/db";
import { anggota } from "@/src/db/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Cek apakah db terinisialisasi
        if (!db) {
        throw new Error("Database connection not established");
        }

        const data = await db.select().from(anggota).orderBy(desc(anggota.createdAt));
        
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
        console.log("Data diterima API:", body); // Cek terminal VSCode Anda

        // WAJIB pakai await agar database punya waktu untuk menulis
        const result = await db.insert(anggota).values({
        nama: body.nama,
        status: body.status,
        // Jika kolom createdAt di schema tidak pakai .defaultNow(), tambahkan manual:
        // createdAt: new Date(),
        });

        console.log("Hasil Insert:", result);
        return NextResponse.json({ success: true, message: "Data tersimpan" });
    } catch (error: any) {
        console.error("Gagal Simpan:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}