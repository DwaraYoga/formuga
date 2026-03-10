'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, Wallet, Loader2 } from 'lucide-react';

export default function UangKeluarPage() {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ jmlUang: '', keterangan: '' });
    const [isEditing, setIsEditing] = useState<number | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/admin/uang-keluar');
            const result = await res.json();

            // VALIDASI KRUSIAL: Hanya setData jika result adalah Array
            if (res.ok && Array.isArray(result)) {
                setData(result);
            } else {
                console.error("API Error Response:", result);
                setData([]); // Kembalikan ke array kosong jika server kirim error
            }
        } catch (err) {
            console.error("Fetch Error:", err);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    
    const handleEditClick = (item: any) => {
        setIsEditing(item.id);
        setForm({ 
            jmlUang: item.jmlUang.toString(), 
            keterangan: item.keterangan 
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Yakin ingin menghapus data ini?")) return;
        
        try {
            const res = await fetch(`/api/admin/uang-keluar/${id}`, { method: 'DELETE' });
            if (res.ok) {
                fetchData();
            }
        } catch (err) {
            alert("Gagal menghapus data");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = isEditing 
                ? `/api/admin/uang-keluar/${isEditing}` 
                : '/api/admin/uang-keluar';
            
            const method = isEditing ? 'PATCH' : 'POST';

            const res = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            if (res.ok) {
                setForm({ jmlUang: '', keterangan: '' });
                setIsEditing(null); // Reset mode edit
                fetchData();
            }
        } catch (err) {
            alert("Terjadi kesalahan");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-700">
        {/* Header */}
        <div>
            <h1 className="text-4xl font-black text-slate-900">UANG KELUAR</h1>
            <p className="text-slate-400 font-light mt-1">Sistem pencatatan kas otomatis Formuga.</p>
        </div>

        {/* Form Input - Simpel & Modern */}
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm grid md:grid-cols-3 gap-6 items-end">
            <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Nominal (Rp)</label>
            <input 
                type="number" 
                required
                value={form.jmlUang}
                onChange={(e) => setForm({...form, jmlUang: e.target.value})}
                className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                placeholder="0"
            />
            </div>
            <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Keterangan</label>
            <input 
                type="text" 
                required
                value={form.keterangan}
                onChange={(e) => setForm({...form, keterangan: e.target.value})}
                className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                placeholder="Input keterangan..."
            />
            </div>
            <button 
            disabled={loading}
            className="bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-blue-600 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-100"
            >
            {loading ? <Loader2 className="animate-spin" size={20}/> : <Plus size={20}/>}
            Simpan Data
            </button>
        </form>

        {/* Tabel Data */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
            <table className="w-full text-left">
                <thead className="bg-slate-50/50 border-b border-slate-100">
                    <tr>
                        {/* Tambahkan kolom Tanggal */}
                        <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Tanggal</th>
                        <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Nominal</th>
                        <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Keterangan</th>
                        <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {data.map((item) => (
                        <tr key={item.id} className="group hover:bg-slate-50/30 transition-colors">
                            {/* Kolom Tanggal: Format Indonesia */}
                            <td className="p-6 text-sm text-slate-500 font-medium">
                                {new Date(item.createdAt).toLocaleDateString('id-ID', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric'
                                })}
                            </td>
                            
                            <td className="p-6 font-bold text-slate-900">
                                Rp {Number(item.jmlUang).toLocaleString('id-ID')}
                            </td>
                            
                            <td className="p-6 text-slate-500 font-light italic text-sm">
                                {item.keterangan}
                            </td>

                            <td className="p-6 text-right">
                                <div className="flex justify-end gap-2 opacity-100 transition-opacity">
                                    <button 
                                        onClick={() => handleEditClick(item)}
                                        className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 transition-all rounded-xl border border-blue-100 shadow-sm"
                                        title="Edit Data"
                                    >
                                        <Edit3 size={18}/>
                                    </button>

                                    <button 
                                        onClick={() => handleDelete(item.id)}
                                        className="p-2 text-red-600 bg-red-50 hover:bg-red-100 transition-all rounded-xl border border-red-100 shadow-sm"
                                        title="Hapus Data"
                                    >
                                        <Trash2 size={18}/>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    );
}