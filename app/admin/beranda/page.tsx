'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, Loader2 } from 'lucide-react';

export default function DashboardPage() {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ nama: '', status: 'aktif' });
    const [isEditing, setIsEditing] = useState<number | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/admin/anggota');
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


    return (
        <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-700">
        {/* Header */}
        <div>
            <h1 className="text-4xl font-black text-slate-900">Dashboard Formuga</h1>
            <p className="text-slate-400 font-light mt-1">Halaman Dashboard Formuga.</p>
        </div>
        </div>
    );
}