import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [remember, setRemember] = useState(false);
  // const [checkError, setCheckError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);


  const handleLogin = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    // if (!remember) {
    //   toast.error("Please confirm Remember Me");
    //   return;
    // }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.msg || "Login failed");
        return;
      }

      toast.success("OTP sent to your email");
      localStorage.setItem("otp_session", "true");
      localStorage.setItem("otp_email", email);
      navigate("/verify-otp", { state: { email } });

    } catch {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };



  return (
    <>
      <style>{cssStyles}</style>

      <div className="login-page-wrapper">
        <div className="main-content-container">

          {/* Left Side: Branding & Features */}
          <div
            className="branding-section"
            style={{
              backgroundImage: `url("/src/assets/loginLeft.png")`
            }}
          >
            <div className="tape-illustration-top">
              <MeasuringTapeSVG />
            </div>

            <h1 className="main-heading">
              Smart Tailoring.<br />Better Business.
            </h1>

            <p className="sub-description">
              Powerful tools to manage customers, store measurements,<br />
              and grow your tailoring business with confidence.
            </p>

            <ul className="feature-list">
              <li><CheckIcon /> <span>Secure admin system</span></li>
              <li><CheckIcon /> <span>Organized customer records</span></li>
              <li><CheckIcon /> <span>Accurate measurement tracking</span></li>
              <li><CheckIcon /> <span>Faster tailoring workflow</span></li>
            </ul>

            <div className="tape-illustration-bottom">
              <MeasuringTapeSVG />
            </div>
          </div>


          {/* Right Side: Login Card */}
          <div className="form-section">
            <div
              className="right-poster"
              style={{ backgroundImage: `url("/src/assets/loginRight.png")` }}
            >
              <div className="glass-login-card">
                <div className="card-stitched-inner">

                  {/* Header */}
                  <header className="form-header">
                    <div className="brand-logo">
                      <MannequinIcon />
                      <div className="logo-text">
                        <h2>Tailor</h2>
                        <p>Management System</p>
                      </div>
                    </div>
                    <h3 className="welcome-back">Welcome Back</h3>
                    <p className="sign-in-prompt">Sign in to your Tailor Management Dashboard</p>
                  </header>

                  {/* Form */}
                  <form className="login-form" onSubmit={handleLogin}>
                    <div className="input-group">
                      <div className="input-wrapper">
                        <MailIcon />
                        <input
                          type="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="input-group">
                      <div className="input-wrapper">
                        <LockIcon />
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                          type="button"
                          className="toggle-visibility"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <EyeIcon active={showPassword} />
                        </button>
                      </div>
                    </div>

                    <div className="form-options">
                      {/* <label className="checkbox-container">
                        <input
                          type="checkbox"
                          checked={remember}
                          onChange={() => {
                            setRemember(!remember);
                            setCheckError("");
                          }}
                        />
                        <span className="checkmark"></span>
                        Remember me
                      </label> */}


                      <a onClick={() => navigate("/forgot-password")} className="forgot-link">
                        Forgot password?
                      </a>
                    </div>

                    <button
                      type="submit"
                      className="login-btn"
                      disabled={loading}
                    >
                      {loading ? <span className="btn-loader"></span> : "Login"}
                    </button>
                  </form>

                  <footer className="card-footer">
                    © Tailor Management System — Crafted with precision.
                  </footer>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};
// --- SVG Icons ---

const CheckIcon = () => (
  <div className="premium-check-icon">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7c6a5a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </div>
);

const MannequinIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#5d4a3b" strokeWidth="1.2">
    <path d="M12 4c-2 0-3 1-3 3v2c0 2 1 3 3 5s3-3 3-5V7c0-2-1-3-3-3zM9 9h6M8 14c-1 2-2 4-2 7h12c0-3-1-5-2-7M12 14v7" strokeLinecap="round" />
  </svg>
);

const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a38b75" strokeWidth="1.5">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const LockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a38b75" strokeWidth="1.5">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeIcon = ({ active }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#a38b75"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />

    {!active && (
      <line x1="3" y1="3" x2="21" y2="21" />
    )}
  </svg>
);


const MeasuringTapeSVG = () => (
  <svg width="200" height="200" viewBox="0 0 200 200" fill="none" style={{ opacity: 0.2 }}>
    <path d="M10 150 C 40 130, 80 180, 120 160 S 180 120, 190 80" stroke="#5d4a3b" strokeWidth="4" strokeDasharray="4 6" />
    <path d="M15 145 L 20 155 M 35 152 L 40 162 M 55 158 L 60 168" stroke="#5d4a3b" strokeWidth="1" />
  </svg>
);

// --- CSS Styles ---

const cssStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Inter:wght@300;400;500;600&display=swap');

  :root {
    --gold: #C5A059;
    --gold-light: #e0c58a;
    --text-dark: #4A3C31;
    --text-muted: #7c6a5a;
    --bg-cream: #FDFBF7;
    --stitched-color: #d6c8b8;
  }

  * { box-sizing: border-box; }
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
  .login-page-wrapper {
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f1e9df;
    background-image: 
      radial-gradient(circle at 20% 30%, #fff 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, #fff 0%, transparent 50%),
      linear-gradient(135deg, #f1e9df 0%, #e6dace 100%);
    position: relative;
    overflow: hidden;
    font-family: 'Inter', sans-serif;
  }

  /* Satin Fabric Effect Overlay */
  .login-page-wrapper::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url('https://www.transparenttextures.com/patterns/natural-paper.png');
    opacity: 0.3;
    pointer-events: none;
  }

.main-content-container {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0;
  z-index: 1;
  align-items: stretch;
}

  /* Left Side Styles */
.branding-section {
  width: 50%;
  padding: 90px 100px;
  position: relative;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  border-radius: 0 28px 28px 0;

  box-shadow:
    inset 0 0 120px rgba(255,255,255,0.55);

  display: flex;
  flex-direction: column;
  justify-content: center;
}


.branding-section::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top left, rgba(255,255,255,0.6), transparent 60%);
  pointer-events: none;
  border-radius: 28px;
}
  .branding-section > * {
  position: relative;
  z-index: 2;
}

  .main-heading {
  font-family: 'Instrument Serif', serif;
  font-size: 64px;
  color: #5d4635;

  text-shadow:
    0 2px 2px rgba(255,255,255,0.8),
    0 6px 12px rgba(0,0,0,0.08);

  margin-bottom: 28px;
  letter-spacing:2px;
}


  .sub-description {
    font-size: 18px;
    color: var(--text-muted);
    line-height: 1.6;
    margin-bottom: 34px;
  }

  .feature-list {
    list-style: none;
    padding: 0;
  }

 .feature-list li {
    display: flex;
    align-items: center;
    gap: 16px; /* Gap thoda badhaya */
    margin-bottom: 20px;
    font-size: 16px;
    color: var(--text-dark);
    font-weight: 500;
    /* Smooth transition for hover effect */
    transition: transform 0.3s ease;
    cursor: default;
  }
.feature-list li:hover {
    transform: translateX(5px);
  }
  .check-box-icon {
    width: 32px;
    height: 32px;
    background: #fff;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 10px rgba(197, 160, 89, 0.2);
    border: 1px solid #efe6da;
  }

  /* The Premium Check Icon Container */
  .premium-check-icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #fdfbf7 0%, #f1e9df 100%);
    border: 1.6px dashed #d6c8b8;
    box-shadow: 
      inset 0 2px 4px rgba(255, 255, 255, 0.8),
      0 4px 12px rgba(197, 160, 89, 0.3),
      0 2px 4px rgba(0, 0, 0, 0.05);
      
    /* Smooth transition for icon hover */
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    position: relative;
    overflow: hidden;
  }
    /* The Premium Check Icon Container */
  .premium-check-icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    background: linear-gradient(135deg, #fdfbf7 0%, #f1e9df 100%);
    border: 1.5px dashed #d6c8b8;
    box-shadow: 
      inset 0 2px 4px rgba(255, 255, 255, 0.8),
      0 4px 12px rgba(197, 160, 89, 0.3),
      0 2px 4px rgba(0, 0, 0, 0.05);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    position: relative;
    overflow: hidden;
  }
  .feature-list li:hover .premium-check-icon {
    box-shadow: 
      inset 0 2px 4px rgba(255, 255, 255, 0.9),
      0 6px 16px rgba(197, 160, 89, 0.5),
      0 4px 8px rgba(0, 0, 0, 0.08);
    border-color: #c5a059;
  }
  .form-section {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  // padding-right: 80px;
}

  .glass-login-card {
    background: rgba(255, 255, 255, 0.45);
    backdrop-filter: blur(15px);
    border-radius: 20px;
    padding: 12px;
    box-shadow:
  0 30px 60px rgba(93, 74, 59, 0.14),
  inset 0 1px 0 rgba(255,255,255,0.6);  
    border: 1px solid rgba(255, 255, 255, 0.6);
  }

  .card-stitched-inner {
    border: 1.8px dashed #997851;
    border-radius: 32px;
    padding: 24px 42px;
    text-align: center;
}

  .brand-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-bottom: 24px;
  }

  .logo-text h2 {
    font-family: 'Instrument Serif', serif;
    font-size: 20px;
    margin: 0;
    line-height: 1;
    color: var(--text-dark);
  }

  .logo-text p {
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin: 2px 0 0;
    color: var(--text-muted);
  }

  .welcome-back {
    // font-family: 'Instrument Serif', serif;
    // font-family: "Gill Sans", sans-serif;
    font-size: 32px;
    color: #504225;
    margin: 0 0 8px;
}

  .sign-in-prompt {
    font-size: 14px;
    color: var(--text-muted);
    margin-bottom: 32px;
  }

  /* Form Controls */
  .input-group {
    margin-bottom: 16px;
  }

 .input-wrapper {
    background: rgba(255, 255, 255, 0.5);
    /* Pehli stitch line */
    border: 1.2px dashed #d6c8b8; 
    border-radius: 25px;
    display: flex;
    align-items: center;
    padding: 0 18px;
    height: 58px;
    position: relative;
    transition: all 0.4s ease;
    overflow: hidden;
    /* Subtle fabric feel inside input */
    background-image: radial-gradient(#efe6da 0.3px, transparent 0.3px);
    background-size: 3px 3px;
  }

  .input-wrapper::after {
    content: '';
    position: absolute;
    inset: 4px; /* Andar ki taraf gap */
    border: 1px dashed rgba(214, 200, 184, 0.4);
    border-radius: 21px;
    pointer-events: none;
  }

.input-wrapper:focus-within {
    background: #fff;
    border-style: solid; /* Focus par dhaga mazboot ho jayega */
    border-color: var(--gold);
    box-shadow: 
      0 0 0 4px rgba(197, 160, 89, 0.05),
      inset 0 1px 3px rgba(0,0,0,0.02);
    transform: translateY(-1px);
  }

  .input-wrapper input {
    background: transparent;
    border: none;
    outline: none;
    flex: 1;
    padding: 0 12px;
    font-family: 'Inter', sans-serif;
    color: var(--text-dark);
    font-size: 15px;
    z-index: 2; /* Thread lines ke upar rahega text */
  }

  .input-wrapper svg {
    color: #a38b75;
    filter: drop-shadow(0 1px 1px rgba(255,255,255,0.8));
    z-index: 2;
  }

  .toggle-visibility {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  .form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    font-size: 13px;
    padding: 0 5px;
  }





.forgot-link {
    color: #4d4026;
    text-decoration: none;
    font-weight: 500;
    cursor: pointer;
}
.right-poster {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
}

/* Custom Stitched Checkmark */
  .checkmark {
    height: 20px;
    width: 20px;
    background: rgba(255, 255, 255, 0.5);
    /* Dhage wali border */
    border: 1.2px dashed #d6c8b8;
    border-radius: 6px;
    position: relative;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }


  /* Checkmark icon (Dhage jaisa) */
  .checkmark::after {
    content: "";
    width: 5px;
    height: 10px;
    border: solid var(--gold);
    border-width: 0 2.5px 2.5px 0;
    transform: rotate(45deg) scale(0);
    transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  /* Buttons */
.login-btn {
    width: 100%;
    height: 58px;
    border-radius: 20px;
    /* Rich Gold Gradient */
        background: linear-gradient(135deg, #74602a 0%, #c5a059 50%, #b38b45 100%);
    color: #fff;
    font-size: 17px;
    font-weight: 600;
    cursor: pointer;
    position: relative;
    border: none;
    box-shadow: 0 10px 25px rgba(197, 160, 89, 0.3);
    transition: all 0.4s ease;
    overflow: hidden;
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
.login-btn::before {
    content: '';
    position: absolute;
    inset: 5px; /* Button ke andar gap */
    border: 1.2px dashed rgba(255, 255, 255, 0.4);
    border-radius: 16px;
    pointer-events: none;
    transition: all 0.3s ease;
  }
.login-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(197, 160, 89, 0.5);
    filter: brightness(1.05);
  }

.btn-loader {
  width: 22px;
  height: 22px;
  border: 3px solid rgba(255,255,255,.4);
  border-top: 3px solid #fff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.login-btn:disabled {
  opacity: .85;
  cursor: not-allowed;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

  /* Hover par dhaga chamkega */
  .login-btn:hover::before {
    border-color: rgba(255, 255, 255, 0.8);
    border-style: dashed;
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
  }

  /* Active state (Click par) */
  .login-btn:active {
    transform: translateY(0);
    box-shadow: 0 5px 15px rgba(197, 160, 89, 0.4);
  }

 .divider {
    font-size: 14px;
    color: var(--text-muted);
    margin-bottom: 24px;
    margin-top: 12px;
}

  .divider a {
    color: var(--gold);
    text-decoration: none;
    font-weight: 500;
    cursor: pointer;
  }

  .create-btn {
    width: 100%;
    height: 56px;
    border-radius: 20px;
    background: transparent;
    border: 1px solid var(--stitched-color);
    color: var(--text-dark);
    font-weight: 600;
    cursor: pointer;
    transition: 0.3s;
  }

  .create-btn:hover {
    background: #fff;
    border-color: var(--text-dark);
  }

.card-footer {
    margin-top: 32px;
    font-size: 12px;
    color: #2d1500;
    opacity: 0.8;
}

  /* Tape Illustrations */
  .tape-illustration-top { position: absolute; top: -80px; left: -40px; transform: rotate(-15deg); }
  .tape-illustration-bottom { position: absolute; bottom: -100px; right: 0; transform: rotate(10deg); }

  /* Responsive */
  @media (max-width: 1024px) {
    .branding-section { display: none; }
    .main-content-container { justify-content: center; }
  }
    .stitched-error {
  margin-top: 6px;
  padding: 8px 12px;
  border: 1.5px dashed #C5A059;
  border-radius: 10px;
  background: rgba(255,255,255,.6);
  color: #7c2f1d;
  font-size: 12px;
  font-weight: 500;
  animation: shake .3s ease;
}

@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-3px); }
  50% { transform: translateX(3px); }
  75% { transform: translateX(-2px); }
  100% { transform: translateX(0); }
}
.input-group input:-webkit-autofill, .input-group input:-webkit-autofill:hover, .input-group input:-webkit-autofill:focus, .input-group input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px #e1e1e100 inset !important;
    -webkit-text-fill-color: black !important;
    transition: background-color 5000s ease-in-out 0s;
}
`;

export default Login;