'use client';

import React, { useState, useEffect } from 'react';
import { Loader2, TrendingUp, TrendingDown } from 'lucide-react';

export default function HistoryPage() {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    const fetchData = async () => {
        try {
            setLoading(true);
            setError('');
            const res = await fetch('/api/admin/history');
            console.log('Response status:', res.status);
            console.log('Response ok:', res.ok);
            
            const result = await res.json();
            console.log('API Result:', result);

            // VALIDASI KRUSIAL: Hanya setData jika result adalah Array
            if (res.ok && Array.isArray(result)) {
                console.log('Setting data:', result);
                setData(result);
            } else {
                console.error("API Error Response:", result);
                setError(result.error || 'Gagal memuat data');
                setData([]);
            }
        } catch (err: any) {
            console.error("Fetch Error:", err);
            setError('Terjadi kesalahan: ' + err.message);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Hitung total masuk dan keluar
    const totalMasuk = data
        .filter(item => item.tipe === 'MASUK')
        .reduce((sum, item) => sum + Number(item.jmlUang), 0);
    
    const totalKeluar = data
        .filter(item => item.tipe === 'KELUAR')
        .reduce((sum, item) => sum + Number(item.jmlUang), 0);

    const saldo = totalMasuk - totalKeluar;

    return (
        <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-700">
        {/* Header */}
        <div>
            <h1 className="text-4xl font-black text-slate-900">History</h1>
            <p className="text-slate-400 font-light mt-1">Riwayat semua transaksi kas Formuga.</p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                        <TrendingUp className="text-green-600" size={20} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Uang Masuk</span>
                </div>
                <p className="text-2xl font-black text-slate-900">
                    Rp {totalMasuk.toLocaleString('id-ID')}
                </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                        <TrendingDown className="text-red-600" size={20} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Uang Keluar</span>
                </div>
                <p className="text-2xl font-black text-slate-900">
                    Rp {totalKeluar.toLocaleString('id-ID')}
                </p>
            </div>

            <div className={`bg-white p-6 rounded-2xl border shadow-sm ${saldo >= 0 ? 'border-green-100 bg-green-50/50' : 'border-red-100 bg-red-50/50'}`}>
                <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Saldo</span>
                </div>
                <p className={`text-2xl font-black ${saldo >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    Rp {saldo.toLocaleString('id-ID')}
                </p>
            </div>
        </div>

        {/* Error Alert */}
        {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-red-700 text-sm">
                {error}
            </div>
        )}

        {/* Tabel Data */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
            {loading ? (
                <div className="flex items-center justify-center py-16">
                    <div className="flex flex-col items-center gap-2">
                        <Loader2 className="animate-spin text-slate-400" size={32} />
                        <p className="text-slate-500 text-sm font-medium">Memuat data...</p>
                    </div>
                </div>
            ) : data.length === 0 ? (
                <div className="flex items-center justify-center py-16">
                    <div className="text-center">
                        <p className="text-slate-500 text-sm font-medium">Belum ada data transaksi</p>
                        <p className="text-slate-400 text-xs mt-1">Data transaksi akan tampil di sini</p>
                    </div>
                </div>
            ) : (
                <table className="w-full text-left">
                    <thead className="bg-slate-50/50 border-b border-slate-100">
                        <tr>
                            <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Tanggal</th>
                            <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Tipe</th>
                            <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Nominal</th>
                            <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Keterangan</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {data.map((item, idx) => (
                            <tr key={idx} className="group hover:bg-slate-50/30 transition-colors">
                                <td className="p-6 text-sm text-slate-500 font-medium">
                                {new Date(item.createdAt).toLocaleDateString('id-ID', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                                </td>
                                <td className="p-6">
                                    <span className={`px-3 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 ${
                                        item.tipe === 'MASUK'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-red-100 text-red-700'
                                    }`}>
                                        {item.tipe === 'MASUK' ? (
                                            <TrendingUp size={14} />
                                        ) : (
                                            <TrendingDown size={14} />
                                        )}
                                        {item.tipe === 'MASUK' ? 'Masuk' : 'Keluar'}
                                    </span>
                                </td>
                                <td className="p-6 font-bold text-slate-900">
                                    <span className={item.tipe === 'MASUK' ? 'text-green-600' : 'text-red-600'}>
                                        {item.tipe === 'MASUK' ? '+' : '-'} Rp {Number(item.jmlUang).toLocaleString('id-ID')}
                                    </span>
                                </td>
                                <td className="p-6 text-slate-500 font-light text-sm max-w-xs truncate">
                                    {item.keterangan}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
        </div>
    );
}