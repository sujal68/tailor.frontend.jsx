import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import banner from '../assets/bannerDashboard.png';

export default function AdminLayout() {
    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                backgroundImage: `url(${banner})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <Sidebar />
            <div style={{ flex: 1 }}>
                <Header />
                <Outlet />
            </div>
        </div>
    );
}
