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
    <div className="min-h-screen overflow-hidden font-inter bg-[#f1e9df] relative">
      {/* Background Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")'
        }}
      />

      <div className="relative z-10 flex w-full h-screen">
        {/* Left Side: Branding */}
        <div
          className="hidden lg:flex lg:w-1/2 xl:w-[50%] p-8 md:p-12 lg:p-16 xl:p-20 relative flex-col justify-center rounded-r-[28px] shadow-[inset_0_0_120px_rgba(255,255,255,0.55)]"
          style={{
            backgroundImage: 'url("/src/assets/loginLeft.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute top-8 left-8 opacity-20">
            <MeasuringTapeSVG />
          </div>

          <h1 className="font-instrument-serif text-4xl lg:text-5xl xl:text-6xl text-[#5d4635] mb-4 lg:mb-6 tracking-wider leading-tight">
            Securing Your<br />Digital Atelier.
          </h1>

          <p className="text-base lg:text-lg text-[#7c6a5a] mb-6 lg:mb-8 leading-relaxed">
            Follow our handcrafted recovery process to regain access<br />
            to your master tailoring dashboard securely.
          </p>

          <ul className="space-y-3 lg:space-y-5">
            <li className="flex items-center gap-3 lg:gap-4 text-sm lg:text-base text-[#4A3C31] font-medium">
              <CheckIcon />
              <span>Encrypted Identity Verification</span>
            </li>
            <li className="flex items-center gap-3 lg:gap-4 text-sm lg:text-base text-[#4A3C31] font-medium">
              <CheckIcon />
              <span>Secure Password Restoration</span>
            </li>
            <li className="flex items-center gap-3 lg:gap-4 text-sm lg:text-base text-[#4A3C31] font-medium">
              <CheckIcon />
              <span>Instant Account Recovery</span>
            </li>
          </ul>

          <div className="absolute bottom-8 right-8 opacity-20">
            <MeasuringTapeSVG />
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-1/2 xl:w-[55%] flex items-center justify-center">
          <div
            className="w-full h-full bg-cover bg-center flex items-center justify-center"
            style={{
              backgroundImage: 'url("/src/assets/loginRight.png")'
            }}
          >
            <div className="bg-white/45 backdrop-blur-xl rounded-3xl p-2 sm:p-3 shadow-2xl border border-white/60 w-full max-w-[92%] sm:max-w-md md:max-w-lg">
              <div className="border-[1.8px] border-dashed border-[#997851] rounded-[20px] sm:rounded-3xl p-6 sm:p-8 md:p-10 text-center">
                {/* Header */}
                <header className="mb-6 sm:mb-8">
                  <div className="flex justify-center mb-4 sm:mb-6">
                    <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/50 border border-[#d6c8b8]">
                      <MannequinIcon />
                    </div>
                  </div>

                  {step === 1 && (
                    <div>
                      <h3 className="font-instrument-serif text-2xl sm:text-[28px] md:text-3xl text-[#504225] mb-2">
                        Recover Account
                      </h3>
                      <p className="text-xs sm:text-sm text-[#7c6a5a]">
                        Enter your email to receive a secure code.
                      </p>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <h3 className="font-instrument-serif text-2xl sm:text-[28px] md:text-3xl text-[#504225] mb-2">
                        Verify Identity
                      </h3>
                      <p className="text-xs sm:text-sm text-[#7c6a5a]">
                        We've sent a 6-digit code to <br />
                        <b className="text-[#5d4a3b]">{email}</b>
                      </p>
                    </div>
                  )}

                  {step === 3 && (
                    <div>
                      <h3 className="font-instrument-serif text-2xl sm:text-[28px] md:text-3xl text-[#504225] mb-2">
                        Reset Password
                      </h3>
                      <p className="text-xs sm:text-sm text-[#7c6a5a]">
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
                      <div className="mb-3 sm:mb-4">
                        <div className="relative bg-white/50 border-[1.2px] border-dashed border-[#d6c8b8] rounded-[20px] sm:rounded-3xl h-12 sm:h-14 flex items-center px-4 sm:px-5 transition-all duration-300 focus-within:bg-white focus-within:border-solid focus-within:border-[#8a764d] focus-within:-translate-y-0.5">
                          <MailIcon />
                          <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            className="bg-transparent border-none outline-none flex-1 px-2 sm:px-3 text-[#4A3C31] text-sm sm:text-base"
                          />
                          <div className="absolute inset-1 border border-dashed border-[#d6c8b8]/45 rounded-[16px] sm:rounded-[20px] pointer-events-none" />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleSendOTP}
                        disabled={loading}
                        className="w-full h-12 sm:h-14 rounded-[18px] sm:rounded-[20px] bg-gradient-to-br from-[#74602a] via-[#c5a059] to-[#b38b45] text-white font-semibold text-base sm:text-lg shadow-[0_10px_25px_rgba(197,160,89,0.3)] relative overflow-hidden transition-all duration-400 hover:-translate-y-[3px] hover:shadow-[0_15px_30px_rgba(197,160,89,0.5)] hover:brightness-105 disabled:opacity-85 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        {loading ? (
                          <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
                        ) : (
                          "Send Verification Code"
                        )}
                        <div className="absolute inset-[5px] border border-dashed border-white/40 rounded-[14px] sm:rounded-[16px] pointer-events-none" />
                      </button>
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
                        className="w-full h-12 sm:h-14 rounded-[18px] sm:rounded-[20px] bg-gradient-to-br from-[#74602a] via-[#c5a059] to-[#b38b45] text-white font-semibold text-base sm:text-lg shadow-[0_10px_25px_rgba(197,160,89,0.3)] relative overflow-hidden transition-all duration-400 hover:-translate-y-[3px] hover:shadow-[0_15px_30px_rgba(197,160,89,0.5)] hover:brightness-105 disabled:opacity-85 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        {loading ? (
                          <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
                        ) : (
                          "Continue"
                        )}
                        <div className="absolute inset-[5px] border border-dashed border-white/40 rounded-[14px] sm:rounded-[16px] pointer-events-none" />
                      </button>
                    </div>
                  )}

                  {/* Step 3: Reset Password */}
                  {step === 3 && (
                    <div className="animate-fadeIn space-y-3 sm:space-y-4">
                      <div>
                        <div className="relative bg-white/50 border-[1.2px] border-dashed border-[#d6c8b8] rounded-[20px] sm:rounded-3xl h-12 sm:h-14 flex items-center px-4 sm:px-5 transition-all duration-300 focus-within:bg-white focus-within:border-solid focus-within:border-[#8a764d] focus-within:-translate-y-0.5">
                          <LockIcon />
                          <input
                            type={showPassword ? "text" : "password"}
                            placeholder="New Password"
                            onChange={e => setPasswords({ ...passwords, new: e.target.value })}
                            autoComplete="new-password"
                            className="bg-transparent border-none outline-none flex-1 px-2 sm:px-3 text-[#4A3C31] text-sm sm:text-base"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="bg-transparent border-none outline-none p-0 ml-1.5 flex items-center justify-center z-10 relative"
                          >
                            <EyeIcon active={showPassword} />
                          </button>
                          <div className="absolute inset-1 border border-dashed border-[#d6c8b8]/45 rounded-[16px] sm:rounded-[20px] pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <div className="relative bg-white/50 border-[1.2px] border-dashed border-[#d6c8b8] rounded-[20px] sm:rounded-3xl h-12 sm:h-14 flex items-center px-4 sm:px-5 transition-all duration-300 focus-within:bg-white focus-within:border-solid focus-within:border-[#8a764d] focus-within:-translate-y-0.5">
                          <LockIcon />
                          <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm New Password"
                            onChange={e => setPasswords({ ...passwords, confirm: e.target.value })}
                            autoComplete="new-password"
                            className="bg-transparent border-none outline-none flex-1 px-2 sm:px-3 text-[#4A3C31] text-sm sm:text-base"
                          />
                          <div className="absolute inset-1 border border-dashed border-[#d6c8b8]/45 rounded-[16px] sm:rounded-[20px] pointer-events-none" />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleResetPassword}
                        disabled={loading}
                        className="w-full h-12 sm:h-14 rounded-[18px] sm:rounded-[20px] bg-gradient-to-br from-[#74602a] via-[#c5a059] to-[#b38b45] text-white font-semibold text-base sm:text-lg shadow-[0_10px_25px_rgba(197,160,89,0.3)] relative overflow-hidden transition-all duration-400 hover:-translate-y-[3px] hover:shadow-[0_15px_30px_rgba(197,160,89,0.5)] hover:brightness-105 disabled:opacity-85 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        {loading ? (
                          <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
                        ) : (
                          "Update Password"
                        )}
                        <div className="absolute inset-[5px] border border-dashed border-white/40 rounded-[14px] sm:rounded-[16px] pointer-events-none" />
                      </button>
                    </div>
                  )}

                  <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-[#d6c8b8]/30 text-xs sm:text-sm text-[#7c6a5a]">
                    <span>
                      Remembered?{' '}
                      <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="text-[#8a764d] font-semibold underline bg-transparent border-none cursor-pointer"
                      >
                        Back to Login
                      </button>
                    </span>
                  </div>
                </form>

                <footer className="mt-6 sm:mt-8 text-[10px] sm:text-xs text-[#4A3C31] opacity-80">
                  © Tailor Management System — Security Guaranteed.
                </footer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SVG Icons ---
const CheckIcon: React.FC = () => (
  <div className="w-8 h-8 rounded-xl bg-[#fdfbf7] border-[1.2px] border-dashed border-[#d6c8b8] flex items-center justify-center shadow-[0_4px_10px_rgba(93,74,59,0.08),inset_0_2px_3px_rgba(255,255,255,0.9),inset_0_-1px_2px_rgba(93,74,59,0.05)] transition-all duration-300 hover:scale-105 hover:border-solid hover:border-[#C5A059] hover:shadow-[0_6px_15px_rgba(197,160,89,0.2),inset_0_2px_3px_rgba(255,255,255,1)]">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5d4a3b" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
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
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a38b75" strokeWidth="1.5">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const LockIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a38b75" strokeWidth="1.5">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
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
    strokeWidth="1.6"
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