import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

/**
 * ForgotPassword.jsx
 * Step-based Luxury Forgot Password System
 * Step 1: Email | Step 2: OTP | Step 3: Reset Password
 */

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1, 2, or 3
  const [loading, setLoading] = useState(false);

  // States for inputs
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [passwords, setPasswords] = useState({ new: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);

  // Timer State
  const [timer, setTimer] = useState(90);
  const otpRefs = useRef([]);

  // Timer logic for Step 2
  useEffect(() => {
    let interval;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  useEffect(() => {
    if (step === 2 && otpRefs.current[0]) {
      otpRefs.current[0].focus();
    }
  }, [step]);

  // --- Handlers ---

  const handleSendOTP = async () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) return toast.error("Enter a valid email");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      if (res.ok) {
        toast.success("Verification code sent");
        setStep(2);
      } else {
        const data = await res.json();
        toast.error(data.msg || "Email not found");
      }
    } catch { toast.error("Server error"); }
    setLoading(false);
  };

  const handleOtpPaste = (e) => {
    const code = e.clipboardData.getData("text").replace(/\D/g, "");
    if (code.length !== 6) return;

    const newOtp = code.split("");
    setOtp(newOtp);

    newOtp.forEach((d, i) => {
      otpRefs.current[i].value = d;
    });

    setTimeout(() => setStep(3), 400); // smooth auto continue
  };


  const handleResetPassword = async () => {
    const enteredOTP = otp.join("");

    if (enteredOTP.length !== 6) return toast.error("Enter valid OTP");
    if (passwords.new.length < 6) return toast.error("Password too short");
    if (passwords.new !== passwords.confirm) return toast.error("Passwords do not match");

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          otp: enteredOTP,
          password: passwords.new
        })
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.msg || "Reset failed");
        setLoading(false);
        return;
      }

      toast.success("Password updated successfully");
      setTimeout(() => navigate("/login"), 1500);

    } catch {
      toast.error("Server error");
    }

    setLoading(false);
  };


  // OTP Input Logic
  const handleOtpChange = (value, index) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    if (value && index < 5) otpRefs.current[index + 1].focus();
  };

  return (
    <>
      <style>{cssStyles}</style>
      <div className="login-page-wrapper">
        <div className="main-content-container">

          {/* Left Side: Identical Branding */}
          <div
            className="branding-section"
            style={{ backgroundImage: `url("/src/assets/loginLeft.png")` }}
          >
            <div className="tape-illustration-top"><MeasuringTapeSVG /></div>

            <h1 className="main-heading">Securing Your<br />Digital Atelier.</h1>

            <p className="sub-description">
              Follow our handcrafted recovery process to regain access<br />
              to your master tailoring dashboard securely.
            </p>

            <ul className="feature-list">
              <li><CheckIcon /> <span>Encrypted Identity Verification</span></li>
              <li><CheckIcon /> <span>Secure Password Restoration</span></li>
              <li><CheckIcon /> <span>Instant Account Recovery</span></li>
            </ul>

            <div className="tape-illustration-bottom"><MeasuringTapeSVG /></div>
          </div>

          {/* Right Side: Step-Based Card */}
          <div className="form-section">
            <div
              className="right-poster"
              style={{ backgroundImage: `url("/src/assets/loginRight.png")` }}
            >
              <div className="glass-login-card">
                <div className="card-stitched-inner">

                  <header className="form-header">
                    <div className="brand-logo">
                      <MannequinIcon />
                      {/* <div className="logo-text">
                        <h2>Tailor</h2>
                        <p>Management System</p>
                      </div> */}
                    </div>

                    {step === 1 && (
                      <div className="step-header">
                        <h3 className="welcome-back">Recover Account</h3>
                        <p className="sign-in-prompt">Enter your email to receive a secure code.</p>
                      </div>
                    )}
                    {step === 2 && (
                      <div className="step-header">
                        <h3 className="welcome-back">Verify Identity</h3>
                        <p className="sign-in-prompt">We’ve sent a 6-digit code to <br /> <b>{email}</b></p>
                      </div>
                    )}
                    {step === 3 && (
                      <div className="step-header">
                        <h3 className="welcome-back">Reset Password</h3>
                        <p className="sign-in-prompt">Choose a strong password for your atelier.</p>
                      </div>
                    )}
                  </header>

                  <form className="login-form" onSubmit={(e) => {
                    e.preventDefault();
                    if (step === 1) handleSendOTP();
                    if (step === 3) handleResetPassword();
                  }}>


                    {/* STEP 1: Email */}
                    {step === 1 && (
                      <div className="step-content">
                        <div className="input-group">
                          <div className="input-wrapper">
                            <MailIcon />
                            <input
                              type="email"
                              placeholder="Email Address"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                        </div>
                        <button type="button" className="login-btn" onClick={handleSendOTP} disabled={loading}>
                          {loading ? <span className="btn-loader"></span> : "Send Verification Code"}
                        </button>
                      </div>
                    )}

                    {/* STEP 2: OTP Selection */}
                    {step === 2 && (
                      <div className="step-content">
                        <div className="otp-input-group">
                          {otp.map((digit, idx) => (
                            <div key={idx} className="otp-box-wrapper">
                              <input
                                type="text"
                                maxLength="1"
                                ref={el => otpRefs.current[idx] = el}
                                value={digit}
                                onChange={e => handleOtpChange(e.target.value, idx)}
                                onPaste={handleOtpPaste}
                                onKeyDown={e => {
                                  if (e.key === "Enter") setStep(3);
                                  if (e.key === "Backspace" && !otp[idx] && idx > 0)
                                    otpRefs.current[idx - 1].focus();
                                }}
                                className="otp-field"
                              />

                            </div>
                          ))}
                        </div>
                        <div className="timer-display">
                          {timer > 0 ? (
                            <p className="timer-text">Resend available in <span className="gold-text">0{Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}</span></p>
                          ) : (
                            <button type="button" className="resend-link" onClick={() => setTimer(90)}>Resend OTP</button>
                          )}
                        </div>
                        <button
                          type="button"
                          className="login-btn"
                          onClick={() => {
                            const enteredOTP = otp.join("");
                            if (enteredOTP.length !== 6) {
                              toast.error("Enter 6-digit code");
                              return;
                            }
                            setStep(3);
                          }}
                          disabled={loading}
                        >
                          {loading ? <span className="btn-loader"></span> : "Continue"}
                        </button>
                      </div>
                    )}

                    {/* STEP 3: New Password */}
                    {step === 3 && (
                      <div className="step-content">
                        <div className="input-group">
                          <div className="input-wrapper">
                            <LockIcon />
                            <input
                              type={showPassword ? "text" : "password"}
                              placeholder="New Password"
                              onChange={e => setPasswords({ ...passwords, new: e.target.value })}
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
                        <div className="input-group">
                          <div className="input-wrapper">
                            <LockIcon />
                            <input
                              type={showPassword ? "text" : "password"}
                              placeholder="Confirm New Password"
                              onChange={e => setPasswords({ ...passwords, confirm: e.target.value })}
                            />
                          </div>
                        </div>
                        <button type="button" className="login-btn" onClick={handleResetPassword} disabled={loading}>
                          {loading ? <span className="btn-loader"></span> : "Update Password"}
                        </button>
                      </div>
                    )}

                    <div className="divider">
                      <span>Remembered? <a onClick={() => navigate("/login")}>Back to Login</a></span>
                    </div>
                  </form>

                  <footer className="card-footer">© Tailor Management System — Security Guaranteed.</footer>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

// --- SVG Icons (Inherited from Login theme) ---
const CheckIcon = () => (
  <div className="premium-check-icon">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5d4a3b" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </div>
);
const MannequinIcon = () => (<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#5d4a3b" strokeWidth="1.2"><path d="M12 4c-2 0-3 1-3 3v2c0 2 1 3 3 5s3-3 3-5V7c0-2-1-3-3-3zM9 9h6M8 14c-1 2-2 4-2 7h12c0-3-1-5-2-7M12 14v7" strokeLinecap="round" /></svg>);
const MailIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a38b75" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>);
const LockIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a38b75" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>);
const EyeIcon = ({ active }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#a38b75"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ transition: "0.3s" }}
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />

    {/* Slash when password hidden */}
    {!active && (
      <line
        x1="3"
        y1="3"
        x2="21"
        y2="21"
        stroke="#a38b75"
        strokeWidth="1.8"
      />
    )}
  </svg>
);

const MeasuringTapeSVG = () => (<svg width="200" height="200" viewBox="0 0 200 200" fill="none" style={{ opacity: 0.2 }}><path d="M10 150 C 40 130, 80 180, 120 160 S 180 120, 190 80" stroke="#5d4a3b" strokeWidth="4" strokeDasharray="4 6" /></svg>);

// --- CSS Styles (Unified DNA) ---
const cssStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Inter:wght@300;400;500;600&display=swap');

  :root {
    --gold: #8a764dff;
    --gold-dark: #b38b45;
    --text-dark: #4A3C31;
    --text-muted: #7c6a5a;
    --stitched-color: #d6c8b8;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { overflow: hidden; font-family: 'Inter', sans-serif; }

  .login-page-wrapper {
    height: 100vh; width: 100%;
    display: flex; align-items: center;
    background: #f1e9df;
    position: relative;
  }

  .login-page-wrapper::before {
    content: ''; position: absolute; inset: 0;
    background: url('https://www.transparenttextures.com/patterns/natural-paper.png');
    opacity: 0.3; pointer-events: none;
  }

  .main-content-container { display: flex; width: 100%; height: 100%; z-index: 1; }

  /* Left Side Branding - Identical to Login */
  .branding-section {
    width: 50%; padding: 90px 100px;
    position: relative; background-size: cover; background-position: center;
    border-radius: 0 28px 28px 0;
    box-shadow: inset 0 0 120px rgba(255,255,255,0.55);
    display: flex; flex-direction: column; justify-content: center;
  }

  .main-heading {
    font-family: 'Instrument Serif', serif; font-size: 60px;
    color: #5d4635; margin-bottom: 24px; letter-spacing: 2px;
  }

  .sub-description { font-size: 18px; color: var(--text-muted); line-height: 1.6; margin-bottom: 34px; }

  .feature-list { list-style: none; }
  .feature-list li {
    display: flex; align-items: center; gap: 16px;
    margin-bottom: 20px; color: var(--text-dark); font-weight: 500;
  }

.premium-check-icon {
  width: 34px;
  height: 34px;
  border-radius: 11px; /* Image jaisa soft rounded corner */
  
  /* Creamy soft background */
  background: #fdfbf7; 
  
  /* Fine Stitching effect */
  border: 1.2px dashed #d6c8b8; 
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  /* Depth aur Puffy look ke liye Multiple Shadows */
  box-shadow: 
    0 4px 10px rgba(93, 74, 59, 0.08),     /* Outer soft shadow */
    inset 0 2px 3px rgba(255, 255, 255, 0.9), /* Top inner highlight (puffy effect) */
    inset 0 -1px 2px rgba(93, 74, 59, 0.05);  /* Bottom inner shadow */
    
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

  /* Right Side - Step Card */
  .form-section { width: 50%; display: flex; align-items: center; justify-content: center; }
  .right-poster { width: 100%; height: 100%; background-size: cover; display: flex; align-items: center; justify-content: center; }

  .glass-login-card {
    background: rgba(255, 255, 255, 0.45);
    backdrop-filter: blur(15px); border-radius: 30px;
    padding: 12px; box-shadow: 0 30px 60px rgba(93, 74, 59, 0.14);
    border: 1px solid rgba(255, 255, 255, 0.6);
    width: 90%; max-width: 520px;
  }
.feature-list li:hover .premium-check-icon {
  transform: scale(1.05);
  border-style: solid; /* Stitching pakki ho gayi */
  border-color: #C5A059;
  box-shadow: 
    0 6px 15px rgba(197, 160, 89, 0.2),
    inset 0 2px 3px rgba(255, 255, 255, 1);
}
    .premium-check-icon svg {
  filter: drop-shadow(0 1px 1px rgba(255,255,255,0.8));
}
  .card-stitched-inner { border: 1.8px dashed #997851; border-radius: 24px; padding: 40px; text-align: center; }

  .welcome-back { font-family: 'Instrument Serif', serif; font-size: 32px; color: #504225; margin-bottom: 8px; }
  .sign-in-prompt { font-size: 14px; color: var(--text-muted); margin-bottom: 30px; }

  /* Inputs & Buttons */
  .input-wrapper {
    background: rgba(255, 255, 255, 0.5); border: 1.2px dashed #d6c8b8;
    border-radius: 25px; display: flex; align-items: center;
    padding: 0 18px; height: 56px; margin-bottom: 16px;
    transition: 0.3s;
    position: relative;
  }

  .toggle-visibility {
  background: none;
  border: none;
  outline: none;
  padding: 0;
  margin-left: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  position: relative;
}

.input-wrapper::after {
  content: '';
  position: absolute;
  inset: 4px;
  border: 1px dashed rgba(214, 200, 184, 0.45);
  border-radius: 20px;
  pointer-events: none;
  z-index: 1;
}
  .input-wrapper > * {
  position: relative;
  z-index: 2;
}
  .input-wrapper:focus-within { background: #fff; border-style: solid; border-color: var(--gold); transform: translateY(-2px); }

  .input-wrapper input { background: transparent; border: none; outline: none; flex: 1; padding: 0 10px; color: var(--text-dark); font-size:16px;}

 .login-btn, .verify-btn {
  width: 100%;
  height: 58px;
  border-radius: 20px;
  background: linear-gradient(135deg, #74602a 0%, #c5a059 50%, #b38b45 100%);
  color: #fff;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.1); /* Light border baseline */
  box-shadow: 0 10px 25px rgba(197, 160, 89, 0.3);
  position: relative;
  overflow: hidden; /* Shine effect ke liye zaroori hai */
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.8px;
}

  .login-btn::before, .verify-btn::before {
  content: '';
  position: absolute;
  inset: 5px;
  border: 1.2px dashed rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  pointer-events: none;
  z-index: 1;
}

.login-btn:hover, .verify-btn:hover {
  transform: translateY(-3px) scale(1.02);
  /* Border Chamkne wala effect */
  border-color: rgba(255, 255, 255, 0.6);
  box-shadow: 
    0 15px 35px rgba(197, 160, 89, 0.5), 
    0 0 15px rgba(197, 160, 89, 0.4); /* Glow effect */
  filter: brightness(1.1);
}

/* --- Mast Loading Spinner --- */
.btn-loader {
  width: 24px;
  height: 24px;
  border: 3px solid rgba(255, 255, 255, 0.3); /* Transparent white */
  border-top-color: #fff; /* Solid white top */
  border-radius: 50%;
  display: inline-block;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Loading state me button feedback */
.login-btn:disabled {
  cursor: not-allowed;
  filter: grayscale(0.2) brightness(0.9);
  box-shadow: none;
}

  /* OTP Fields (From OTP Page) */
  .otp-input-group { display: flex; justify-content: center; gap: 10px; margin-bottom: 20px; }
  .otp-field {
    width: 45px; height: 55px; background: white; border: 1.2px dashed var(--stitched-color);
    border-radius: 10px; text-align: center; font-size: 22px; font-family: 'Instrument Serif', serif;
    transition: 0.3s;
  }
  .otp-field:focus { border-style: solid; border-color: var(--gold); transform: translateY(-3px); outline: none; }

  .timer-display { margin-bottom: 20px; font-size: 13px; color: var(--text-muted); }
  .gold-text { color: var(--gold); font-weight: 600; }
  .resend-link { background: none; border: none; color: var(--gold); font-weight: 600; text-decoration: underline; cursor: pointer; }

  .divider { margin-top: 25px; font-size: 14px; }
  .divider a { color: var(--gold); font-weight: 600; cursor: pointer; text-decoration: none; }

  .card-footer { margin-top: 30px; font-size: 12px; color: var(--text-dark); opacity: 0.8; }

  /* Animations for Step Change */
  .step-content { animation: fadeIn 0.4s ease; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

  @media (max-width: 1024px) { .branding-section { display: none; } .form-section { width: 100%; } }
`;

export default ForgotPassword;