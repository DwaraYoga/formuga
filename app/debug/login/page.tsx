"use client";

import React, { useState } from "react";

export default function DebugLoginPage() {
    const [username, setUsername] = useState("admin");
    const [password, setPassword] = useState("");
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleTest = async () => {
        setLoading(true);
        try {
            const res = await fetch(
                `/api/debug/login?username=${username}&password=${password}`
            );
            const data = await res.json();
            setResult(data);
        } catch (err) {
            setResult({ error: String(err) });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white p-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">🔧 Debug Login</h1>

                <div className="bg-slate-800 p-6 rounded-lg space-y-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white"
                        />
                    </div>

                    <button
                        onClick={handleTest}
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 py-2 rounded font-medium transition"
                    >
                        {loading ? "Testing..." : "Test Login"}
                    </button>
                </div>

                {result && (
                    <div
                        className={`p-6 rounded-lg font-mono text-sm overflow-auto max-h-96 ${
                            result.success
                                ? "bg-green-900 border border-green-700"
                                : "bg-red-900 border border-red-700"
                        }`}
                    >
                        <pre>{JSON.stringify(result, null, 2)}</pre>
                    </div>
                )}

                <div className="mt-8 bg-slate-800 p-6 rounded-lg">
                    <h2 className="text-lg font-semibold mb-4">Langkah-langkah:</h2>
                    <ol className="space-y-3 text-sm">
                        <li>
                            1. Buka <a href="/register" className="text-blue-400 underline">/register</a> untuk buat akun baru
                        </li>
                        <li>
                            2. Isi username dan password, pilih role (admin/view)
                        </li>
                        <li>
                            3. Kembali ke halaman ini dan test login dengan data yang sama
                        </li>
                        <li>
                            4. Jika "success: true", maka login logic berjalan dengan baik
                        </li>
                        <li>
                            5. Jika masih error, check console log di browser (F12)
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    );
}
