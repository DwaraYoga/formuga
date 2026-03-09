import DashboardNavbar from "../admin/nav";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
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