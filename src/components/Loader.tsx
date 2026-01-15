import React, { useEffect, useState } from 'react';
import { LoaderProps } from '../types';

interface LoaderComponentProps extends LoaderProps {
  onLoadingComplete?: () => void;
}

const Loader: React.FC<LoaderComponentProps> = ({ show = true, onLoadingComplete }) => {
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      setIsExiting(false);
    } else {
      setIsExiting(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onLoadingComplete) {
          onLoadingComplete();
        }
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [show, onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 w-full h-full flex flex-col justify-center items-center z-[9999] font-serif overflow-hidden 
      bg-[linear-gradient(135deg,#f8f3e6_0%,#faf6ee_100%)]
      before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(90deg,transparent_79px,#c5a05914_79px,transparent_80px),linear-gradient(0deg,transparent_79px,#c5a05914_79px,transparent_80px)] before:bg-[length:80px_80px] before:opacity-[0.15] before:pointer-events-none
      after:content-[''] after:absolute after:inset-0 after:bg-[linear-gradient(135deg,rgba(255,255,255,0.6)_0%,transparent_50%)] after:pointer-events-none
      ${isExiting ? 'animate-[fadeOut_1.2s_ease-out_forwards]' : ''}`}
    >
      <style>
        {`
          @keyframes stitch {
            0%, 100% { transform: translateX(-50%) translateY(0); }
            50% { transform: translateX(-50%) translateY(20px); }
          }
          @keyframes stitchComplete {
            0% { transform: translateX(-50%) translateY(0); }
            50% { transform: translateX(-50%) translateY(20px); }
            100% { transform: translateX(-50%) translateY(0); }
          }
          @keyframes threadStretch {
            0%, 100% { height: 90px; opacity: 0.8; }
            50% { height: 110px; opacity: 0.9; }
          }
          @keyframes threadRelax {
            0% { height: 90px; opacity: 0.8; }
            50% { height: 110px; opacity: 0.9; }
            100% { height: 90px; opacity: 0; }
          }
          @keyframes fabricSlide {
            0% { background-position: 160px 0; }
            100% { background-position: 0 0; }
          }
          @keyframes fabricStop {
            0% { background-position: 160px 0; }
            50% { background-position: 80px 0; }
            100% { background-position: 80px 0; }
          }
          @keyframes rotateWheel {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes rotateSlow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(180deg); }
          }
          @keyframes vibrate {
            0%, 100% { transform: translateX(-50%) translateX(-0.3px); }
            50% { transform: translateX(-50%) translateX(0.3px); }
          }
          @keyframes textFade {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
          }
          @keyframes fadeOut {
            0% { opacity: 1; transform: scale(1); }
            100% { opacity: 0; transform: scale(0.98); }
          }
        `}
      </style>

      <div className="relative w-[280px] h-[200px] mb-10 drop-shadow-[2px_4px_8px_rgba(197,160,89,0.12)] scale-[0.7] sm:scale-[0.8] md:scale-100">
        {/* Machine Base */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[220px] h-20 bg-[linear-gradient(160deg,#e8e2d5_0%,#d8d0c0_100%)] rounded-t-xl rounded-b-md overflow-hidden shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),inset_0_-2px_4px_rgba(0,0,0,0.1),0_4px_12px_rgba(197,160,89,0.12)] 
          before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[30px] before:bg-[linear-gradient(160deg,#f0eade_0%,#e0d8c8_100%)] before:rounded-t-xl" />

        {/* Machine Body */}
        <div className="absolute bottom-[70px] left-1/2 -translate-x-1/2 w-[180px] h-[100px] bg-[linear-gradient(160deg,#f5f1e8_0%,#e5ddd0_100%)] rounded-[10px] shadow-[inset_0_1px_3px_rgba(255,255,255,0.9),inset_0_-1px_3px_rgba(0,0,0,0.1),0_6px_16px_rgba(197,160,89,0.12)] 
          after:content-[''] after:absolute after:inset-2.5 after:border after:border-[#e8e0d0] after:rounded-md after:opacity-50">
          <div className="absolute top-5 left-5 w-[60px] h-[15px] bg-[linear-gradient(90deg,#b08c46_0%,#c5a059_100%)] rounded-sm opacity-60" />
          <div className="absolute top-[60px] right-5 w-10 h-2.5 bg-[#b08c46] rounded-sm opacity-40" />
        </div>

        {/* Hand Wheel */}
        <div
          className={`absolute top-[30px] -right-[15px] w-10 h-10 rounded-full bg-[linear-gradient(135deg,#d4c8ae_0%,#c5b89e_100%)] border-[3px] border-[#c5a059] shadow-[inset_0_0_8px_rgba(255,255,255,0.8),0_2px_6px_rgba(0,0,0,0.1)] 
          before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-3 before:h-3 before:bg-[#c5a059] before:rounded-full 
          after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:rotate-45 after:w-5 after:h-1 after:bg-[#b08c46] after:rounded-sm
          ${isExiting ? 'animate-[rotateSlow_2s_ease-out_forwards]' : 'animate-[rotateWheel_4s_linear_infinite]'}`}
        />

        {/* Needle Assembly */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-2 h-[50px] bg-[linear-gradient(to_bottom,#b0a080_0%,#888070_100%)] rounded-full animate-[vibrate_0.1s_infinite]" />

        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-[90px] bg-[linear-gradient(to_bottom,transparent_0%,#c5a059_20%,#c5a059_80%,transparent_100%)] opacity-80 origin-top 
          ${isExiting ? 'animate-[threadRelax_1.2s_ease-out_forwards]' : 'animate-[threadStretch_1.2s_cubic-bezier(0.4,0,0.2,1)_infinite]'}`}
        />

        <div
          className={`absolute top-[90px] left-1/2 -translate-x-1/2 w-[3px] h-[25px] bg-[linear-gradient(to_bottom,#c0c0c0_0%,#a0a0a0_100%)] rounded-t-[1px] z-10 
          ${isExiting ? 'animate-[stitchComplete_1.2s_ease-out_forwards]' : 'animate-[stitch_1.2s_cubic-bezier(0.4,0,0.2,1)_infinite]'}`}
        >
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-[2px] h-[2px] bg-black rounded-full" />
        </div>

        {/* Fabric */}
        <div
          className={`absolute bottom-10 left-1/2 -translate-x-1/2 w-40 h-5 bg-[linear-gradient(90deg,#faf6ee_0%,#f8f3e6_50%,#faf6ee_100%)] border-t border-dashed border-[#e8e0d0] shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_2px_4px_rgba(197,160,89,0.08)] 
          before:content-[''] before:absolute before:-top-[2px] before:left-0 before:right-0 before:h-[1px] before:bg-[repeating-linear-gradient(90deg,transparent,transparent_3px,#c5a059_3px,#c5a059_6px)] before:opacity-30 
          ${isExiting ? 'animate-[fabricStop_1.2s_ease-out_forwards]' : 'animate-[fabricSlide_6s_linear_infinite]'}`}
        />
      </div>

      <div
        className={`mt-[30px] text-[#b08c46] text-sm md:text-base font-light tracking-[1px] text-center transition-opacity duration-700 [text-shadow:0_1px_2px_rgba(255,255,255,0.8)] 
        ${isExiting ? 'opacity-0' : 'animate-[textFade_3s_ease-in-out_infinite]'}`}
      >
        Preparing your tailoring workspace...
      </div>
    </div>
  );
};

export default Loader;