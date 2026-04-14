'use client';
import { Metadata } from "next";
import DashboardNavbar from "../admin/nav";
import { usePathname } from 'next/navigation';

const style = `
    @keyframes fadeIn {
        from { 
            opacity: 0;
            transform: translateX(20px); 
        }
    }     
        to { 
            opacity: 1; 
            transform: translateX(0); 
        }
    }
    .fade-in {
        animation: fadeIn 0.8s ease-out forwards;
    }
`;

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
        <div className="flex flex-col lg:flex-row min-h-screen fade-in">
            {/* Sidebar / Mobile Nav */}
            <DashboardNavbar />
            
            {/* Main Content */}
            <main className="flex-1 p-4 md:p-8 bg-slate-50">
                {children}
            </main>    
        </div>
    );
}