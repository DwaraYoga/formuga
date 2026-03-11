'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, Loader2 } from 'lucide-react';

export default function AkunPage() {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ username: '', role: 'view', password: '' });
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/admin/akun');
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


    const handleDelete = async (id: number) => {
        if (!confirm("Yakin ingin menghapus data ini?")) return;
        
        try {
            const res = await fetch(`/api/admin/akun/${id}`, { method: 'DELETE' });
            if (res.ok) {
                fetchData();
            }
        } catch (err) {
            alert("Gagal menghapus data");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        // Validasi input
        if (!form.username.trim()) {
            setError('Username wajib diisi');
            setLoading(false);
            return;
        }

        if (!isEditing && !form.password.trim()) {
            setError('Password wajib diisi saat membuat akun baru');
            setLoading(false);
            return;
        }

        try {
            const url = isEditing 
                ? `/api/admin/akun/${isEditing}` 
                : '/api/admin/akun';
            
            const method = isEditing ? 'PATCH' : 'POST';

            const res = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            const result = await res.json();

            if (res.ok) {
                setForm({ username: '', role: 'view', password: '' });
                setIsEditing(null);
                setSuccess(isEditing ? 'Data berhasil diperbarui' : 'Data berhasil disimpan');
                setTimeout(() => setSuccess(''), 3000);
                fetchData();
            } else {
                setError(result.error || 'Gagal menyimpan data');
            }
        } catch (err: any) {
            setError('Terjadi kesalahan: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-700">
        {/* Header */}
        <div>
            <h1 className="text-4xl font-black text-slate-900">AKUN</h1>
            <p className="text-slate-400 font-light mt-1">Sistem pencatatan akun Formuga.</p>
        </div>

        {/* Error Alert */}
        {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-red-700 text-sm">
                {error}
            </div>
        )}

        {/* Success Alert */}
        {success && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-green-700 text-sm">
                {success}
            </div>
        )}

        {/* Form Input - Simpel & Modern */}
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm grid md:grid-cols-4 gap-6 items-end">
            <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Username</label>
                <input 
                    type="text" 
                    required
                    value={form.username}
                    onChange={(e) => setForm({...form, username: e.target.value})}
                    className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    placeholder="Input username..."
                />
            </div>
            <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Password</label>
                <input 
                    type="password" 
                    required
                    value={form.password}
                    onChange={(e) => setForm({...form, password: e.target.value})}
                    className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    placeholder="Input password..."
                />
            </div>
            <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Role</label>
                <select 
                    required
                    value={form.role}
                    onChange={(e) => setForm({...form, role: e.target.value})}
                    className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                >
                    <option value="view">View</option>
                    <option value="admin">Admin</option>
                </select>
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
                        <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Username</th>
                        <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Role</th>
                        <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {data.map((item) => (
                        <tr key={item.id} className="group hover:bg-slate-50/30 transition-colors">
                            <td className="p-6 text-sm font-bold text-slate-900">
                                {item.username}
                            </td>
                            
                            <td className="p-6">
                                <span className={`px-4 py-2 rounded-full text-xs font-bold ${
                                    item.role === 'admin' 
                                        ? 'bg-red-100 text-red-700' 
                                        : 'bg-blue-100 text-blue-700'
                                }`}>
                                    {item.role === 'admin' ? 'Admin' : 'View'}
                                </span>
                            </td>

                            <td className="p-6 text-right">
                                <div className="flex justify-end gap-2 opacity-100 transition-opacity">
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