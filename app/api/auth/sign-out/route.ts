import { NextRequest, NextResponse } from "next/server";
import { db } from "@/src/db";
import { session as sessionTable } from "@/auth-schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
    try {
        const sessionToken = request.cookies.get("__auth__")?.value;

        if (sessionToken) {
            // Hapus session dari database
            await db
                .delete(sessionTable)
                .where(eq(sessionTable.token, sessionToken));
        }

        // Clear cookie
        const response = NextResponse.json(
            { success: true, message: "Logout berhasil" },
            { status: 200 }
        );

        response.cookies.delete("__auth__");

        return response;
    } catch (error) {
        console.error("Logout error:", error);
        return NextResponse.json(
            { error: "Gagal logout" },
            { status: 500 }
        );
    }
}
