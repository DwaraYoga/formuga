import { db } from "@/src/db";
import { uangMasuk } from "@/src/db/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Cek apakah db terinisialisasi
        if (!db) {
        throw new Error("Database connection not established");
        }

        const data = await db.select().from(uangMasuk).orderBy(desc(uangMasuk.createdAt));
        
        return NextResponse.json(data || []);
    } catch (error: any) {
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

        
        const result = await db.insert(uangMasuk).values({
        jmlUang: Number(body.jmlUang), // convert ke number
        keterangan: body.keterangan,

        });

        console.log("Hasil Insert:", result);
        return NextResponse.json({ success: true, message: "Data tersimpan" });
    } catch (error: any) {
        console.error("Gagal Simpan:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}