import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (loading) return;

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      console.log("LOGIN DATA:", {
        email,
        password,
        time: new Date().toLocaleString()
      });

      toast.success("Login successful");

      setLoading(false);
      navigate("/dashboard");
    }, 1200);
  };

  return (
    <>
      <style>{`
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
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-3px); }
          50% { transform: translateX(3px); }
          75% { transform: translateX(-2px); }
          100% { transform: translateX(0); }
        }
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 1000px rgba(255, 255, 255, 0) inset !important;
          -webkit-text-fill-color: var(--text-dark) !important;
          caret-color: var(--text-dark);
          transition: background-color 9999s ease-in-out 0s;
        }
      `}</style>

      <div className="h-screen w-full flex items-center justify-center bg-[#f1e9df] relative overflow-hidden font-['Inter',sans-serif] before:content-[''] before:absolute before:inset-0 before:bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] before:opacity-30 before:pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, #fff 0%, transparent 50%), radial-gradient(circle at 80% 70%, #fff 0%, transparent 50%), linear-gradient(135deg, #f1e9df 0%, #e6dace 100%)' }}>
        <div className="flex w-full h-full p-0 z-[1] items-stretch">

          {/* Left Side: Branding & Features */}
          <div
            className="hidden lg:flex lg:w-1/2 xl:w-[50%] py-12 px-12 lg:py-16 lg:px-16 xl:py-[90px] xl:px-[100px] relative bg-cover bg-center bg-no-repeat rounded-r-[28px] flex-col justify-center before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.6),transparent_60%)] before:pointer-events-none before:rounded-[28px]"
            style={{
              backgroundImage: `url("/src/assets/loginLeft.png")`,
              boxShadow: 'inset 0 0 120px rgba(255,255,255,0.55)'
            }}
          >
            <div className="absolute -top-20 -left-10 -rotate-[15deg] opacity-20">
              <MeasuringTapeSVG />
            </div>

            <h1 className="font-['Instrument_Serif',serif] text-4xl lg:text-5xl xl:text-[64px] text-[#5d4635] mb-5 lg:mb-7 tracking-[2px] relative z-[2]" style={{ textShadow: '0 2px 2px rgba(255,255,255,0.8), 0 6px 12px rgba(0,0,0,0.08)' }}>
              Smart Tailoring.<br />Better Business.
            </h1>

            <p className="text-base lg:text-lg text-[var(--text-muted)] leading-relaxed mb-6 lg:mb-[34px] relative z-[2]">
              Powerful tools to manage customers, store measurements,<br />
              and grow your tailoring business with confidence.
            </p>

            <ul className="list-none p-0 relative z-[2] space-y-3 lg:space-y-5">
              <li className="flex items-center gap-3 lg:gap-4 text-sm lg:text-base text-[var(--text-dark)] font-medium transition-transform duration-300 ease-[ease] cursor-default hover:translate-x-[5px]"><CheckIcon /> <span>Secure admin system</span></li>
              <li className="flex items-center gap-3 lg:gap-4 text-sm lg:text-base text-[var(--text-dark)] font-medium transition-transform duration-300 ease-[ease] cursor-default hover:translate-x-[5px]"><CheckIcon /> <span>Organized customer records</span></li>
              <li className="flex items-center gap-3 lg:gap-4 text-sm lg:text-base text-[var(--text-dark)] font-medium transition-transform duration-300 ease-[ease] cursor-default hover:translate-x-[5px]"><CheckIcon /> <span>Accurate measurement tracking</span></li>
              <li className="flex items-center gap-3 lg:gap-4 text-sm lg:text-base text-[var(--text-dark)] font-medium transition-transform duration-300 ease-[ease] cursor-default hover:translate-x-[5px]"><CheckIcon /> <span>Faster tailoring workflow</span></li>
            </ul>

            <div className="absolute -bottom-[100px] right-0 rotate-[10deg] opacity-20">
              <MeasuringTapeSVG />
            </div>
          </div>

          {/* Right Side: Login Card */}
          <div className="w-full lg:w-1/2 xl:w-[55%] flex items-center justify-center">
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat flex items-center justify-center relative"
              style={{ backgroundImage: `url("/src/assets/loginRight.png")` }}
            >
              <div className="bg-white/45 backdrop-blur-[15px] rounded-[20px] p-2 sm:p-3 border border-white/60 w-full max-w-[92%] sm:max-w-md md:max-w-lg" style={{ boxShadow: '0 30px 60px rgba(93, 74, 59, 0.14), inset 0 1px 0 rgba(255,255,255,0.6)' }}>
                <div className="border-[1.8px] border-dashed border-[#997851] rounded-[20px] sm:rounded-[32px] py-5 sm:py-6 px-5 sm:px-8 md:px-[42px] text-center">

                  {/* Header */}
                  <header>
                    <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                      <MannequinIcon />
                      <div>
                        <h2 className="font-['Instrument_Serif',serif] text-lg sm:text-xl m-0 leading-none text-[var(--text-dark)]">Tailor</h2>
                        <p className="text-[8px] sm:text-[9px] uppercase tracking-[1px] mt-0.5 mb-0 text-[var(--text-muted)]">Management System</p>
                      </div>
                    </div>
                    <h3 className="text-2xl sm:text-[28px] md:text-[32px] text-[#504225] mt-0 mb-2">Welcome Back</h3>
                    <p className="text-xs sm:text-sm text-[var(--text-muted)] mb-6 sm:mb-8">Sign in to your Tailor Management Dashboard</p>
                  </header>

                  {/* Form */}
                  <form className="text-left" onSubmit={handleLogin}>
                    <div className="mb-3 sm:mb-4">
                      <div className="bg-white/50 border-[1.2px] border-dashed border-[#d6c8b8] rounded-[20px] sm:rounded-[25px] flex items-center px-4 sm:px-[18px] h-[52px] sm:h-[58px] relative transition-all duration-[0.4s] ease-[ease] overflow-hidden focus-within:bg-white focus-within:border-solid focus-within:border-[var(--gold)] focus-within:-translate-y-px after:content-[''] after:absolute after:inset-[4px] after:border after:border-dashed after:border-[rgba(214,200,184,0.4)] after:rounded-[16px] sm:after:rounded-[21px] after:pointer-events-none" style={{ backgroundImage: 'radial-gradient(#efe6da 0.3px, transparent 0.3px)', backgroundSize: '3px 3px', boxShadow: '0 0 0 4px rgba(197, 160, 89, 0.05), inset 0 1px 3px rgba(0,0,0,0.02)' }}>
                        <MailIcon />
                        <input
                          type="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                          autoComplete="email"
                          className="bg-transparent border-none outline-none flex-1 px-2 sm:px-3 font-['Inter',sans-serif] text-[var(--text-dark)] text-sm sm:text-[15px] z-[2]"
                        />
                      </div>
                    </div>

                    <div className="mb-3 sm:mb-4">
                      <div className="bg-white/50 border-[1.2px] border-dashed border-[#d6c8b8] rounded-[20px] sm:rounded-[25px] flex items-center px-4 sm:px-[18px] h-[52px] sm:h-[58px] relative transition-all duration-[0.4s] ease-[ease] overflow-hidden focus-within:bg-white focus-within:border-solid focus-within:border-[var(--gold)] focus-within:-translate-y-px after:content-[''] after:absolute after:inset-[4px] after:border after:border-dashed after:border-[rgba(214,200,184,0.4)] after:rounded-[16px] sm:after:rounded-[21px] after:pointer-events-none" style={{ backgroundImage: 'radial-gradient(#efe6da 0.3px, transparent 0.3px)', backgroundSize: '3px 3px', boxShadow: '0 0 0 4px rgba(197, 160, 89, 0.05), inset 0 1px 3px rgba(0,0,0,0.02)' }}>
                        <LockIcon />
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          value={password}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                          autoComplete="current-password"
                          className="bg-transparent border-none outline-none flex-1 px-2 sm:px-3 font-['Inter',sans-serif] text-[var(--text-dark)] text-sm sm:text-[15px] z-[2]"
                        />
                        <button
                          type="button"
                          className="bg-none border-none cursor-pointer flex items-center"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <EyeIcon active={showPassword} />
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mb-6 sm:mb-8 text-xs sm:text-[13px] px-[5px]">
                      <a onClick={() => navigate("/forgot-password")} className="text-[#4d4026] no-underline font-medium cursor-pointer">
                        Forgot password?
                      </a>
                    </div>

                    <button
                      type="submit"
                      className="w-full h-[52px] sm:h-[58px] rounded-[18px] sm:rounded-[20px] text-white text-base sm:text-[17px] font-semibold cursor-pointer relative border-none overflow-hidden tracking-[0.5px] flex items-center justify-center transition-all duration-[0.4s] ease-[ease] hover:-translate-y-[3px] hover:brightness-105 active:translate-y-0 disabled:opacity-85 disabled:cursor-not-allowed before:content-[''] before:absolute before:inset-[5px] before:border-[1.2px] before:border-dashed before:border-white/40 before:rounded-2xl before:pointer-events-none before:transition-all before:duration-300 before:ease-[ease] hover:before:border-white/80 hover:before:border-dashed"
                      disabled={loading}
                      style={{
                        background: 'linear-gradient(135deg, #74602a 0%, #c5a059 50%, #b38b45 100%)',
                        boxShadow: '0 10px 25px rgba(197, 160, 89, 0.3)'
                      }}
                    >
                      {loading ? <span className="w-[22px] h-[22px] border-[3px] border-white/40 border-t-white rounded-full animate-[spin_1s_linear_infinite]"></span> : "Login"}
                    </button>
                  </form>

                  <footer className="mt-6 sm:mt-8 text-[10px] sm:text-xs text-[#2d1500] opacity-80">
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
  <div className="w-9 h-9 rounded-[10px] flex items-center justify-center bg-gradient-to-br from-[#fdfbf7] to-[#f1e9df] border-[1.5px] border-dashed border-[#d6c8b8] relative overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)]" style={{ boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.8), 0 4px 12px rgba(197, 160, 89, 0.3), 0 2px 4px rgba(0, 0, 0, 0.05)' }}>
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
  <svg className="text-[#a38b75] z-[2]" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a38b75" strokeWidth="1.5" style={{ filter: 'drop-shadow(0 1px 1px rgba(255,255,255,0.8))' }}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const LockIcon = () => (
  <svg className="text-[#a38b75] z-[2]" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a38b75" strokeWidth="1.5" style={{ filter: 'drop-shadow(0 1px 1px rgba(255,255,255,0.8))' }}>
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
  <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
    <path d="M10 150 C 40 130, 80 180, 120 160 S 180 120, 190 80" stroke="#5d4a3b" strokeWidth="4" strokeDasharray="4 6" />
    <path d="M15 145 L 20 155 M 35 152 L 40 162 M 55 158 L 60 168" stroke="#5d4a3b" strokeWidth="1" />
  </svg>
);

export default Login;