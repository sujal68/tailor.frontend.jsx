import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setSidebarOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false); const dropdownRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const handleLogout = (): void => { localStorage.removeItem("token"); localStorage.removeItem("otp_session"); localStorage.removeItem("otp_email"); window.location.href = "/"; };

  useEffect(() => { const handleClickOutside = (event: MouseEvent): void => { if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) { setIsDropdownOpen(false); } }; document.addEventListener('mousedown', handleClickOutside); return () => document.removeEventListener('mousedown', handleClickOutside); }, []);

  return (<header className="w-full px-3 sm:px-4 md:px-6 py-3 md:py-5 flex items-center justify-between relative z-20 font-sans"> <div className="flex items-center justify-between w-full px-3 sm:px-4 md:px-6 py-3 bg-white/40 backdrop-blur-md rounded-[20px] border border-white/60 shadow-[0_8px_32px_rgba(183,163,132,0.15)] relative after:content-[''] after:absolute after:inset-1 after:border after:border-dashed after:border-[#b7a384]/30 after:rounded-[inherit] after:pointer-events-none">

    {/* Mobile Menu Toggle */}
    <button
      onClick={() => setSidebarOpen(true)}
      className="md:hidden bg-white border border-[#eee5d8] rounded-xl w-[38px] h-[38px] flex items-center justify-center cursor-pointer transition-transform duration-200 active:scale-95 hover:bg-white/55"
    >
      <FiMenu className="text-[#4a3f35] text-xl" />
    </button>

    {/* Center: Search */}
    <div className="flex-1 max-w-[450px] relative mr-2 md:mr-5 hidden sm:block">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9e8c76" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
      <input
        type="text"
        placeholder="Search..."
        className="w-full pl-[45px] pr-5 py-2.5 md:py-3 rounded-full border border-[#e3ddd3] bg-[#fcfaf7] text-sm text-[#5c5247] outline-none transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] focus:border-[#d4a373] focus:ring-4 focus:ring-[#d4a373]/15 focus:bg-white"
      />
    </div>

    {/* Right: Profile & Actions */}
    <div className="flex items-center gap-2 sm:gap-3 md:gap-5">
      <button className="bg-white border border-[#eee5d8] rounded-xl w-[38px] h-[38px] sm:w-[42px] sm:h-[42px] flex items-center justify-center cursor-pointer relative transition-transform duration-200 active:scale-95 hover:bg-white/55 hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)]">
        <div className="absolute top-[8px] right-[9px] sm:top-[10px] sm:right-[11px] w-2 h-2 bg-[#d4a373] rounded-full border-2 border-white shadow-[0_0_10px_rgba(212,163,115,0.6)]"></div>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4a3f35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
      </button>

      <div className="relative" ref={dropdownRef}>
        <div
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 md:gap-3 p-1 pr-2 sm:pr-3 bg-white/70 border border-[#e3ddd3] rounded-full cursor-pointer transition-all duration-300 active:scale-95"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 border-white shadow-[0_4px_10px_rgba(0,0,0,0.15)] flex-shrink-0">
            <img
              src="https://lh3.googleusercontent.com/a/ACg8ocIRQ3wTCRuJYTO8BRiC01GADRuT9Xw76kdpwKa3p7iBlGZ_XfMHiQ=s360-c-no"
              alt="Profile"
              draggable="false"
              className="w-full h-full object-cover select-none pointer-events-none"
            />
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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            Profile
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-[14px] text-sm text-[#5c5247] cursor-pointer transition-all duration-200 hover:bg-white/55 hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
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