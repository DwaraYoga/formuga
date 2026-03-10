import 'dotenv/config'; // Tambahkan ini di baris paling atas
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

// Tambahkan pengecekan log untuk memastikan URL terbaca di terminal
if (!process.env.DATABASE_URL) {
    console.error("ALERTA: DATABASE_URL tidak terbaca dari .env!");
}

const connection = await mysql.createConnection(process.env.DATABASE_URL!);
export const db = drizzle(connection, { schema, mode: "default" });