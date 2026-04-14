"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ViewPage() {
    const router = useRouter();
    const [uangMasuk, setUangMasuk] = useState<any[]>([]);
    const [uangKeluar, setUangKeluar] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch session data
                const sessionRes = await fetch("/api/auth/session", {
                    credentials: "include",
                });
                
                if (!sessionRes.ok) {
                    router.push("/login");
                    return;
                }

                const sessionData = await sessionRes.json();

                if (!sessionData.user) {
                    router.push("/login");
                    return;
                }

                // Cek role, jika bukan view redirect ke login
                if (sessionData.user.role !== "view") {
                    router.push("/login");
                    return;
                }

                setUser(sessionData.user);

                // Fetch data
                const [masukRes, keluarRes] = await Promise.all([
                    fetch("/api/admin/uang-masuk"),
                    fetch("/api/admin/uang-keluar"),
                ]);

                const masukData = await masukRes.json();
                const keluarData = await keluarRes.json();

                if (masukRes.ok && Array.isArray(masukData)) {
                    setUangMasuk(masukData);
                }
                if (keluarRes.ok && Array.isArray(keluarData)) {
                    setUangKeluar(keluarData);
                }
            } catch (err) {
                console.error("Error:", err);
                router.push("/login");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [router]);

    const handleLogout = async () => {
        try {
            await fetch("/api/auth/sign-out", {
                method: "POST",
                credentials: "include",
            });
            router.push("/login");
        } catch (err) {
            console.error("Logout error:", err);
            router.push("/login");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <p className="text-slate-600">Loading...</p>
            </div>
        );
    }

    const totalMasuk = uangMasuk.reduce((sum, item) => sum + (item.jmlUang || 0), 0);
    const totalKeluar = uangKeluar.reduce((sum, item) => sum + (item.jmlUang || 0), 0);
    const saldo = totalMasuk - totalKeluar;

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="font-black text-2xl tracking-tighter">FORMUGA</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-slate-600">
                            Welcome, <strong>{user?.username}</strong>
                        </span>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                            <LogOut size={16} />
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h2>
                    <p className="text-slate-600">
                        Lihat ringkasan keuangan organisasi
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Uang Masuk */}
                    <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
                        <p className="text-slate-600 text-sm font-medium mb-1">
                            Total Uang Masuk
                        </p>
                        <p className="text-3xl font-bold text-green-600">
                            Rp {totalMasuk.toLocaleString("id-ID")}
                        </p>
                        <p className="text-xs text-slate-500 mt-2">
                            {uangMasuk.length} transaksi
                        </p>
                    </div>

                    {/* Uang Keluar */}
                    <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-red-500">
                        <p className="text-slate-600 text-sm font-medium mb-1">
                            Total Uang Keluar
                        </p>
                        <p className="text-3xl font-bold text-red-600">
                            Rp {totalKeluar.toLocaleString("id-ID")}
                        </p>
                        <p className="text-xs text-slate-500 mt-2">
                            {uangKeluar.length} transaksi
                        </p>
                    </div>

                    {/* Saldo */}
                    <div
                        className={`rounded-lg shadow-sm p-6 border-l-4 ${
                            saldo >= 0
                                ? "bg-white border-blue-500"
                                : "bg-white border-orange-500"
                        }`}
                    >
                        <p className="text-slate-600 text-sm font-medium mb-1">
                            Saldo
                        </p>
                        <p
                            className={`text-3xl font-bold ${
                                saldo >= 0 ? "text-blue-600" : "text-orange-600"
                            }`}
                        >
                            Rp {saldo.toLocaleString("id-ID")}
                        </p>
                        <p className="text-xs text-slate-500 mt-2">
                            {saldo >= 0 ? "Kelebihan" : "Kekurangan"}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Tabel Uang Masuk */}
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                            <h3 className="font-bold text-slate-900">
                                Daftar Uang Masuk
                            </h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-slate-100 border-b border-slate-200">
                                    <tr>
                                        <th className="text-left px-6 py-3 font-semibold text-slate-700">
                                            Keterangan
                                        </th>
                                        <th className="text-right px-6 py-3 font-semibold text-slate-700">
                                            Jumlah
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {uangMasuk.length > 0 ? (
                                        uangMasuk.map((item) => (
                                            <tr
                                                key={item.id}
                                                className="border-b border-slate-100 hover:bg-slate-50"
                                            >
                                                <td className="px-6 py-3">
                                                    {item.keterangan}
                                                </td>
                                                <td className="text-right px-6 py-3 text-green-600 font-medium">
                                                    Rp{" "}
                                                    {item.jmlUang.toLocaleString(
                                                        "id-ID"
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={2}
                                                className="px-6 py-8 text-center text-slate-500"
                                            >
                                                Tidak ada data
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Tabel Uang Keluar */}
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                            <h3 className="font-bold text-slate-900">
                                Daftar Uang Keluar
                            </h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-slate-100 border-b border-slate-200">
                                    <tr>
                                        <th className="text-left px-6 py-3 font-semibold text-slate-700">
                                            Keterangan
                                        </th>
                                        <th className="text-right px-6 py-3 font-semibold text-slate-700">
                                            Jumlah
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {uangKeluar.length > 0 ? (
                                        uangKeluar.map((item) => (
                                            <tr
                                                key={item.id}
                                                className="border-b border-slate-100 hover:bg-slate-50"
                                            >
                                                <td className="px-6 py-3">
                                                    {item.keterangan}
                                                </td>
                                                <td className="text-right px-6 py-3 text-red-600 font-medium">
                                                    Rp{" "}
                                                    {item.jmlUang.toLocaleString(
                                                        "id-ID"
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={2}
                                                className="px-6 py-8 text-center text-slate-500"
                                            >
                                                Tidak ada data
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
