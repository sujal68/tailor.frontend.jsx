import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    // Kill all auth data
    localStorage.removeItem("token");
    localStorage.removeItem("otp_session");
    localStorage.removeItem("otp_email");

    // Hard redirect to fully reset app state
    window.location.href = "/";
  };


  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const styles = {
    headerWrapper: {
      width: '100%',
      padding: '20px 24px',
      boxSizing: 'border-box',
      fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      // background: 'linear-gradient(135deg, #fdfbf7 0%, #f5f0e6 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'relative',
      zIndex: 100,
    },
    glassContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      padding: '12px 24px',
      background: 'rgba(255, 255, 255, 0.4)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      border: '1px solid rgba(255, 255, 255, 0.6)',
      boxShadow: '0 8px 32px rgba(183, 163, 132, 0.15)',
      position: 'relative',
    },
    // Left Section
    titleSection: {
      display: 'flex',
      flexDirection: 'column',
      minWidth: '220px',
    },
    mainTitle: {
      margin: 0,
      fontSize: '24px',
      fontWeight: '700',
      color: '#4a3f35',
      letterSpacing: '-0.5px',
    },
    subTitle: {
      margin: 0,
      fontSize: '10px',
      fontWeight: '800',
      color: '#9e8c76',
      textTransform: 'uppercase',
      letterSpacing: '1.5px',
      marginTop: '2px',
    },
    // Center Search
    searchContainer: {
      flex: '0 1 450px',
      position: 'relative',
      margin: '0 20px 0 0px',
    },
    searchInput: {
      width: '100%',
      padding: '12px 20px 12px 45px',
      borderRadius: '50px',
      border: '1px solid #e3ddd3',
      background: '#fcfaf7',
      fontSize: '14px',
      color: '#5c5247',
      outline: 'none',
      transition: 'all 0.3s ease',
      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
    },
    searchIcon: {
      position: 'absolute',
      left: '16px',
      top: '50%',
      transform: 'translateY(-50%)',
      opacity: 0.5,
    },
    // Right Section
    rightActions: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
    },
    iconButton: {
      background: '#fff',
      border: '1px solid #eee5d8',
      borderRadius: '12px',
      width: '42px',
      height: '42px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      position: 'relative',
      transition: 'transform 0.2s ease',
    },
    notificationDot: {
      position: 'absolute',
      top: '10px',
      right: '11px',
      width: '8px',
      height: '8px',
      background: '#d4a373',
      borderRadius: '50%',
      border: '2px solid #fff',
      boxShadow: '0 0 10px rgba(212, 163, 115, 0.6)',
    },
    profileTrigger: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '4px',
      paddingRight: '12px',
      background: 'rgba(255, 255, 255, 0.7)',
      border: '1px solid #e3ddd3',
      borderRadius: '50px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    avatarWrapper: {
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      overflow: 'hidden',
      border: '2px solid #fff',
      boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
      flexShrink: 0,
    },
    avatarImg: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      userSelect: 'none',
      pointerEvents: 'none',
    },
    // Dropdown
    dropdown: {
      position: 'absolute',
      top: '72px',
      right: '24px',
      width: '220px',
      background: 'linear-gradient(rgb(255 255 255 / 89%), rgb(255, 255, 255))',
      backdropFilter: 'blur(18px)',
      borderRadius: '20px',
      border: '1px solid rgba(255,255,255,0.55)',
      boxShadow: `
      0 25px 45px rgba(0,0,0,0.15),
      inset 0 1px 1px rgba(255,255,255,0.7)
  `,

      padding: '10px',
      display: isDropdownOpen ? 'block' : 'none',
      transformOrigin: 'top right',
      animation: 'dropdownIn 0.35s cubic-bezier(.25,.8,.25,1) forwards',
      zIndex: 1000,
    },

    dropdownItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 16px',
      borderRadius: '14px',
      fontSize: '14px',
      color: '#5c5247',
      cursor: 'pointer',
      transition: 'all 0.25s ease',
      textDecoration: 'none',
    },
    roleBadge: {
      fontSize: '11px',
      background: '#f0ede7',
      padding: '4px 10px',
      borderRadius: '20px',
      color: '#8a7b6a',
      fontWeight: 'bold',
      marginTop: '4px',
      border: '1px dashed #d1c8bc',
    }
  };

  return (
    <header style={styles.headerWrapper}>
      <style>
        {`
          @keyframes dropdownIn {
            from { opacity: 0; transform: translateY(-10px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
              .dropdown-fabric {
  position: relative;
}

.dropdown-fabric::after {
  content: "";
  position: absolute;
  inset: 6px;
  border-radius: 14px;
  border: 1px dashed rgba(170, 145, 110, 0.35);
  pointer-events: none;
}
          .search-input-focus:focus {
            border-color: #d4a373 !important;
            box-shadow: 0 0 0 4px rgba(212, 163, 115, 0.15) !important;
            background: #fff !important;
          }
            .hover-subtle:hover {
              background: rgba(255,255,255,0.55) !important;
              box-shadow: inset 0 0 0 1px rgba(255,255,255,0.35);
            }
          .btn-press:active {
            transform: scale(0.95);
          }
          .stitch-border {
             position: relative;
          }
          .stitch-border::after {
            content: '';
            position: absolute;
            top: 4px; left: 4px; right: 4px; bottom: 4px;
            border: 1px dashed rgba(183, 163, 132, 0.3);
            border-radius: inherit;
            pointer-events: none;
          }
        `}
      </style>

      <div style={styles.glassContainer} className="stitch-border">
        {/* Left: Title */}
        {/*<div style={styles.titleSection}>
          <h1 style={styles.mainTitle}>Reports & Analytics</h1>
          <span style={styles.subTitle}>Bespoke Management System</span>
        </div>*/}

        {/* Center: Search */}
        <div style={styles.searchContainer}>
          <div style={styles.searchIcon}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9e8c76" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search patterns, orders, clients..."
            style={styles.searchInput}
            className="search-input-focus"
          />
        </div>

        {/* Right: Profile & Actions */}
        <div style={styles.rightActions}>
          <button style={styles.iconButton} className="btn-press hover-subtle">
            <div style={styles.notificationDot}></div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4a3f35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </button>

          <div style={{ position: 'relative' }} ref={dropdownRef}>
            <div
              style={styles.profileTrigger}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="btn-press"
            >
              <div style={styles.avatarWrapper}>
                <img
                  src="https://lh3.googleusercontent.com/a/ACg8ocIRQ3wTCRuJYTO8BRiC01GADRuT9Xw76kdpwKa3p7iBlGZ_XfMHiQ=s360-c-no"   // 👈 yaha apna image path
                  alt="Profile"
                  draggable="false"
                  style={styles.avatarImg}
                />
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4a3f35" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6"></path>
              </svg>
            </div>

            {/* Dropdown Menu */}
            <div style={styles.dropdown} className="dropdown-fabric">
              <div style={styles.dropdownItem} className="hover-subtle">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                Profile
              </div>
              <div style={styles.dropdownItem} className="hover-subtle">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                Settings
              </div>
              <div style={{ ...styles.dropdownItem, borderTop: '1px solid #f0ede7', marginTop: '4px', cursor: 'default' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '11px', color: '#9e8c76' }}>Access Level</span>
                  <span style={styles.roleBadge}>Role: Admin</span>
                </div>
              </div>
              <div
                style={{ ...styles.dropdownItem, color: '#c27d7d' }}
                className="hover-subtle"
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