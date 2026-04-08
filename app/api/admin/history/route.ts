import { db } from "@/src/db";
import { uangMasuk, uangKeluar } from "@/src/db/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        console.log("=== HISTORY API START ===");
        
        if (!db) {
            throw new Error("Database connection not established");
        }

        // Ambil data uang masuk
        console.log("Fetching uang masuk...");
        const masukData = await db.select().from(uangMasuk).orderBy(desc(uangMasuk.createdAt));
        console.log("Uang masuk:", masukData);
        
        // Ambil data uang keluar
        console.log("Fetching uang keluar...");
        const keluarData = await db.select().from(uangKeluar).orderBy(desc(uangKeluar.createdAt));
        console.log("Uang keluar:", keluarData);

        // Transform dan gabungkan data
        const masuk = masukData.map(item => ({
            id: item.id,
            jmlUang: item.jmlUang,
            keterangan: item.keterangan,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            tipe: 'MASUK'
        }));

        const keluar = keluarData.map(item => ({
            id: item.id,
            jmlUang: item.jmlUang,
            keterangan: item.keterangan,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            tipe: 'KELUAR'
        }));

        // Gabung dan sort by tanggal terbaru
        const combined = [...masuk, ...keluar].sort((a, b) => {
            const dateA = new Date(a.createdAt || 0).getTime();
            const dateB = new Date(b.createdAt || 0).getTime();
            return dateB - dateA;
        });

        console.log("Final combined data:", combined);
        console.log("=== HISTORY API END ===");
        
        return NextResponse.json(combined);
    } catch (error: any) {
        console.error("CRITICAL_DATABASE_ERROR:", error.message);
        console.error("Error stack:", error.stack);

        return NextResponse.json(
            { error: "Gagal memuat data database", message: error.message, details: error.stack },
            { status: 500 }
        );
    }
}