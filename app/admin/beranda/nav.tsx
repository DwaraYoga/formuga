'use client';
import React from 'react';
import { Home, User, Users, TrendingUp, TrendingDown, History } from 'lucide-react';
import { useState } from 'react';

const DashboardNavbar: React.FC = () => {
    const [activeMenu, setActiveMenu] = useState('beranda');

    const menuItems = [
        { id: 'beranda', label: 'Beranda', icon: Home },
        { id: 'akun', label: 'Akun', icon: User },
        { id: 'anggota', label: 'Anggota', icon: Users },
        { id: 'uang-masuk', label: 'Uang Masuk', icon: TrendingUp },
        { id: 'uang-keluar', label: 'Uang Keluar', icon: TrendingDown },
        { id: 'history', label: 'History', icon: History },
    ];

    return (
        <aside className="w-64 bg-slate-900 text-white h-screen p-6 shadow-lg">
            <h1 className="text-2xl font-bold mb-8">Formuga</h1>
            <nav className="space-y-2">
                {menuItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveMenu(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                activeMenu === item.id
                                    ? 'bg-blue-600 text-white'
                                    : 'text-slate-300 hover:bg-slate-800'
                            }`}
                        >
                            <IconComponent size={20} />
                            <span>{item.label}</span>
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
};

export default DashboardNavbar;