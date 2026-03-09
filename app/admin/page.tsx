import React from 'react';
import { ArrowLeft, Lock, User, ArrowRight } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Formuga | Login",
    description: "Login ke Dashboard Formuga",
    icons: {
        icon: "/Logo.ico",
    },
}

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-center items-center px-6">
        
        {/* Tombol Back ke Landing Page */}
        <a 
            href="/" 
            className="fixed top-8 left-8 flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-black transition-colors group"
        >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Ke Landing Page
        </a>

        <div className="w-full max-w-[400px] space-y-10">
            {/* Header Login */}
            <div className="text-center space-y-2">
                <div className="font-black text-2xl tracking-tighter mb-8">
                    FOR<span className="text-blue-600 not-italic">MUGA</span>
                </div>
                <h1 className="text-3xl font-bold tracking-tight">Selamat Datang.</h1>
                <p className="text-slate-500 font-light">
                    Silakan masuk untuk mengelola Dashboard Formuga.
                </p>
            </div>

            {/* Form */}
            <form className="space-y-4">
                <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                    Username
                    </label>
                    <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                        type="text"
                        name='username'
                        placeholder="Masukkan username"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all placeholder:text-slate-300"
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
                        name='password'
                        placeholder="••••••••"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all placeholder:text-slate-300"
                    />
                    </div>
                </div>

                <button className="group w-full bg-slate-900 text-white font-bold py-4 rounded-2xl mt-6 hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2">
                    Masuk Sekarang
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </form>

            {/* Footer Login */}
            <div className="text-center pt-8 border-t border-slate-50">
            <p className="text-xs text-slate-400 font-medium tracking-wide">
                © 2026 FORMUGA • GENTING UTARA
            </p>
            </div>
        </div>
        </div>
    );
}