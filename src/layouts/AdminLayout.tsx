import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import Loader from '../components/Loader';
import banner from '../assets/bannerDashboard.png';

export default function AdminLayout(): React.JSX.Element {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    React.useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 160);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Loader show={loading} />
            <div
                className="min-h-screen flex bg-cover bg-center bg-fixed bg-no-repeat selection:bg-[#c5a059]/30"
                style={{ backgroundImage: `url(${banner})` }}
            >
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[45] md:hidden transition-opacity duration-300"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <div className="flex-1 transition-all duration-500 ease-in-out min-w-0 relative flex flex-col">
                    <Header setSidebarOpen={setSidebarOpen} />
                    <main className="flex-1 overflow-x-hidden">
                        <Outlet />
                    </main>
                </div>
            </div>
        </>
    );
}