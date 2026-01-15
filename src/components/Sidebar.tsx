import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiX, FiChevronDown } from "react-icons/fi";
import measerTap from "../assets/measerTap.png";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<string>('Dashboard');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { name: 'Dashboard', icon: <HomeIcon />, path: '/dashboard' },
    {
      name: 'Tailors',
      icon: <UsersIcon />,
      subItems: [
        { name: 'All Tailors', path: '/tailors' },
        { name: 'Add Tailor', path: '/tailors/add' },
        { name: 'Recent Registrations', path: '/tailors/recent' },
      ],
    },
    {
      name: 'Customers',
      icon: <UserIcon />,
      subItems: [
        { name: 'All Customers', path: '/customers' },
      ],
    },
    {
      name: 'Invoices',
      icon: <InvoiceIcon />,
      subItems: [
        { name: 'All Invoices', path: '/invoices' },
      ],
    },
    {
      name: 'Reports',
      icon: <ReportIcon />,
      subItems: [
        { name: 'Business Report', path: '/reports/business' },
        { name: 'Revenue Report', path: '/reports/revenue' },
        { name: 'Tailor Performance', path: '/reports/performance' },
      ],
    },
  ];

  const footerItems = [
    {
      name: 'Settings',
      icon: <SettingsIcon />,
      subItems: [
        { name: 'Admin Profile', path: '/settings/profile' },
        { name: 'System Settings', path: '/settings/system' },
        { name: 'Security', path: '/settings/security' },
      ],
    },
    { name: 'Logout', icon: <LogoutIcon />, path: '/logout' },
  ];

  const toggleMenu = (menuName: string) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  const handleItemClick = (item: any) => {
    if (item.subItems) {
      toggleMenu(item.name);
    } else {
      setActiveItem(item.name);
      if (window.innerWidth < 768) setSidebarOpen(false);
    }
  };

  const handleSubItemClick = (subItemName: string) => {
    setActiveItem(subItemName);
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

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

        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d6c8b8;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #b8a692;
        }

        .submenu-transition {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 350ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms;
          opacity: 0;
        }
        .submenu-open {
          grid-template-rows: 1fr;
          opacity: 1;
          margin-top: 4px;
        }
      `}</style>

      <div
        className={`
          fixed md:sticky top-0 left-0 h-[100dvh] z-[50] box-border
          transition-all duration-[450ms] ease-[cubic-bezier(0.19,1,0.22,1)]
          ${isCollapsed ? 'w-[110px]' : 'w-80'}
          ${sidebarOpen ? 'translate-x-0' : 'max-md:-translate-x-full'}
          p-3 md:p-4
        `}
      >
        <div className="h-full bg-[#fdfaf5] sidebar-fabric-bg rounded-[30px] shadow-[0_20px_50px_rgba(93,74,59,0.12)] relative border border-[#efe6da] flex flex-col overflow-hidden">
          <div className="h-full border-[1.6px] border-dashed border-[#d6c8b8] rounded-[24px] m-1.5 md:m-2 flex flex-col relative box-border stitched-border-outer overflow-hidden">
            
            {/* Header */}
            <div className={`flex items-center gap-3 p-6 pb-4 ${isCollapsed ? 'justify-center px-0' : ''}`}>
              <div className="min-w-[44px] h-11 bg-white rounded-xl flex items-center justify-center text-[#5d4a3b] shadow-[0_4px_12px_rgba(93,74,59,0.08)] transform transition-transform duration-500 hover:rotate-[10deg]">
                <MannequinIcon />
              </div>
              {!isCollapsed && (
                <div>
                  <h1 className="font-mono text-2xl m-0 leading-none font-normal tracking-tight">Tailor</h1>
                  <p className="text-[10px] mt-1 mb-0 uppercase tracking-[0.15em] opacity-60 font-semibold">Management</p>
                </div>
              )}
            </div>

            {/* Navigation */}
            <nav className="flex-grow overflow-y-auto overflow-x-hidden custom-scrollbar px-3 py-2 space-y-1.5">
              {navItems.map((item) => (
                <div key={item.name} className="relative">
                  <button
                    onClick={() => handleItemClick(item)}
                    className={`
                      group flex items-center gap-4 p-3.5 rounded-[18px] transition-all duration-300 w-full text-left relative
                      ${activeItem === item.name || openMenu === item.name 
                        ? 'bg-[#e8dfd29e] text-[#5d4a3b] shadow-[inset_0_1px_2px_rgba(108,108,108,0.1)]' 
                        : 'text-[#7c6a5a] hover:bg-[rgba(232,223,210,0.3)] hover:text-[#5d4a3b]'}
                      ${isCollapsed ? 'justify-center px-0' : ''}
                    `}
                  >
                    <span className={`flex items-center justify-center min-w-[24px] transition-transform duration-300 group-hover:scale-110 ${activeItem === item.name ? 'scale-110' : ''}`}>
                      {item.icon}
                    </span>
                    
                    {!isCollapsed && (
                      <>
                        <span className="text-[14.5px] font-medium whitespace-nowrap flex-1">{item.name}</span>
                        {item.subItems && (
                          <FiChevronDown className={`w-4 h-4 transition-transform duration-500 ${openMenu === item.name ? 'rotate-180' : ''}`} />
                        )}
                      </>
                    )}

                    {activeItem === item.name && (
                      <div className="absolute left-0 w-1 h-5 bg-[#8b735b] rounded-r-full" />
                    )}
                  </button>

                  {item.subItems && !isCollapsed && (
                    <div className={`submenu-transition ${openMenu === item.name ? 'submenu-open' : ''}`}>
                      <div className="overflow-hidden">
                        <div className="flex flex-col gap-1 pb-2 pr-2 border-l border-[#d6c8b8] ml-[27px] pl-4">
                          {item.subItems.map((subItem) => (
                            <button
                              key={subItem.name}
                              onClick={() => handleSubItemClick(subItem.name)}
                              className={`
                                text-left p-2.5 px-4 rounded-xl text-[13.5px] transition-all duration-200
                                ${activeItem === subItem.name 
                                  ? 'bg-[rgba(232,223,210,0.5)] text-[#5d4a3b] font-semibold' 
                                  : 'text-[#8a7a6a] hover:text-[#5d4a3b] hover:translate-x-1'}
                              `}
                            >
                              {subItem.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Footer */}
            <div className="mt-auto p-3 pt-0">
              <div className="mb-4 border-t-[1.5px] border-dashed border-[#d6c8b8] w-full opacity-60"></div>
              <div className="space-y-1.5">
                {footerItems.map((item) => (
                  <div key={item.name}>
                    <button
                      onClick={() => handleItemClick(item)}
                      className={`
                        group flex items-center gap-4 p-3.5 rounded-[18px] transition-all duration-300 w-full text-left
                        ${activeItem === item.name ? 'bg-[#e8dfd29e] text-[#5d4a3b]' : 'text-[#7c6a5a] hover:bg-[rgba(232,223,210,0.3)]'}
                        ${isCollapsed ? 'justify-center px-0' : ''}
                      `}
                    >
                      <span className="flex items-center justify-center min-w-[24px] group-hover:scale-110 transition-transform">
                        {item.icon}
                      </span>
                      {!isCollapsed && <span className="text-[14.5px] font-medium">{item.name}</span>}
                    </button>
                    {item.subItems && !isCollapsed && (
                      <div className={`submenu-transition ${openMenu === item.name ? 'submenu-open' : ''}`}>
                        <div className="overflow-hidden">
                          <div className="flex flex-col gap-1 pb-2 pr-2 border-l border-[#d6c8b8] ml-[27px] pl-4">
                            {item.subItems.map((subItem) => (
                              <button
                                key={subItem.name}
                                onClick={() => handleSubItemClick(subItem.name)}
                                className={`
                                  text-left p-2.5 px-4 rounded-xl text-[13.5px] transition-all duration-200
                                  ${activeItem === subItem.name 
                                    ? 'bg-[rgba(232,223,210,0.5)] text-[#5d4a3b] font-semibold' 
                                    : 'text-[#8a7a6a] hover:text-[#5d4a3b] hover:translate-x-1'}
                                `}
                              >
                                {subItem.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {!isCollapsed && (
              <img
                src={measerTap}
                className="absolute bottom-[-10px] right-[-10px] w-28 opacity-[0.35] pointer-events-none rotate-[-5deg] sepia-[30%] transition-opacity duration-700 hover:opacity-50"
                alt=""
              />
            )}
          </div>

          {/* Desktop Toggle */}
          <button
            className="hidden md:flex absolute top-[28px] -right-[-12px] w-8 h-8 rounded-full bg-[#fdfaf5] border border-[#d6c8b8] shadow-md items-center justify-center cursor-pointer z-[60] transition-all hover:scale-110 active:scale-90"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <FiChevronLeft className={`text-[#6f5b3e] transition-transform duration-500 ${isCollapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Mobile Close */}
        <button
          className="md:hidden fixed top-6 right-6 w-11 h-11 rounded-full bg-[#fdfaf5] border border-[#d6c8b8] shadow-xl flex items-center justify-center z-[70]"
          onClick={() => setSidebarOpen(false)}
        >
          <FiX className="text-xl text-[#6f5b3e]" />
        </button>
      </div>
    </>
  );
};

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

const InvoiceIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
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
