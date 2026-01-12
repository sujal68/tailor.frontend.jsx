import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// 1:30 = 90 seconds

const OTPVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(90);
  const inputRefs = useRef([]);
  const { state } = useLocation();
  const navigate = useNavigate();
  const email = state?.email;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const allowed = localStorage.getItem("otp_session");

    // Block refresh & direct access
    if (!allowed) {
      navigate("/", { replace: true });
      return;
    }

    // Consume permission immediately
    localStorage.removeItem("otp_session");
  }, [navigate]);




  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer(t => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "");

    if (pastedData.length !== 6) return;

    const newOtp = pastedData.split("").slice(0, 6);
    setOtp(newOtp);

    newOtp.forEach((digit, i) => {
      if (inputRefs.current[i]) {
        inputRefs.current[i].value = digit;
      }
    });

    inputRefs.current[5].focus();

    setTimeout(() => {
      verifyOtp(newOtp.join(""));
    }, 300);
  };



  const handleChange = (value, index) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
    if (newOtp.every(d => d !== "")) {
      // setLoading(true);

      setTimeout(() => {
        verifyOtp(newOtp.join(""));
      }, 500);   // 0.5 second premium delay
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    if (loading) return;
    const enteredOTP = otp.join("");
    if (enteredOTP.length !== 6) return toast.error("Enter full OTP");

    try {
      const res = await fetch("http://localhost:5000/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: enteredOTP })
      });

      const data = await res.json();
      if (!res.ok) return toast.error(data.msg);

      localStorage.setItem("token", data.token);
      toast.success("Identity Verified");
      localStorage.removeItem("otp_session");
      navigate("/dashboard");
    } catch {
      toast.error("Security System Error");
    }
  };
  const handleResend = async () => {
    try {
      setTimer(90);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0].focus();

      const res = await fetch("http://localhost:5000/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.msg || "Resend failed");
        return;
      }

      toast.success("New OTP sent");

    } catch {
      toast.error("Network error");
    }
  };

  const verifyOtp = async (code) => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: code })
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.msg || "Invalid OTP");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      toast.success("Login successful");
      localStorage.removeItem("otp_session");
      navigate("/dashboard");

    } catch {
      toast.error("Verification failed");
    }

    setLoading(false);
  };


  return (
    <>
      <style>{cssStyles}</style>
      <div className="otp-page-wrapper">
        <div className="main-content-container">

          {/* Left Side: Branding (Consistent with Login) */}
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
              Secure<br />Verification.
            </h1>

            <p className="sub-description">
              Protecting your business data with industry-standard <br />
              encryption and multi-factor authentication.
            </p>

            <ul className="feature-list">
              <li><CheckIcon /> <span>Identity confirmed via email</span></li>
              <li><CheckIcon /> <span>Secure session management</span></li>
              <li><CheckIcon /> <span>Encrypted data access</span></li>
            </ul>

            <div className="tape-illustration-bottom">
              <MeasuringTapeSVG />
            </div>
          </div>

          {/* Right Side: OTP Card Area */}
          <div className="form-section">
            <div
              className="right-poster"
              style={{ backgroundImage: `url("/src/assets/loginRight.png")` }}
            >
              <div className="glass-otp-card">
                <div className="card-stitched-inner">

                  {/* Header Area */}
                  <header className="otp-header">
                    <div className="brand-logo">
                      <MannequinIcon />
                      {/* <div className="logo-text">
                        <h2>Tailor</h2>
                        <p>Management System</p>
                      </div> */}
                    </div>
                    <h1 className="verify-title">Verify Identity</h1>
                    <p className="otp-subtitle">
                      Enter the 6-digit code sent to your email <br />
                      to access your dashboard.
                    </p>
                  </header>

                  {/* OTP Input Area */}
                  <div className="otp-input-group">
                    {otp.map((data, index) => (
                      <div key={index} className="otp-box-wrapper">
                        <input
                          type="text"
                          maxLength="1"
                          ref={(el) => (inputRefs.current[index] = el)}
                          value={data}
                          onChange={(e) => handleChange(e.target.value, index)}
                          onKeyDown={(e) => {
                            handleKeyDown(e, index);
                            if (e.key === "Enter") handleVerify();
                          }}
                          onPaste={handlePaste}
                          className="otp-input-field"
                        />

                      </div>
                    ))}
                  </div>

                  {/* Timer Area */}
                  <div className="timer-section">
                    {timer > 0 ? (
                      <p className="timer-text">
                        Resend available in
                        <span className="gold-num">
                          {` ${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, "0")}`}
                        </span>
                      </p>
                    ) : (
                      <button type="button" className="resend-btn" onClick={handleResend}>
                        Resend OTP
                      </button>
                    )}
                  </div>

                  {/* Primary Button */}
                  <button
                    type="button"
                    className="verify-btn"
                    onClick={handleVerify}
                    disabled={loading}
                  >
                    {loading ? <span className="btn-loader"></span> : "Verify & Continue"}
                  </button>

                  <footer className="otp-footer">
                    Didn’t receive code? <a href="#">Contact Support</a>
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
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#5d4a3b" strokeWidth="1.2">
    <path d="M12 4c-2 0-3 1-3 3v2c0 2 1 3 3 5s3-3 3-5V7c0-2-1-3-3-3zM9 9h6M8 14c-1 2-2 4-2 7h12c0-3-1-5-2-7M12 14v7" strokeLinecap="round" />
  </svg>
);

const MeasuringTapeSVG = () => (
  <svg width="400" height="400" viewBox="0 0 200 200" fill="none" style={{ opacity: 0.08 }}>
    <path d="M10 150 C 40 130, 80 180, 120 160 S 180 120, 190 80" stroke="#5d4a3b" strokeWidth="3" strokeDasharray="3 5" />
    <path d="M20 155 L 25 145 M 35 158 L 40 148 M 50 160 L 55 150" stroke="#5d4a3b" strokeWidth="1" />
  </svg>
);

// --- CSS Styles ---

const cssStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Inter:wght@300;400;500;600&display=swap');

  :root {
    --gold: #605134;
    --gold-light: #e0c58a;
    --text-dark: #4A3C31;
    --text-muted: #7c6a5a;
    --bg-cream: #FDFBF7;
    --stitched-color: #574f47;
  }

  * { box-sizing: border-box; }
  
  html, body {
    margin: 0; padding: 0;
    width: 100%; height: 100%;
    overflow: hidden;
    font-family: 'Inter', sans-serif;
  }

  .otp-page-wrapper {
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    background: #f1e9df;
    position: relative;
    overflow: hidden;
  }

  /* Satin Fabric Texture Overlay */
  .otp-page-wrapper::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url('https://www.transparenttextures.com/patterns/natural-paper.png');
    opacity: 0.3;
    pointer-events: none;
    z-index: 0;
  }

  .main-content-container {
    display: flex;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  /* Left Side Branding - Matches Login Page */
  .branding-section {
    width: 50%;
    padding: 90px 100px;
    position: relative;
    background-size: cover;
    background-position: center;
    border-radius: 0 28px 28px 0;
    box-shadow: inset 0 0 120px rgba(255,255,255,0.55);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .main-heading {
    font-family: 'Instrument Serif', serif;
    font-size: 64px;
    color: #5d4635;
    text-shadow: 0 2px 2px rgba(255,255,255,0.8);
    margin-bottom: 28px;
    letter-spacing: 2px;
  }

  .sub-description {
    font-size: 18px;
    color: var(--text-muted);
    line-height: 1.6;
    margin-bottom: 34px;
  }

  .feature-list { list-style: none; padding: 0; }
  .feature-list li {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;
    color: var(--text-dark);
    font-weight: 500;
  }

  /* Right Side - Form Section */
  .form-section {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .right-poster {
    width: 100%; height: 100%;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .glass-otp-card {
    background: rgba(255, 255, 255, 0.45);
    backdrop-filter: blur(15px);
    border-radius: 20px;
    padding: 12px;
    box-shadow: 0 30px 60px rgba(93, 74, 59, 0.14);
    border: 1px solid rgba(255, 255, 255, 0.6);
    width: 90%;
    max-width: 500px;
  }

  .card-stitched-inner {
    border: 1.8px dashed #997851;
    border-radius: 24px;
    padding: 40px;
    text-align: center;
  }

  .verify-title {
    font-family: 'Instrument Serif', serif;
    font-size: 32px;
    color: #504225;
    margin: 10px 0;
  }

  .otp-subtitle {
    font-size: 14px;
    color: var(--text-muted);
    margin-bottom: 30px;
  }

  /* OTP Inputs Styling */
  .otp-input-group {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-bottom: 25px;
  }

  .otp-input-field {
    width: 50px;
    height: 60px;
    background: rgba(255, 255, 255, 0.5);
    border: 1.2px dashed #d6c8b8;
    border-radius: 12px;
    text-align: center;
    font-size: 24px;
    font-family: 'Instrument Serif', serif;
    color: var(--text-dark);
    transition: all 0.3s ease;
    background-image: radial-gradient(#efe6da 0.3px, transparent 0.3px);
    background-size: 3px 3px;
  }

  .otp-input-field:focus {
    background: #fff;
    border-style: solid;
    border-color: var(--gold);
    transform: translateY(-3px);
    outline: none;
    box-shadow: 0 10px 20px rgba(197, 160, 89, 0.15);
  }

  /* Timer & Resend */
  .timer-section { margin-bottom: 25px; }
  .timer-text { font-size: 14px; color: var(--text-muted); }
  .gold-num { color: var(--gold); font-weight: 600; margin-left: 5px; }
  .resend-btn {
    background: none; border: none;
    color: var(--gold); font-weight: 600;
    text-decoration: underline; cursor: pointer;
  }

  /* Verify Button (Matches Login Button) */
  .verify-btn {
    width: 100%;
    height: 58px;
    border-radius: 18px;
    background: linear-gradient(135deg, #74602a 0%, #c5a059 50%, #b38b45 100%);
    color: #fff;
    font-size: 17px;
    font-weight: 600;
    border: none;
    box-shadow: 0 10px 25px rgba(197, 160, 89, 0.3);
    cursor: pointer;
    position: relative;
    transition: all 0.4s ease;
  }

  .verify-btn::before {
    content: '';
    position: absolute;
    inset: 5px;
    border: 1.2px dashed rgba(255, 255, 255, 0.4);
    border-radius: 14px;
  }

  .verify-btn:hover {
    transform: translateY(-2px);
    filter: brightness(1.1);
  }

  .otp-footer {
    margin-top: 25px;
    font-size: 12px;
    color: var(--text-muted);
    border-top: 1px dashed var(--stitched-color);
    padding-top: 20px;
  }

  .otp-footer a { color: var(--gold); text-decoration: none; font-weight: 600; }

  /* SVG Icons */
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
      0 4px 12px rgba(197, 160, 89, 0.3);
  }

  @media (max-width: 1024px) {
    .branding-section { display: none; }
    .form-section { width: 100%; }
  }
`;
export default OTPVerification;