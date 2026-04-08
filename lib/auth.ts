import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/src/db";
import { username } from "better-auth/plugins";


export const auth = betterAuth({
    database: drizzleAdapter(db, { 
        provider: "mysql", 
    }),
    emailAndPassword: { enabled: false },
    plugins: [username()],
    secret: process.env.BETTER_AUTH_SECRET || "your-secret-key-change-in-production",
    basePath: "/api/auth",
});