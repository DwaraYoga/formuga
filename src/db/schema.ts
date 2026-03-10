// src/db/schema.ts
import { mysqlTable, int, bigint, varchar, timestamp, mysqlEnum } from "drizzle-orm/mysql-core";

export const uangMasuk = mysqlTable("uang_masuk", {
    id: int("id").primaryKey().autoincrement(),
    jmlUang: bigint("jml_uang", { mode: "number" }).notNull(),
    keterangan: varchar("keterangan", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const uangKeluar = mysqlTable("uang_keluar", {
    id: int("id").primaryKey().autoincrement(),
    jmlUang: bigint("jml_uang", { mode: "number" }).notNull(),
    keterangan: varchar("keterangan", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const users = mysqlTable("users", {
    id: int("id").primaryKey().autoincrement(),
    username: varchar("username", { length: 255 }).notNull(),
    password: varchar("password", { length: 255 }).notNull(),
    role: mysqlEnum("role", ["admin", "view"]).notNull().default("view"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const anggota = mysqlTable("anggota", {
    id: int("id").primaryKey().autoincrement(),
    nama: varchar("nama", { length: 255 }).notNull(),
    status: mysqlEnum("status", ["aktif", "non-aktif"]).notNull().default("aktif"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});
