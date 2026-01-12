import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import measerTap from "../assets/measerTap.png";

/**
 * Sidebar.jsx
 * A Luxury Tailor Management System Admin Sidebar
 * Features: Stitched borders, fabric textures, glassmorphism, and smooth animations.
 */


const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('Dashboard');
  
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
      <style>{cssStyles}</style>
      <div className={`sidebar-container ${isCollapsed ? 'collapsed' : ''}`}>

        {/* Main Stitched Wrapper */}
        <div className="sidebar-inner">
          <div className="stitched-border">

            {/* Collapse Toggle */}
            <button
              className="collapse-toggle"
              onClick={() => setIsCollapsed(!isCollapsed)}
              aria-label="Toggle Sidebar"
            >
              {isCollapsed ? <FiChevronLeft /> : <FiChevronLeft />}
            </button>

            {/* Header / Logo */}
            <div className="logo-section">
              <div className="logo-icon">
                <MannequinIcon />
              </div>
              {!isCollapsed && (
                <div className="logo-text">
                  <h1>Tailor</h1>
                  <p>Management System</p>
                </div>
              )}
            </div>

            {/* Navigation */}
            <nav className="nav-section">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  className={`nav-item ${activeItem === item.name ? 'active' : ''}`}
                  onClick={() => setActiveItem(item.name)}
                >
                  <span className="icon-wrapper">{item.icon}</span>
                  {!isCollapsed && <span className="nav-label">{item.name}</span>}
                </button>
              ))}
            </nav>

            {/* Divider */}
            <div className="stitched-divider"></div>

            {/* Footer */}
            <div className="footer-section">
              {footerItems.map((item) => (
                <button
                  key={item.name}
                  className={`nav-item ${activeItem === item.name ? 'active' : ''}`}
                  onClick={() => setActiveItem(item.name)}
                >
                  <span className="icon-wrapper">{item.icon}</span>
                  {!isCollapsed && <span className="nav-label">{item.name}</span>}
                </button>
              ))}
            </div>

            {!isCollapsed && (
              <img
                src={measerTap}
                className="tape-watermark"
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


// --- CSS Styles ---

const cssStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Inter:wght@300;400;500&display=swap');

 .sidebar-container {
    width: 320px;
    height: 99vh; /* Poori screen ki height */
    padding: 10px 20px; /* Thoda space side mein */
    box-sizing: border-box; /* Padding height mein include ho jaye */
    transition: width 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1);
    position: sticky; /* Screen ke saath rahega */
    top: 0;
    font-family: 'Inter', sans-serif;
    color: #5d4a3b;
    overflow: hidden; /* Scrollbar bilkul band */
  }

  .sidebar-container.collapsed {
    width: 130px;
  }

.sidebar-inner {
    height: 100%; /* Parent ke hisaab se fit */
    background-color: #fdfaf5;
    background-image: radial-gradient(#e8dfd2 0.5px, transparent 0.5px);
    background-size: 4px 4px;
    border-radius: 30px;
    box-shadow: 0 15px 40px rgba(93, 74, 59, 0.08);
    position: relative;
    border: 1px solid #efe6da;
    display: flex;
    flex-direction: column;
  }

.stitched-border {
    height: 100%;
    border: 1.6px dashed #d6c8b8;
    border-radius: 24px;
    margin: 10px; /* Inner padding ka kaam karega */
    display: flex;
    flex-direction: column;
    padding: 20px 12px;
    position: relative;
    box-sizing: border-box;
  }

  /* --- DOUBLE STITCH EFFECT --- */
  .stitched-border::after {
    content: "";
    position: absolute;
    /* Isse andar waali border thodi si gap pe set hogi */
    top: 4px;
    left: 4px;
    right: 4px;
    bottom: 4px;
    /* Andar waali doosri stitch line */
    border: 1.55px dashed #d6c8b8;
    border-radius: 24px;
    pointer-events: none; /* Taaki clicks buttons tak pahunch sakein */
    opacity: 0.8; /* Thoda subtle look ke liye */
  }

.collapse-toggle {
  position: absolute;
  top: 18px;
  right: -14px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(145deg, #f6efe6, #e7dbc8);
  border: 1px solid rgba(180, 150, 100, 0.35);
  box-shadow:
    0 6px 14px rgba(0,0,0,0.15),
    inset 0 1px 2px rgba(255,255,255,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.35s ease;
  z-index: 10;
}

.collapse-toggle svg {
  font-size: 20px;
  color: #6f5b3e;
  transition: transform 0.35s ease;
}
  
.sidebar-container.collapsed .collapse-toggle svg {
  transform: rotate(180deg);
}
  .collapse-toggle:hover {
    box-shadow:
    0 10px 22px rgba(0,0,0,0.2),
    inset 0 1px 2px rgba(255,255,255,0.6);
  transform: scale(1.05);
  }
.collapse-toggle:active {
  transform: scale(0.95);
}
  .logo-section {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 48px;
    padding-left: 12px;
  }

  .logo-icon {
    min-width: 44px;
    height: 44px;
    background: #fff;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #5d4a3b;
    box-shadow: 0 4px 12px rgba(93, 74, 59, 0.08);
  }

  .logo-text h1 {
    font-family:monospace;
    font-size: 24px;
    margin: 0;
    line-height: 1;
    font-weight: 400;
  }

  .logo-text p {
    font-size: 11px;
    margin: 2px 0 0 0;
    text-transform: uppercase;
    letter-spacing: 1px;
    opacity: 0.7;
  }
     .nav-section {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow-y: auto;
    
    -ms-overflow-style: none; 
    scrollbar-width: none;
  }

  
  .nav-section::-webkit-scrollbar {
    display: none;
  }
  .nav-section, .footer-section {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 14px;
    border: none;
    background: transparent;
    cursor: pointer;
    border-radius: 20px;
    color: #7c6a5a;
    transition: all 0.3s ease;
    width: 100%;
    text-align: left;
    position: relative;
    overflow: hidden;
  }

  .nav-item:hover {
    background: rgba(232, 223, 210, 0.3);
    color: #5d4a3b;
  }

.nav-item.active {
    background: #e8dfd29e;
    color: #5d4a3b;
    box-shadow: inset 0 2px 4px rgb(108 108 108 / 26%), 0 4px 15px rgb(255 255 255 / 33%);
}

  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 24px;
  }

  .nav-label {
    font-size: 15px;
    font-weight: 500;
    white-space: nowrap;
  }

  .stitched-divider {
    margin: 24px 0;
    border-top: 1.5px dashed #d6c8b8;
    width: 100%;
  }

  .footer-section {
    margin-top: auto;
  }

  .tape-watermark {
    position: absolute;
    bottom: -40px;
    right: -40px;
    pointer-events: none;
    transform: rotate(-15deg);
  }

  /* Handle Collapsed State Nav */
  .collapsed .nav-item {
    justify-content: center;
    padding: 14px 0;
  }

  .collapsed .logo-section {
    padding-left: 0;
    justify-content: center;
  }

.tape-watermark {
    position: absolute;
    bottom: 7px;
    right: 7px;
    width: 99px;
    opacity: 0.48;
    pointer-events: none;
    transform: rotate(1deg);
    filter: sepia(25%) brightness(1.05);
}

.tape-watermark {
  transition: opacity 0.3s ease, transform 0.3s ease;
}


`;

export default Sidebar;