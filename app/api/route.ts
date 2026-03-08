// app/api/test-db/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/src/db';
import { sql } from 'drizzle-orm';

export async function GET() {
    try {
        const result = await db.execute(sql`SELECT 1 + 1 AS hasil`);
        return NextResponse.json({ connected: true, result });
    } catch (error: any) {
        return NextResponse.json({ connected: false, error: error.message }, { status: 500 });
    }
}