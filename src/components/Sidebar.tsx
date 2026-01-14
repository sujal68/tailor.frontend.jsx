import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import measerTap from "../assets/measerTap.png";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

/**
 * Sidebar.jsx
 * A Luxury Tailor Management System Admin Sidebar
 * Features: Stitched borders, fabric textures, glassmorphism, and smooth animations.
 */

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<string>('Dashboard');

  // Auto-collapse on lg breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsCollapsed(false);
      } else {
        setIsCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    if (isCollapsed) {
      document.body.classList.add("sidebar-collapsed");
    } else {
      document.body.classList.remove("sidebar-collapsed");
    }
  }, [isCollapsed]);

  const navItems = [
    { name: 'Dashboard', icon: <HomeIcon /> },
    { name: 'Admins', icon: <UsersIcon /> },
    { name: 'Customers', icon: <UserIcon /> },
    { name: 'Measurements', icon: <RulerIcon /> },
    { name: 'Reports', icon: <ReportIcon /> },
  ];

  const footerItems = [
    { name: 'Settings', icon: <SettingsIcon /> },
    { name: 'Logout', icon: <LogoutIcon /> },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Inter:wght@300;400;500&display=swap');
        
        .sidebar-fabric-bg {
          background-image: radial-gradient(#e8dfd2 0.5px, transparent 0.5px);
          background-size: 4px 4px;
        }
        
        .stitched-border-outer::before {
          content: "";
          position: absolute;
          top: 4px;
          left: 4px;
          right: 4px;
          bottom: 4px;
          border: 1.55px dashed #d6c8b8;
          border-radius: 24px;
          pointer-events: none;
          opacity: 0.8;
        }
        
        .nav-section::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div
        className={`
         h-[99vh] px-5 py-2.5 box-border
        transition-all duration-[400ms] ease-[cubic-bezier(0.175,0.885,0.32,1.1)]
        sticky top-0 font-['Inter',sans-serif] text-[#5d4a3b] overflow-hidden
        ${isCollapsed ? 'w-[130px]' : 'w-80'}
        max-md:fixed max-md:left-0 max-md:top-0 max-md:z-50 max-md:h-screen
        max-md:transition-transform max-md:duration-300
        ${sidebarOpen ? 'max-md:translate-x-0' : 'max-md:-translate-x-full'}
        `}
      >
        <div className="h-full bg-[#fdfaf5] sidebar-fabric-bg rounded-[30px] shadow-[0_15px_40px_rgba(93,74,59,0.08)] relative border border-[#efe6da] flex flex-col">
          <div className="h-full border-[1.6px] border-dashed border-[#d6c8b8] rounded-[24px] m-2.5 flex flex-col p-5 px-3 relative box-border stitched-border-outer">

            {/* Close button for mobile */}
            <button
              className="md:hidden absolute top-[10px] right-[10px] w-9 h-9 rounded-full bg-gradient-to-br from-[#f6efe6] to-[#e7dbc8] border border-[rgba(180,150,100,0.35)] shadow-[0_6px_14px_rgba(0,0,0,0.15),inset_0_1px_2px_rgba(255,255,255,0.6)] flex items-center justify-center cursor-pointer transition-all duration-[350ms] ease-in-out z-10 hover:scale-105 active:scale-95"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close Sidebar"
            >
              <FiX className="text-xl text-[#6f5b3e]" />
            </button>

            {/* Collapse Toggle - Hidden on mobile */}
            <button
              className="hidden md:flex absolute top-[18px] -right-3.5 w-9 h-9 rounded-full bg-gradient-to-br from-[#f6efe6] to-[#e7dbc8] border border-[rgba(180,150,100,0.35)] shadow-[0_6px_14px_rgba(0,0,0,0.15),inset_0_1px_2px_rgba(255,255,255,0.6)] items-center justify-center cursor-pointer transition-all duration-[350ms] ease-in-out z-10 hover:shadow-[0_10px_22px_rgba(0,0,0,0.2),inset_0_1px_2px_rgba(255,255,255,0.6)] hover:scale-105 active:scale-95"
              onClick={() => setIsCollapsed(!isCollapsed)}
              aria-label="Toggle Sidebar"
            >
              <FiChevronLeft className={`text-xl text-[#6f5b3e] transition-transform duration-[350ms] ${isCollapsed ? 'rotate-180' : ''}`} />
            </button>

            {/* Header / Logo */}
            <div className={`flex items-center gap-3 mb-12 pl-3 ${isCollapsed ? 'pl-0 justify-center' : ''}`}>
              <div className="min-w-[44px] h-11 bg-white rounded-xl flex items-center justify-center text-[#5d4a3b] shadow-[0_4px_12px_rgba(93,74,59,0.08)]">
                <MannequinIcon />
              </div>
              {!isCollapsed && (
                <div>
                  <h1 className="font-mono text-2xl m-0 leading-none font-normal">Tailor</h1>
                  <p className="text-[11px] mt-0.5 mb-0 uppercase tracking-wider opacity-70">Management System</p>
                </div>
              )}
            </div>

            {/* Navigation */}
            <nav className="flex-grow flex flex-col gap-2 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none]">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  className={`
                    flex items-center gap-4 p-3.5 border-0 bg-transparent cursor-pointer
                    rounded-[20px] text-[#7c6a5a] transition-all duration-300 w-full text-left
                    relative overflow-hidden
                    hover:bg-[rgba(232,223,210,0.3)] hover:text-[#5d4a3b]
                    ${activeItem === item.name ? 'bg-[#e8dfd29e] text-[#5d4a3b] shadow-[inset_0_2px_4px_rgba(108,108,108,0.26),0_4px_15px_rgba(255,255,255,0.33)]' : ''}
                    ${isCollapsed ? 'justify-center p-3.5 px-0' : ''}
                  `}
                  onClick={() => setActiveItem(item.name)}
                >
                  <span className="flex items-center justify-center min-w-[24px]">{item.icon}</span>
                  {!isCollapsed && <span className="text-[15px] font-medium whitespace-nowrap">{item.name}</span>}
                </button>
              ))}
            </nav>

            {/* Divider */}
            <div className="my-6 border-t-[1.5px] border-dashed border-[#d6c8b8] w-full"></div>

            {/* Footer */}
            <div className="mt-auto flex flex-col gap-2">
              {footerItems.map((item) => (
                <button
                  key={item.name}
                  className={`
                    flex items-center gap-4 p-3.5 border-0 bg-transparent cursor-pointer
                    rounded-[20px] text-[#7c6a5a] transition-all duration-300 w-full text-left
                    relative overflow-hidden
                    hover:bg-[rgba(232,223,210,0.3)] hover:text-[#5d4a3b]
                    ${activeItem === item.name ? 'bg-[#e8dfd29e] text-[#5d4a3b] shadow-[inset_0_2px_4px_rgba(108,108,108,0.26),0_4px_15px_rgba(255,255,255,0.33)]' : ''}
                    ${isCollapsed ? 'justify-center p-3.5 px-0' : ''}
                  `}
                  onClick={() => setActiveItem(item.name)}
                >
                  <span className="flex items-center justify-center min-w-[24px]">{item.icon}</span>
                  {!isCollapsed && <span className="text-[15px] font-medium whitespace-nowrap">{item.name}</span>}
                </button>
              ))}
            </div>

            {!isCollapsed && (
              <img
                src={measerTap}
                className="absolute bottom-[7px] right-[7px] w-[99px] opacity-[0.48] pointer-events-none rotate-[1deg] [filter:sepia(25%)_brightness(1.05)] transition-all duration-300"
                alt="Measuring Tape"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// --- SVG Icons (Minimalist & Premium) ---

const MannequinIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M12 4c-2 0-3 1-3 3v2c0 2 1 3 3 5s3-3 3-5V7c0-2-1-3-3-3zM9 9h6M8 14c-1 2-2 4-2 7h12c0-3-1-5-2-7M12 14v7" strokeLinecap="round" />
  </svg>
);

const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z" />
  </svg>
);

const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm14 14v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
  </svg>
);

const RulerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21.3 8.1l-5.4-5.4c-.4-.4-1-.4-1.4 0L2.7 14.5c-.4.4-.4 1 0 1.4l5.4 5.4c.4.4 1 .4 1.4 0l11.8-11.8c.4-.4.4-1 0-1.4zM7 17l2-2M10 14l2-2M13 11l2-2M16 8l2-2" strokeLinecap="round" />
  </svg>
);

const ReportIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const LogoutIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default Sidebar;