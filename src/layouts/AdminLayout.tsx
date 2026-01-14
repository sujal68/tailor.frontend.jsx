import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import banner from '../assets/bannerDashboard.png';

export default function AdminLayout(): React.JSX.Element {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

    return (
        <div
            className="min-h-screen flex bg-cover bg-center bg-fixed"
            style={{ backgroundImage: `url(${banner})` }}
        >
            {/* Overlay for mobile/tablet when sidebar is open */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-[45] md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="flex-1 transition-all duration-[400ms] min-w-0 relative z-10">
                <Header setSidebarOpen={setSidebarOpen} />
                <Outlet />
            </div>
        </div>
    );
}