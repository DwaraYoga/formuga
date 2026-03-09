import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Dashboard Formuga",
    description: "Halaman Dashboard Formuga",
    icons: {
        icon: "/Logo.ico",
    },
}

export default function UangMasukPage() {
    return (
        <>
            <h1 className="text-2xl font-bold mb-4">Uang Masuk</h1>
            <p>Welcome to the admin dashboard. Here you can manage your application.</p>
        </>
    );
}