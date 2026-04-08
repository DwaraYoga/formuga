import { NextRequest, NextResponse } from "next/server";
import { db } from "@/src/db";
import { session as sessionTable, user } from "@/auth-schema";
import { eq, and, gt } from "drizzle-orm";

export async function GET(request: NextRequest) {
    try {
        const sessionToken = request.cookies.get("__auth__")?.value;

        if (!sessionToken) {
            return NextResponse.json(
                { error: "No session" },
                { status: 401 }
            );
        }

        // Validasi session di database
        const sessions = await db
            .select({
                session: sessionTable,
                user: user,
            })
            .from(sessionTable)
            .innerJoin(user, eq(sessionTable.userId, user.id))
            .where(
                and(
                    eq(sessionTable.token, sessionToken),
                    gt(sessionTable.expiresAt, new Date())
                )
            )
            .limit(1);

        if (sessions.length === 0) {
            return NextResponse.json(
                { error: "Session expired or invalid" },
                { status: 401 }
            );
        }

        return NextResponse.json({
            user: {
                id: sessions[0].user.id,
                username: sessions[0].user.username,
                role: sessions[0].user.role,
            },
            session: sessions[0].session,
        });
    } catch (error) {
        console.error("Get session error:", error);
        return NextResponse.json(
            { error: "Failed to get session" },
            { status: 500 }
        );
    }
}
