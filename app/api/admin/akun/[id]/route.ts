import { db } from "@/src/db";
import { users } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { hashPassword } from "@/lib/password";

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> | { id: string } }
) {
    try {
        const resolvedParams = await params;
        const id = parseInt(resolvedParams.id);

        await db.delete(users).where(eq(users.id, id));

        return NextResponse.json({ message: "Data berhasil dihapus" });
    } catch (error: any) {
        console.error("DELETE_ERROR:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}