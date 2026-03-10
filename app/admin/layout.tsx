'use client';
import { Metadata } from "next";
import DashboardNavbar from "../admin/nav";
import { usePathname } from 'next/navigation';


export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
    
}) {
    // Tentukan path mana saja yang TIDAK ingin pakai Sidebar
    const pathname = usePathname();
    const isLoginPage = pathname === '/admin';

    // Jika halaman login, langsung render children saja tanpa Navbar
    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            {/* Sidebar / Mobile Nav */}
            <DashboardNavbar />
            
            {/* Main Content */}
            <main className="flex-1 p-4 md:p-8 bg-slate-50">
                {children}
            </main>    
        </div>
    );
}