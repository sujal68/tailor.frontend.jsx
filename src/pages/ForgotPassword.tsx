import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

/**
 * ForgotPassword.tsx
 * Step-based Luxury Forgot Password System
 * Step 1: Email | Step 2: OTP | Step 3: Reset Password
 */

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [passwords, setPasswords] = useState({ new: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [timer, setTimer] = useState(90);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer logic for Step 2
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (step === 2) {
      interval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [step]);

  useEffect(() => {
    if (step === 2 && otpRefs.current[0]) {
      otpRefs.current[0].focus();
    }
  }, [step]);

  // --- Handlers ---
  const handleSendOTP = () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Enter a valid email");
      return;
    }
    setLoading(true);
    console.log("Forgot Password - Email:", { email });
    setTimeout(() => {
      toast.success("Verification code sent");
      setLoading(false);
      setStep(2);
    }, 1000);
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    const code = e.clipboardData.getData("text").replace(/\D/g, "");
    if (code.length !== 6) return;

    const newOtp = code.split("");
    setOtp(newOtp);

    newOtp.forEach((d, i) => {
      if (otpRefs.current[i]) {
        otpRefs.current[i]!.value = d;
      }
    });

    setTimeout(() => setStep(3), 400);
  };

  const handleResetPassword = () => {
    const enteredOTP = otp.join("");

    if (enteredOTP.length !== 6) {
      toast.error("Enter valid OTP");
      return;
    }
    if (passwords.new.length < 6) {
      toast.error("Password too short");
      return;
    }
    if (passwords.new !== passwords.confirm) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    console.log("Password Reset Data:", {
      email,
      otp: enteredOTP,
      newPassword: passwords.new
    });

    setTimeout(() => {
      toast.success("Password updated successfully");
      setLoading(false);
      navigate("/login");
    }, 1000);
  };

  const handleOtpChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    if (value && index < 5 && otpRefs.current[index + 1]) {
      otpRefs.current[index + 1]!.focus();
    }
    
    // Auto submit when all 6 digits are filled
    if (value && index === 5) {
      const fullOtp = [...newOtp];
      if (fullOtp.every(digit => digit !== '')) {
        setTimeout(() => {
          console.log("OTP Verified:", { email, otp: fullOtp.join("") });
          toast.success("OTP verified successfully");
          setStep(3);
        }, 300);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter") setStep(3);
    if (e.key === "Backspace" && !otp[index] && index > 0 && otpRefs.current[index - 1]) {
      otpRefs.current[index - 1]!.focus();
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Inter:wght@300;400;500;600;700&display=swap');
        .vignette::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.15) 100%);
          pointer-events: none;
          z-index: 1;
        }
      `}</style>
      
      <div className="min-h-screen overflow-hidden font-['Inter',sans-serif] bg-[#f1e9df] relative vignette" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, #fff 0%, transparent 50%), radial-gradient(circle at 80% 70%, #fff 0%, transparent 50%), linear-gradient(135deg, #f1e9df 0%, #e6dace 100%)' }}>
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")'
          }}
        />

        <div className="relative z-10 flex w-full h-screen">
        {/* Left Side: Branding */}
        <div
          className="hidden md:flex md:w-[40%] lg:w-1/2 py-8 px-6 md:py-12 md:px-10 lg:py-16 lg:px-16 xl:py-[90px] xl:px-[100px] relative flex-col justify-center rounded-r-[28px] bg-cover bg-center bg-no-repeat before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.6),transparent_60%)] before:pointer-events-none before:rounded-[28px]"
          style={{
            backgroundImage: 'url("/src/assets/loginLeft.png")',
            boxShadow: 'inset 0 0 120px rgba(255,255,255,0.55)'
          }}
        >
          <div className="absolute top-6 left-6 flex items-center gap-2 z-10 bg-white/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/60">
            <MannequinIcon />
            <div>
              <h2 className="font-['Instrument_Serif',serif] text-base m-0 leading-none text-[#4A3C31]">Tailor</h2>
              <p className="text-[8px] uppercase tracking-[1px] mt-0.5 mb-0 text-[#7c6a5a]">Management</p>
            </div>
          </div>

          <div className="absolute -top-20 -left-10 -rotate-[15deg] opacity-20">
            <MeasuringTapeSVG />
          </div>

          <h1 className="font-['Instrument_Serif',serif] text-3xl md:text-4xl lg:text-5xl xl:text-[64px] text-[#5d4635] mb-4 lg:mb-7 tracking-[2px] relative z-[2] font-bold leading-tight" style={{ textShadow: '0 2px 2px rgba(255,255,255,0.8), 0 6px 12px rgba(0,0,0,0.08)' }}>
            Securing Your<br />Digital Atelier.
          </h1>

          <p className="text-sm md:text-base lg:text-lg text-[#7c6a5a] mb-5 lg:mb-[34px] leading-relaxed relative z-[2]">
            Follow our handcrafted recovery process to regain access<br className="hidden lg:block" />
            to your master tailoring dashboard securely.
          </p>

          <ul className="list-none p-0 relative z-[2] space-y-3 lg:space-y-5">
            <li className="flex items-center gap-3 lg:gap-4 text-sm lg:text-base text-[#4A3C31] font-medium transition-transform duration-300 ease-[ease] cursor-default hover:translate-x-[5px]">
              <CheckIcon />
              <span>Encrypted Identity Verification</span>
            </li>
            <li className="flex items-center gap-3 lg:gap-4 text-sm lg:text-base text-[#4A3C31] font-medium transition-transform duration-300 ease-[ease] cursor-default hover:translate-x-[5px]">
              <CheckIcon />
              <span>Secure Password Restoration</span>
            </li>
            <li className="flex items-center gap-3 lg:gap-4 text-sm lg:text-base text-[#4A3C31] font-medium transition-transform duration-300 ease-[ease] cursor-default hover:translate-x-[5px]">
              <CheckIcon />
              <span>Instant Account Recovery</span>
            </li>
          </ul>

          <div className="absolute -bottom-[100px] right-0 rotate-[10deg] opacity-20">
            <MeasuringTapeSVG />
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-[60%] lg:w-1/2 flex items-center justify-center">
          <div
            className="w-full h-full bg-cover bg-center flex items-center justify-center md:bg-none"
            style={{ backgroundImage: window.innerWidth < 768 ? 'none' : 'url("/src/assets/loginRight.png")' }}
          >
            <div className="bg-white/50 backdrop-blur-[18px] rounded-[24px] md:rounded-[28px] p-2.5 sm:p-3 border border-white/70 w-full max-w-[95%] sm:max-w-md md:max-w-lg shadow-[0_35px_70px_rgba(93,74,59,0.18),0_15px_30px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.7)]">
              <div className="border-[2px] border-dashed border-[#997851] rounded-[20px] md:rounded-[24px] py-6 sm:py-7 md:py-8 px-5 sm:px-7 md:px-10 text-center bg-white/30">
                {/* Header */}
                <header className="mb-6 sm:mb-8">
                  <div className="flex justify-center mb-5 md:mb-6">
                    <div className="bg-gradient-to-br from-[#fdfbf7] to-[#f1e9df] p-2 rounded-xl border-2 border-dashed border-[#d6c8b8] shadow-md">
                      <MannequinIcon />
                    </div>
                  </div>

                  {step === 1 && (
                    <div>
                      <h3 className="font-['Instrument_Serif',serif] text-2xl sm:text-3xl md:text-[36px] text-[#504225] mb-2 font-bold">
                        Recover Account
                      </h3>
                      <p className="text-xs sm:text-sm md:text-base text-[#7c6a5a]">
                        Enter your email to receive a secure code.
                      </p>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <h3 className="font-['Instrument_Serif',serif] text-2xl sm:text-3xl md:text-[36px] text-[#504225] mb-2 font-bold">
                        Verify Identity
                      </h3>
                      <p className="text-xs sm:text-sm md:text-base text-[#7c6a5a]">
                        We've sent a 6-digit code to <br />
                        <b className="text-[#5d4a3b]">{email}</b>
                      </p>
                    </div>
                  )}

                  {step === 3 && (
                    <div>
                      <h3 className="font-['Instrument_Serif',serif] text-2xl sm:text-3xl md:text-[36px] text-[#504225] mb-2 font-bold">
                        Reset Password
                      </h3>
                      <p className="text-xs sm:text-sm md:text-base text-[#7c6a5a]">
                        Choose a strong password for your atelier.
                      </p>
                    </div>
                  )}
                </header>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (step === 1) handleSendOTP();
                  if (step === 3) handleResetPassword();
                }}>
                  {/* Step 1: Email */}
                  {step === 1 && (
                    <div className="animate-fadeIn">
                      <div className="mb-4 md:mb-5">
                        <div className="relative bg-white/60 border-[1.5px] border-dashed border-[#d6c8b8] rounded-[22px] md:rounded-[25px] h-[54px] md:h-[60px] flex items-center px-4 md:px-5 transition-all duration-300 focus-within:bg-white focus-within:border-solid focus-within:border-[#C5A059] focus-within:border-[2px] focus-within:-translate-y-[2px] focus-within:shadow-[0_0_0_4px_rgba(197,160,89,0.15)] after:content-[''] after:absolute after:inset-[5px] after:border after:border-dashed after:border-[rgba(214,200,184,0.4)] after:rounded-[18px] md:after:rounded-[21px] after:pointer-events-none" style={{ backgroundImage: 'radial-gradient(#efe6da 0.3px, transparent 0.3px)', backgroundSize: '3px 3px', boxShadow: '0 0 0 4px rgba(197, 160, 89, 0.05), inset 0 1px 3px rgba(0,0,0,0.02)' }}>
                          <MailIcon />
                          <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            className="bg-transparent border-none outline-none flex-1 px-3 text-[#4A3C31] text-sm md:text-base z-[2]"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleSendOTP}
                        disabled={loading}
                        className="w-full h-[54px] md:h-[60px] rounded-[20px] md:rounded-[22px] bg-gradient-to-br from-[#74602a] via-[#c5a059] to-[#b38b45] text-white font-bold text-base md:text-lg shadow-[0_12px_28px_rgba(197,160,89,0.35)] relative overflow-hidden transition-all duration-300 hover:-translate-y-[4px] hover:shadow-[0_15px_35px_rgba(197,160,89,0.45)] active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center before:content-[''] before:absolute before:inset-[6px] before:border-[1.5px] before:border-dashed before:border-white/50 before:rounded-[16px] before:pointer-events-none before:transition-all before:duration-300 hover:before:border-white/90"
                      >
                        {loading ? (
                          <span className="w-6 h-6 border-[3px] border-white/40 border-t-white rounded-full animate-spin inline-block" />
                        ) : (
                          "Send Verification Code"
                        )}
                      </button>
                      <div className="flex items-center justify-center gap-2 mt-4 text-[10px] sm:text-xs text-[#7c6a5a]">
                        <ShieldIcon />
                        <span>Secured by 256-bit Encryption</span>
                      </div>
                    </div>
                  )}

                  {/* Step 2: OTP */}
                  {step === 2 && (
                    <div className="animate-fadeIn">
                      <div className="flex justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                        {otp.map((digit, idx) => (
                          <div key={idx}>
                            <input
                              type="text"
                              maxLength={1}
                              ref={(el) => {
                                otpRefs.current[idx] = el;
                              }}

                              value={digit}
                              onChange={e => handleOtpChange(e.target.value, idx)}
                              onPaste={handleOtpPaste}
                              onKeyDown={(e) => handleKeyDown(e, idx)}
                              className="w-10 h-12 sm:w-12 sm:h-14 bg-white border-[1.2px] border-dashed border-[#d6c8b8] rounded-xl text-center text-xl sm:text-2xl font-instrument-serif transition-all duration-300 focus:border-solid focus:border-[#8a764d] focus:-translate-y-1 focus:outline-none"
                            />
                          </div>
                        ))}
                      </div>

                      <div className="mb-4 sm:mb-6">
                        {timer > 0 ? (
                          <p className="text-xs sm:text-sm text-[#7c6a5a]">
                            Resend available in{' '}
                            <span className="text-[#8a764d] font-semibold">
                              0{Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
                            </span>
                          </p>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setTimer(90)}
                            className="text-xs sm:text-sm text-[#8a764d] font-semibold underline bg-transparent border-none cursor-pointer"
                          >
                            Resend OTP
                          </button>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          const enteredOTP = otp.join("");
                          if (enteredOTP.length !== 6) {
                            toast.error("Enter 6-digit code");
                            return;
                          }
                          console.log("OTP Verified:", { email, otp: enteredOTP });
                          toast.success("OTP verified successfully");
                          setStep(3);
                        }}
                        disabled={loading}
                        className="w-full h-[54px] md:h-[60px] rounded-[20px] md:rounded-[22px] bg-gradient-to-br from-[#74602a] via-[#c5a059] to-[#b38b45] text-white font-bold text-base md:text-lg shadow-[0_12px_28px_rgba(197,160,89,0.35)] relative overflow-hidden transition-all duration-300 hover:-translate-y-[4px] hover:shadow-[0_15px_35px_rgba(197,160,89,0.45)] active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center before:content-[''] before:absolute before:inset-[6px] before:border-[1.5px] before:border-dashed before:border-white/50 before:rounded-[16px] before:pointer-events-none before:transition-all before:duration-300 hover:before:border-white/90"
                      >
                        {loading ? (
                          <span className="w-6 h-6 border-[3px] border-white/40 border-t-white rounded-full animate-spin inline-block" />
                        ) : (
                          "Continue"
                        )}
                      </button>
                    </div>
                  )}

                  {/* Step 3: Reset Password */}
                  {step === 3 && (
                    <div className="animate-fadeIn space-y-4 md:space-y-5">
                      <div>
                        <div className="relative bg-white/60 border-[1.5px] border-dashed border-[#d6c8b8] rounded-[22px] md:rounded-[25px] h-[54px] md:h-[60px] flex items-center px-4 md:px-5 transition-all duration-300 focus-within:bg-white focus-within:border-solid focus-within:border-[#C5A059] focus-within:border-[2px] focus-within:-translate-y-[2px] focus-within:shadow-[0_0_0_4px_rgba(197,160,89,0.15)] after:content-[''] after:absolute after:inset-[5px] after:border after:border-dashed after:border-[rgba(214,200,184,0.4)] after:rounded-[18px] md:after:rounded-[21px] after:pointer-events-none" style={{ backgroundImage: 'radial-gradient(#efe6da 0.3px, transparent 0.3px)', backgroundSize: '3px 3px', boxShadow: '0 0 0 4px rgba(197, 160, 89, 0.05), inset 0 1px 3px rgba(0,0,0,0.02)' }}>
                          <LockIcon />
                          <input
                            type={showPassword ? "text" : "password"}
                            placeholder="New Password"
                            onChange={e => setPasswords({ ...passwords, new: e.target.value })}
                            autoComplete="new-password"
                            className="bg-transparent border-none outline-none flex-1 px-3 text-[#4A3C31] text-sm md:text-base z-[2]"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="bg-transparent border-none outline-none p-0 ml-1.5 flex items-center justify-center z-10 relative hover:scale-110 transition-transform"
                          >
                            <EyeIcon active={showPassword} />
                          </button>
                        </div>
                      </div>

                      <div>
                        <div className="relative bg-white/60 border-[1.5px] border-dashed border-[#d6c8b8] rounded-[22px] md:rounded-[25px] h-[54px] md:h-[60px] flex items-center px-4 md:px-5 transition-all duration-300 focus-within:bg-white focus-within:border-solid focus-within:border-[#C5A059] focus-within:border-[2px] focus-within:-translate-y-[2px] focus-within:shadow-[0_0_0_4px_rgba(197,160,89,0.15)] after:content-[''] after:absolute after:inset-[5px] after:border after:border-dashed after:border-[rgba(214,200,184,0.4)] after:rounded-[18px] md:after:rounded-[21px] after:pointer-events-none" style={{ backgroundImage: 'radial-gradient(#efe6da 0.3px, transparent 0.3px)', backgroundSize: '3px 3px', boxShadow: '0 0 0 4px rgba(197, 160, 89, 0.05), inset 0 1px 3px rgba(0,0,0,0.02)' }}>
                          <LockIcon />
                          <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm New Password"
                            onChange={e => setPasswords({ ...passwords, confirm: e.target.value })}
                            autoComplete="new-password"
                            className="bg-transparent border-none outline-none flex-1 px-3 text-[#4A3C31] text-sm md:text-base z-[2]"
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleResetPassword}
                        disabled={loading}
                        className="w-full h-[54px] md:h-[60px] rounded-[20px] md:rounded-[22px] bg-gradient-to-br from-[#74602a] via-[#c5a059] to-[#b38b45] text-white font-bold text-base md:text-lg shadow-[0_12px_28px_rgba(197,160,89,0.35)] relative overflow-hidden transition-all duration-300 hover:-translate-y-[4px] hover:shadow-[0_15px_35px_rgba(197,160,89,0.45)] active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center before:content-[''] before:absolute before:inset-[6px] before:border-[1.5px] before:border-dashed before:border-white/50 before:rounded-[16px] before:pointer-events-none before:transition-all before:duration-300 hover:before:border-white/90"
                      >
                        {loading ? (
                          <span className="w-6 h-6 border-[3px] border-white/40 border-t-white rounded-full animate-spin inline-block" />
                        ) : (
                          "Update Password"
                        )}
                      </button>
                      <div className="flex items-center justify-center gap-2 mt-4 text-[10px] sm:text-xs text-[#7c6a5a]">
                        <ShieldIcon />
                        <span>Secured by 256-bit Encryption</span>
                      </div>
                    </div>
                  )}

                  <div className="mt-6 sm:mt-7 md:mt-8 pt-4 sm:pt-5 md:pt-6 border-t border-[#d6c8b8]/30 text-xs sm:text-sm text-[#7c6a5a]">
                    <span>
                      Remembered?{' '}
                      <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="text-[#8a764d] font-bold underline bg-transparent border-none cursor-pointer hover:text-[#C5A059] transition-colors"
                      >
                        Back to Login
                      </button>
                    </span>
                  </div>
                </form>

                <footer className="mt-6 sm:mt-7 md:mt-8 text-[10px] sm:text-xs text-[#4A3C31] opacity-70">
                  © 2024 Tailor Management System — Security Guaranteed.
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
const CheckIcon: React.FC = () => (
  <div className="w-8 h-8 md:w-9 md:h-9 rounded-[10px] flex items-center justify-center bg-gradient-to-br from-[#fdfbf7] to-[#f1e9df] border-[1.5px] border-dashed border-[#d6c8b8] relative overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)]" style={{ boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.8), 0 4px 12px rgba(197, 160, 89, 0.3), 0 2px 4px rgba(0, 0, 0, 0.05)' }}>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7c6a5a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </div>
);

const MannequinIcon: React.FC = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#5d4a3b" strokeWidth="1.2">
    <path d="M12 4c-2 0-3 1-3 3v2c0 2 1 3 3 5s3-3 3-5V7c0-2-1-3-3-3zM9 9h6M8 14c-1 2-2 4-2 7h12c0-3-1-5-2-7M12 14v7" strokeLinecap="round" />
  </svg>
);

const MailIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a38b75" strokeWidth="1.8" className="flex-shrink-0 z-[2]" style={{ filter: 'drop-shadow(0 1px 1px rgba(255,255,255,0.8))' }}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const LockIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a38b75" strokeWidth="1.8" className="flex-shrink-0 z-[2]" style={{ filter: 'drop-shadow(0 1px 1px rgba(255,255,255,0.8))' }}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const ShieldIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

interface EyeIconProps {
  active: boolean;
}

const EyeIcon: React.FC<EyeIconProps> = ({ active }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#a38b75"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="transition-colors duration-300"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
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

const MeasuringTapeSVG: React.FC = () => (
  <svg width="200" height="200" viewBox="0 0 200 200" fill="none" className="opacity-20">
    <path d="M10 150 C 40 130, 80 180, 120 160 S 180 120, 190 80" stroke="#5d4a3b" strokeWidth="4" strokeDasharray="4 6" />
  </svg>
);

export default ForgotPassword;