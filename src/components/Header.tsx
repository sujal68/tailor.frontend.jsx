import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setSidebarOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const handleLogout = (): void => { localStorage.removeItem("token"); localStorage.removeItem("otp_session"); localStorage.removeItem("otp_email"); window.location.href = "/"; };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    { id: 1, type: 'urgent', title: 'Multiple failed login attempts', desc: 'Security alert detected', time: '2 mins ago', unread: true },
    { id: 2, type: 'attention', title: 'Pending orders require attention', desc: '5 orders awaiting approval', time: '15 mins ago', unread: true },
    { id: 3, type: 'normal', title: 'New order received', desc: 'Order #1234 from Royal Tailors', time: '1 hour ago', unread: true },
    { id: 4, type: 'normal', title: 'New sub-admin added', desc: 'John Doe joined as sub-admin', time: '2 hours ago', unread: false },
    { id: 5, type: 'attention', title: 'Worker marked absent', desc: 'Ramesh Kumar - Today', time: '3 hours ago', unread: false },
  ];

  const unreadCount = notifications.length;

  return (<header className="w-full px-1.5 sm:px-4 md:px-6 py-2.5 md:py-5 flex items-center justify-between relative z-20 font-sans border-b border-[#f0ede7]/50"> <div className="flex items-center justify-between w-full px-1.5 sm:px-4 md:px-6 py-2.5 sm:py-3 bg-white/40 backdrop-blur-md rounded-[20px] border border-white/60 shadow-[0_8px_32px_rgba(183,163,132,0.15)] relative after:content-[''] after:absolute after:inset-1 after:border after:border-dashed after:border-[#b7a384]/30 after:rounded-[inherit] after:pointer-events-none">

    {/* Mobile Menu Toggle */}
    <button
      onClick={() => setSidebarOpen(true)}
      className="md:hidden bg-white border border-[#eee5d8] rounded-xl w-[36px] h-[36px] sm:w-[38px] sm:h-[38px] flex items-center justify-center cursor-pointer transition-transform duration-200 active:scale-95 hover:bg-white/55 flex-shrink-0"
    >
      <FiMenu className="text-[#4a3f35] text-lg sm:text-xl" />
    </button>

    {/* Context & Identity */}
    <div className="hidden md:flex flex-col mr-4 lg:mr-6">
      <span className="text-xs text-[#9e8c76] font-medium">Welcome back,</span>
      <span className="text-sm font-semibold text-[#4a3f35]">Sujal Kidecha</span>
    </div>
    <div className="hidden sm:block md:hidden text-sm font-semibold text-[#4a3f35] mr-3">Super Admin</div>

    {/* Center: Search */}
    <div className="flex-1 max-w-[280px] sm:max-w-[350px] lg:max-w-[450px] relative mr-2 md:mr-5 hidden sm:block">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9e8c76" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8">
            <animate attributeName="r" values="8;8.5;8" dur="2s" repeatCount="indefinite" />
          </circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65">
            <animate attributeName="stroke-dasharray" values="0 10;10 0" dur="1.5s" repeatCount="indefinite" />
          </line>
        </svg>
      </div>
      <input
        type="text"
        placeholder="Search..."
        className="w-full pl-[45px] pr-5 py-2.5 md:py-3 rounded-full border border-[#e3ddd3] bg-[#fcfaf7] text-sm text-[#5c5247] outline-none transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] focus:border-[#d4a373] focus:ring-4 focus:ring-[#d4a373]/15 focus:bg-white"
      />
    </div>

    {/* Right: Profile & Actions */}
    <div className="flex items-center gap-1 sm:gap-3 md:gap-5">
      <div className="relative" ref={notificationRef}>
        <button
          onClick={() => setIsNotificationOpen(!isNotificationOpen)}
          className="bg-white border border-[#eee5d8] rounded-xl w-[36px] h-[36px] sm:w-[42px] sm:h-[42px] flex items-center justify-center cursor-pointer relative transition-transform duration-200 active:scale-95 hover:bg-white/55 hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)] flex-shrink-0"
        >
        <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-red-500 to-red-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
          <span className="text-[9px] sm:text-[10px] font-bold text-white">{unreadCount}</span>
        </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4a3f35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-[18px] sm:h-[18px]">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9">
              <animate attributeName="d" values="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9;M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9;M18 9A6 6 0 0 0 6 9c0 7-3 9-3 9h18s-3-2-3-9;M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" dur="2s" repeatCount="indefinite" />
            </path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0">
              <animateTransform attributeName="transform" type="rotate" values="0 12 21;-10 12 21;10 12 21;0 12 21" dur="1s" repeatCount="indefinite" />
            </path>
          </svg>
        </button>

        {/* Notification Panel */}
        <div className={`fixed md:absolute top-[70px] md:top-[60px] left-0 md:left-auto md:right-0 w-full md:w-[380px] lg:w-[420px] bg-gradient-to-br from-white/95 to-white backdrop-blur-[20px] md:rounded-[20px] border-t md:border border-white/60 shadow-[0_25px_50px_rgba(0,0,0,0.2)] z-[1000] origin-top transition-all duration-300 ${isNotificationOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'}`}>
          {/* Header */}
          <div className="px-5 py-4 border-b border-[#f0ede7]">
            <h3 className="text-base font-semibold text-[#4a3f35]">Notifications</h3>
          </div>

          {/* Notifications List */}
          <div className="max-h-[400px] md:max-h-[500px] overflow-y-auto">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`px-5 py-3.5 border-b border-[#f9f7f4] cursor-pointer transition-all duration-200 hover:bg-[#fcfaf7] ${notif.unread ? 'bg-[#fffcf8]' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                    notif.type === 'urgent' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' :
                    notif.type === 'attention' ? 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]' :
                    'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#4a3f35] leading-tight mb-1">{notif.title}</p>
                    <p className="text-xs text-[#9e8c76] leading-snug mb-1.5">{notif.desc}</p>
                    <span className="text-[10px] text-[#b7a384] font-medium">{notif.time}</span>
                  </div>
                  {notif.unread && <div className="w-1.5 h-1.5 rounded-full bg-[#d4a373] flex-shrink-0 mt-2"></div>}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-5 py-3 border-t border-[#f0ede7] bg-[#fcfaf7]/50">
            <button className="w-full text-center text-sm font-semibold text-[#d4a373] hover:text-[#b7a384] transition-colors duration-200">
              View All Notifications
            </button>
          </div>
        </div>
      </div>

      <div className="relative" ref={dropdownRef}>
        <div
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 md:gap-3 p-0.5 pr-1.5 sm:p-1 sm:pr-3 md:pr-4 bg-white/70 border border-[#e3ddd3] rounded-full cursor-pointer transition-all duration-300 active:scale-95 hover:shadow-md"
        >
          <div className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-white shadow-[0_4px_10px_rgba(0,0,0,0.15)] flex-shrink-0">
            <img
              src="https://lh3.googleusercontent.com/a/ACg8ocIRQ3wTCRuJYTO8BRiC01GADRuT9Xw76kdpwKa3p7iBlGZ_XfMHiQ=s360-c-no"
              alt="Profile"
              draggable="false"
              className="w-full h-full object-cover select-none pointer-events-none"
            />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-sm font-semibold text-[#4a3f35] leading-tight">Sujal Kidecha</span>
            <span className="hidden md:block text-xs text-[#9e8c76] font-medium">Super Admin</span>
          </div>
          <svg className="hidden sm:block" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4a3f35" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6"></path>
          </svg>
        </div>

        {/* Dropdown Menu */}
        <div
          className={`absolute top-[60px] sm:top-[72px] right-0 w-[200px] sm:w-[220px] bg-gradient-to-br from-white/90 to-white backdrop-blur-[18px] rounded-[20px] border border-white/55 shadow-[0_25px_45px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.7)] p-2.5 z-[1000] origin-top-right transition-all duration-300 after:content-[''] after:absolute after:inset-1.5 after:rounded-[14px] after:border after:border-dashed after:border-[#aa916e]/35 after:pointer-events-none ${isDropdownOpen ? 'opacity-100 translate-y-0 scale-100 block' : 'opacity-0 -translate-y-[10px] scale-95 pointer-events-none hidden'
            }`}
        >
          <div className="flex items-center gap-3 px-4 py-3 rounded-[14px] text-sm text-[#5c5247] cursor-pointer transition-all duration-200 hover:bg-white/55 hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2">
                <animate attributeName="stroke-dasharray" values="0 30;30 0" dur="2s" repeatCount="indefinite" />
              </path>
              <circle cx="12" cy="7" r="4">
                <animate attributeName="r" values="4;4.3;4" dur="1.5s" repeatCount="indefinite" />
              </circle>
            </svg>
            Profile
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-[14px] text-sm text-[#5c5247] cursor-pointer transition-all duration-200 hover:bg-white/55 hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <g>
                <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="8s" repeatCount="indefinite" />
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </g>
            </svg>
            Settings
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-[14px] text-sm text-[#5c5247] border-t border-[#f0ede7] mt-1 cursor-default">
            <div className="flex flex-col">
              <span className="text-[11px] text-[#9e8c76]">Access Level</span>
              <span className="text-[11px] bg-[#f0ede7] px-2.5 py-1 rounded-full text-[#8a7b6a] font-bold mt-1 border border-dashed border-[#d1c8bc]">Role: Admin</span>
            </div>
          </div>
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-[14px] text-sm text-[#c27d7d] cursor-pointer transition-all duration-200 hover:bg-white/55 hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)]"
            onClick={handleLogout}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7">
                <animate attributeName="points" values="16 17 21 12 16 7;17 17 22 12 17 7;16 17 21 12 16 7" dur="1.5s" repeatCount="indefinite" />
              </polyline>
              <line x1="21" y1="12" x2="9" y2="12">
                <animate attributeName="stroke-dasharray" values="0 20;20 0" dur="2s" repeatCount="indefinite" />
              </line>
            </svg>
            Logout
          </div>
        </div>
      </div>
    </div>
  </div>
  </header>
  );
};

export default Header;