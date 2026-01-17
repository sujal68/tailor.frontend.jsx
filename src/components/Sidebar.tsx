import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiX, FiChevronDown } from "react-icons/fi";
import { useNavigate, useLocation } from 'react-router-dom';
import measerTap from "../assets/measerTap.png";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<string>('Dashboard');
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(false);
      } else if (window.innerWidth < 1300) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isCollapsed) {
      document.body.classList.add('sidebar-collapsed');
    } else {
      document.body.classList.remove('sidebar-collapsed');
    }
  }, [isCollapsed]);

  const navItems = [
    { name: 'Dashboard', icon: <HomeIcon />, path: '/dashboard' },
    {
      name: 'Tailors',
      icon: <UsersIcon />,
      subItems: [
        { name: 'All Tailors', path: '/dashboard/all-tailors' },
        { name: 'Add Tailor', path: '/dashboard/add-tailor' },
        { name: 'Recent Registrations', path: '/dashboard/recent-registrations' },
      ],
    },
    {
      name: 'Customers',
      icon: <UserIcon />,
      subItems: [
        { name: 'All Customers', path: '/dashboard/customers' },
      ],
    },
    {
      name: 'Invoices',
      icon: <InvoiceIcon />,
      subItems: [
        { name: 'All Invoices', path: '/dashboard/invoices' },
      ],
    },
    {
      name: 'Reports',
      icon: <ReportIcon />,
      subItems: [
        { name: 'Business Report', path: '/dashboard/reports' },
        { name: 'Revenue Report', path: '/dashboard/reports' },
        { name: 'Tailor Performance', path: '/dashboard/reports' },
      ],
    },
  ];

  const footerItems = [
    {
      name: 'Settings',
      icon: <SettingsIcon />,
      subItems: [
        { name: 'Admin Profile', path: '/dashboard/settings' },
        { name: 'System Settings', path: '/dashboard/settings' },
        { name: 'Security', path: '/dashboard/settings' },
      ],
    },
    { name: 'Logout', icon: <LogoutIcon />, path: '/login' },
  ];

  const toggleMenu = (menuName: string) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  const handleItemClick = (item: any) => {
    if (item.subItems) {
      toggleMenu(item.name);
    } else {
      setActiveItem(item.name);
      if (item.path) navigate(item.path);
      if (window.innerWidth < 768) setSidebarOpen(false);
    }
  };

  const handleSubItemClick = (subItemName: string, path: string) => {
    setActiveItem(subItemName);
    navigate(path);
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  useEffect(() => {
    const path = location.pathname;
    if (path === '/dashboard') setActiveItem('Dashboard');
    else if (path.includes('/add-tailor')) setActiveItem('Add Tailor');
    else if (path.includes('/all-tailors')) setActiveItem('All Tailors');
    else if (path.includes('/admins')) setActiveItem('All Tailors');
    else if (path.includes('/customers')) setActiveItem('All Customers');
    else if (path.includes('/invoices')) setActiveItem('All Invoices');
    else if (path.includes('/reports')) setActiveItem('Business Report');
    else if (path.includes('/settings')) setActiveItem('Admin Profile');
  }, [location.pathname]);

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
        
        .collapsed-submenu {
          position: fixed;
          left: 140px;
          background: #fdfaf5;
          border: 1.5px solid #d6c8b8;
          border-radius: 16px;
          padding: 8px;
          min-width: 200px;
          box-shadow: 0 8px 24px rgba(93, 74, 59, 0.15);
          z-index: 50;
          animation: slideIn 0.2s ease-out;
          transition: opacity 0.3s ease-out;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .collapsed-submenu.fade-out {
          opacity: 0;
        }
      `}</style>

      <div
        className={`
          fixed md:sticky top-0 left-0 h-[100dvh] z-[46] md:z-[30] box-border
          transition-all duration-[450ms] ease-[cubic-bezier(0.19,1,0.22,1)]
          ${isCollapsed ? 'w-[140px]' : 'w-80'}
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
                <div 
                  key={item.name} 
                  className="relative"
                  onMouseEnter={() => {
                    if (isCollapsed && item.subItems) {
                      if (hoverTimeout) clearTimeout(hoverTimeout);
                      setHoveredMenu(item.name);
                    }
                  }}
                  onMouseLeave={() => {
                    if (isCollapsed && item.subItems) {
                      const timeout = setTimeout(() => setHoveredMenu(null), 150);
                      setHoverTimeout(timeout);
                    }
                  }}
                >
                  <button
                    onClick={() => handleItemClick(item)}
                    data-menu={item.name}
                    className={`
                      group flex items-center gap-4 p-3.5 rounded-[18px] transition-all duration-300 w-full text-left relative
                      ${activeItem === item.name || openMenu === item.name 
                        ? 'bg-[#e8dfd29e] text-[#5d4a3b] shadow-[inset_0_1px_2px_rgba(108,108,108,0.1)]' 
                        : 'text-[#7c6a5a] hover:bg-[rgba(232,223,210,0.3)] hover:text-[#5d4a3b] hover:shadow-sm'}
                      ${isCollapsed ? 'justify-center px-0' : ''}
                    `}
                  >
                    <span className={`flex items-center justify-center min-w-[24px] transition-all duration-300 group-hover:scale-110 ${activeItem === item.name ? 'scale-110 drop-shadow-[0_2px_4px_rgba(93,74,59,0.3)]' : ''}`}>
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
                      <div className="absolute left-0 w-1 h-5 bg-[#8b735b] rounded-r-full shadow-[0_0_8px_rgba(139,115,91,0.5)]" />
                    )}
                  </button>

                  {item.subItems && !isCollapsed && (
                    <div className={`submenu-transition ${openMenu === item.name ? 'submenu-open' : ''}`}>
                      <div className="overflow-hidden">
                        <div className="flex flex-col gap-1 pb-2 pr-2 border-l border-[#d6c8b8] ml-[27px] pl-4">
                          {item.subItems.map((subItem) => (
                            <button
                              key={subItem.name}
                              onClick={() => handleSubItemClick(subItem.name, subItem.path)}
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
                  
                  {/* Collapsed Hover Menu */}
                  {item.subItems && isCollapsed && hoveredMenu === item.name && (
                    <div 
                      className="collapsed-submenu" 
                      style={{ top: `${document.querySelector(`button[data-menu="${item.name}"]`)?.getBoundingClientRect().top}px` }}
                      onMouseEnter={() => {
                        if (hoverTimeout) clearTimeout(hoverTimeout);
                        setHoveredMenu(item.name);
                      }}
                      onMouseLeave={() => {
                        const timeout = setTimeout(() => setHoveredMenu(null), 150);
                        setHoverTimeout(timeout);
                      }}
                    >
                      <div className="flex flex-col gap-1">
                        {item.subItems.map((subItem) => (
                          <button
                            key={subItem.name}
                            onClick={() => handleSubItemClick(subItem.name, subItem.path)}
                            className={`
                              text-left p-2.5 px-4 rounded-xl text-[13.5px] transition-all duration-200
                              ${activeItem === subItem.name 
                                ? 'bg-[rgba(232,223,210,0.7)] text-[#5d4a3b] font-semibold' 
                                : 'text-[#8a7a6a] hover:bg-[rgba(232,223,210,0.3)] hover:text-[#5d4a3b]'}
                            `}
                          >
                            {subItem.name}
                          </button>
                        ))}
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
                  <div 
                    key={item.name}
                    onMouseEnter={() => {
                      if (isCollapsed && item.subItems) {
                        if (hoverTimeout) clearTimeout(hoverTimeout);
                        setHoveredMenu(item.name);
                      }
                    }}
                    onMouseLeave={() => {
                      if (isCollapsed && item.subItems) {
                        const timeout = setTimeout(() => setHoveredMenu(null), 150);
                        setHoverTimeout(timeout);
                      }
                    }}
                    className="relative"
                  >
                    <button
                      onClick={() => handleItemClick(item)}
                      data-menu={item.name}
                      className={`
                        group flex items-center gap-4 p-3.5 rounded-[18px] transition-all duration-300 w-full text-left
                        ${activeItem === item.name ? 'bg-[#e8dfd29e] text-[#5d4a3b]' : 'text-[#7c6a5a] hover:bg-[rgba(232,223,210,0.3)] hover:shadow-sm'}
                        ${isCollapsed ? 'justify-center px-0' : ''}
                      `}
                    >
                      <span className="flex items-center justify-center min-w-[24px] group-hover:scale-110 transition-all duration-300">
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
                                onClick={() => handleSubItemClick(subItem.name, subItem.path)}
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
                    
                    {/* Collapsed Hover Menu */}
                    {item.subItems && isCollapsed && hoveredMenu === item.name && (
                      <div 
                        className="collapsed-submenu" 
                        style={{ top: `${document.querySelector(`button[data-menu="${item.name}"]`)?.getBoundingClientRect().top}px` }}
                        onMouseEnter={() => {
                          if (hoverTimeout) clearTimeout(hoverTimeout);
                          setHoveredMenu(item.name);
                        }}
                        onMouseLeave={() => {
                          const timeout = setTimeout(() => setHoveredMenu(null), 150);
                          setHoverTimeout(timeout);
                        }}
                      >
                        <div className="flex flex-col gap-1">
                          {item.subItems.map((subItem) => (
                            <button
                              key={subItem.name}
                              onClick={() => handleSubItemClick(subItem.name, subItem.path)}
                              className={`
                                text-left p-2.5 px-4 rounded-xl text-[13.5px] transition-all duration-200
                                ${activeItem === subItem.name 
                                  ? 'bg-[rgba(232,223,210,0.7)] text-[#5d4a3b] font-semibold' 
                                  : 'text-[#8a7a6a] hover:bg-[rgba(232,223,210,0.3)] hover:text-[#5d4a3b]'}
                              `}
                            >
                              {subItem.name}
                            </button>
                          ))}
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
            className="hidden md:flex absolute top-[28px] -right-[-12px] w-8 h-8 rounded-full bg-[#fdfaf5] border border-[#d6c8b8] shadow-md items-center justify-center cursor-pointer z-[5] transition-all hover:scale-110 active:scale-90"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <FiChevronLeft className={`text-[#6f5b3e] transition-transform duration-500 ${isCollapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Mobile Close */}
        <button
          className="md:hidden fixed top-6 right-6 w-11 h-11 rounded-full bg-[#fdfaf5] border border-[#d6c8b8] shadow-xl flex items-center justify-center z-[47]"
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
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z">
      <animate attributeName="stroke-dasharray" values="0 100;100 0;0 100" dur="3s" repeatCount="indefinite" />
    </path>
  </svg>
);

const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2">
      <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
    </path>
    <circle cx="9" cy="7" r="4">
      <animate attributeName="r" values="4;4.5;4" dur="2s" repeatCount="indefinite" />
    </circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87">
      <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
    </path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75">
      <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
    </path>
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2">
      <animate attributeName="stroke-dasharray" values="0 50;50 0" dur="2s" repeatCount="indefinite" />
    </path>
    <circle cx="12" cy="11" r="4">
      <animate attributeName="r" values="4;4.3;4" dur="1.5s" repeatCount="indefinite" />
    </circle>
  </svg>
);

const InvoiceIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z">
      <animate attributeName="stroke-dasharray" values="0 100;100 0" dur="3s" repeatCount="indefinite" />
    </path>
    <polyline points="14 2 14 8 20 8">
      <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
    </polyline>
    <circle cx="10" cy="14" r="2">
      <animate attributeName="r" values="2;2.5;2" dur="1.5s" repeatCount="indefinite" />
    </circle>
    <path d="M10 12v6" />
  </svg>
);

const ReportIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <line x1="18" y1="20" x2="18" y2="10">
      <animate attributeName="y2" values="10;8;10" dur="1.5s" repeatCount="indefinite" />
    </line>
    <line x1="12" y1="20" x2="12" y2="4">
      <animate attributeName="y2" values="4;2;4" dur="1.5s" repeatCount="indefinite" />
    </line>
    <line x1="6" y1="20" x2="6" y2="14">
      <animate attributeName="y2" values="14;12;14" dur="1.5s" repeatCount="indefinite" />
    </line>
  </svg>
);

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <g>
      <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="8s" repeatCount="indefinite" />
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </g>
  </svg>
);

const LogoutIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7">
      <animate attributeName="points" values="16 17 21 12 16 7;17 17 22 12 17 7;16 17 21 12 16 7" dur="1.5s" repeatCount="indefinite" />
    </polyline>
    <line x1="21" y1="12" x2="9" y2="12">
      <animate attributeName="stroke-dasharray" values="0 20;20 0" dur="2s" repeatCount="indefinite" />
    </line>
  </svg>
);

export default Sidebar;
