import { NextRequest, NextResponse } from "next/server";
import { db } from "@/src/db";
import { session as sessionTable, user } from "@/auth-schema";
import { eq, and, gt } from "drizzle-orm";

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    
    // Get session token dari cookie
    const sessionToken = request.cookies.get("__auth__")?.value;

    if (!sessionToken) {
        return NextResponse.redirect(new URL("/login", request.url));
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
        // Session tidak valid atau expired
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("__auth__");
        return response;
    }

    const userRole = sessions[0].user.role;

    // Cek role untuk route admin
    if (pathname.startsWith("/admin")) {
        if (userRole !== "admin") {
            return NextResponse.redirect(new URL("/view", request.url));
        }
    }

    // Cek role untuk route view
    if (pathname.startsWith("/view")) {
        if (userRole !== "view" && userRole !== "admin") {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/view/:path*", "/register", "/debug/:path*"],
};