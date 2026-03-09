'use client';
import React, { useState } from 'react';
import { Home, User, Users, TrendingUp, TrendingDown, History, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const DashboardNavbar = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { id: 'beranda', label: 'Beranda', icon: Home, href: '/admin/beranda' },
        { id: 'akun', label: 'Akun', icon: User, href: '/admin/akun' },
        { id: 'anggota', label: 'Anggota', icon: Users, href: '/admin/anggota' },
        { id: 'uang-masuk', label: 'Uang Masuk', icon: TrendingUp, href: '/admin/uang-masuk' },
        { id: 'uang-keluar', label: 'Uang Keluar', icon: TrendingDown, href: '/admin/uang-keluar' },
        { id: 'history', label: 'History', icon: History, href: '/admin/history' },
    ];

    const isActive = (href: string) => pathname === href;

    return (
        <>
            {/* MOBILE HEADER (Hanya muncul di HP) */}
            <div className="lg:hidden bg-slate-900 text-white p-4 flex justify-between items-center sticky top-0 z-50">
                <h1 className="text-xl font-bold italic tracking-tighter">FORMUGA</h1>
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* OVERLAY UNTUK MOBILE (Latar belakang gelap saat menu buka) */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* SIDEBAR (Desktop & Mobile Slide-in) */}
            <aside className={`
                fixed lg:sticky top-0 left-0 z-50
                w-64 bg-slate-950 text-white h-screen p-6 shadow-2xl
                transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <h1 className="hidden lg:block text-2xl font-black mb-10 italic tracking-tighter">
                    FOR<span className="text-blue-500 not-italic">MUGA</span>
                </h1>
                
                <nav className="space-y-1.5">
                    {menuItems.map((item) => {
                        const IconComponent = item.icon;
                        return (
                            <Link
                                key={item.id}
                                href={item.href}
                                onClick={() => setIsOpen(false)} // Tutup menu saat link diklik (mobile)
                                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                                    isActive(item.href)
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                                        : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                                }`}
                            >
                                <IconComponent size={18} strokeWidth={isActive(item.href) ? 2.5 : 2} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Info User Simple di bawah Sidebar */}
                <div className="absolute bottom-8 left-6 right-6 pt-6 border-t border-slate-900">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold">AD</div>
                        <div className="overflow-hidden">
                            <p className="text-xs font-bold truncate">Admin Formuga</p>
                            <p className="text-[10px] text-slate-500 truncate">admin@formuga.com</p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default DashboardNavbar;