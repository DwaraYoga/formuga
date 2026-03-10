import { db } from "@/src/db";
import { uangMasuk } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> | { id: string } } 
) {
    try {
        // Next.js 15+ mewajibkan await pada params
        const resolvedParams = await params; 
        const id = parseInt(resolvedParams.id);
        
        const body = await req.json();

        // Validasi ID
        if (isNaN(id)) {
            return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
        }

        const result = await db.update(uangMasuk)
            .set({
                jmlUang: Number(body.jmlUang),
                keterangan: body.keterangan,
                updatedAt: new Date(), // Pastikan kolom ini ada di schema
            })
            .where(eq(uangMasuk.id, id));

        return NextResponse.json({ message: "Data berhasil diperbarui", result });
    } catch (error: any) {
        console.error("PATCH_ERROR:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> | { id: string } }
) {
    try {
        const resolvedParams = await params;
        const id = parseInt(resolvedParams.id);

        await db.delete(uangMasuk).where(eq(uangMasuk.id, id));

        return NextResponse.json({ message: "Data berhasil dihapus" });
    } catch (error: any) {
        console.error("DELETE_ERROR:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}