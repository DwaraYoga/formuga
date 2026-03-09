import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Dashboard Formuga",
    description: "Halaman Dashboard Formuga",
    icons: {
        icon: "/Logo.ico",
    },
}

export default function AnggotaPage() {
    return (
        <>
            <h1 className="text-2xl font-bold mb-4">Anggota</h1>
            <p>Welcome to the admin dashboard. Here you can manage your application.</p>
        </>
    );
}