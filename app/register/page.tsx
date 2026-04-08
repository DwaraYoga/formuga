"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("view");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");

        try {
            const res = await fetch("/api/admin/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password, role }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Gagal membuat akun");
                return;
            }

            setMessage(`Akun '${username}' berhasil dibuat dengan role '${role}'`);
            setUsername("");
            setPassword("");
            setRole("view");
        } catch (err) {
            setError("Terjadi kesalahan");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-center items-center px-6">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold">Buat Akun</h1>
                    <p className="text-slate-500">
                        Buat akun baru untuk testing login
                    </p>
                </div>

                <form className="space-y-4" onSubmit={handleRegister}>
                    <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="admin"
                            className="w-full bg-slate-50 border border-slate-100 rounded-lg py-3 px-4 mt-1.5"
                        />
                    </div>

                    <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full bg-slate-50 border border-slate-100 rounded-lg py-3 px-4 mt-1.5"
                        />
                    </div>

                    <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                            Role
                        </label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-100 rounded-lg py-3 px-4 mt-1.5"
                        >
                            <option value="admin">Admin</option>
                            <option value="view">View</option>
                        </select>
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {message && <p className="text-green-500 text-sm">{message}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg mt-6"
                    >
                        {loading ? "Loading..." : "Buat Akun"}
                    </button>

                    <p className="text-center text-sm text-slate-600">
                        Sudah punya akun?{" "}
                        <a
                            href="/login"
                            className="text-blue-600 hover:underline font-medium"
                        >
                            Login di sini
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}
