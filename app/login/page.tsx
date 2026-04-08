"use client";

import React, { useState } from "react";
import { ArrowLeft, Lock, User, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Gunakan custom endpoint untuk sign-in
            const res = await fetch("/api/auth/sign-in-username", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
                credentials: "include", // Penting untuk set cookies
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Login gagal");
                return;
            }

            // Redirect berdasarkan role dari response
            const role = data.user.role;
            if (role === "admin") {
                router.push("/admin/beranda");
            } else if (role === "view") {
                router.push("/view");
            } else {
                setError("Role tidak dikenal");
            }
        } catch (err: any) {
            setError(err?.message || "Terjadi kesalahan");
            console.error("Login exception:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-center items-center px-6">
            
            <a
                href="/"
                className="fixed top-8 left-8 flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-black transition-colors group"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Ke Landing Page
            </a>

            <div className="w-full max-w-100 space-y-10">
                
                <div className="text-center space-y-2">
                    <div className="font-black text-2xl tracking-tighter mb-8">FORMUGA</div>
                    <h1 className="text-3xl font-bold tracking-tight">Selamat Datang.</h1>
                    <p className="text-slate-500 font-light">
                        Silakan masuk untuk mengelola Dashboard Formuga.
                    </p>
                </div>

                {/* FORM */}
                <form className="space-y-4" onSubmit={handleLogin}>
                    
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                            Username
                        </label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Masukkan username"
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4"
                            />
                        </div>
                    </div>

                    {/* ERROR */}
                    {error && (
                        <p className="text-red-500 text-sm">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="group w-full bg-slate-900 text-white font-bold py-4 rounded-2xl mt-6 flex items-center justify-center gap-2"
                    >
                        {loading ? "Loading..." : "Masuk Sekarang"}
                        <ArrowRight size={18} />
                    </button>
                </form>

            </div>
        </div>
    );
}