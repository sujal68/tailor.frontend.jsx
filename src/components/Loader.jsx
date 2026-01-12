import React, { useEffect, useState } from 'react';

const Loader = ({ show = true, onLoadingComplete }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      setIsExiting(false);
    } else {
      // Start exit animation
      setIsExiting(true);

      // Wait for exit animation to complete before unmounting
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onLoadingComplete) {
          onLoadingComplete();
        }
      }, 1200); // Match exit animation duration

      return () => clearTimeout(timer);
    }
  }, [show, onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div className={`loader-container ${isExiting ? 'exiting' : ''}`}>
      <style>
        {`
          :root {
            --luxury-gold: #c5a059;
            --warm-beige: #f8f3e6;
            --cream-fabric: #faf6ee;
            --soft-beige: #f5f0e4;
            --stitch-beige: #e8e0d0;
            --shadow-light: rgba(197, 160, 89, 0.08);
            --shadow-medium: rgba(197, 160, 89, 0.12);
            --dark-gold: #b08c46;
          }

          .loader-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, var(--warm-beige) 0%, var(--cream-fabric) 100%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            font-family: 'Georgia', 'Times New Roman', serif;
            overflow: hidden;
          }

          .loader-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
              linear-gradient(90deg, transparent 79px, var(--shadow-light) 79px, transparent 80px),
              linear-gradient(0deg, transparent 79px, var(--shadow-light) 79px, transparent 80px);
            background-size: 80px 80px;
            opacity: 0.15;
            pointer-events: none;
          }

          .loader-container::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 50%);
            pointer-events: none;
          }

          .sewing-machine {
            position: relative;
            width: 280px;
            height: 200px;
            margin-bottom: 40px;
            filter: drop-shadow(2px 4px 8px var(--shadow-medium));
          }

          /* Machine Base */
          .machine-base {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 220px;
            height: 80px;
            background: linear-gradient(160deg, #e8e2d5 0%, #d8d0c0 100%);
            border-radius: 12px 12px 6px 6px;
            overflow: hidden;
            box-shadow: 
              inset 0 2px 4px rgba(255,255,255,0.8),
              inset 0 -2px 4px rgba(0,0,0,0.1),
              0 4px 12px var(--shadow-medium);
          }

          .machine-base::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 30px;
            background: linear-gradient(160deg, #f0eade 0%, #e0d8c8 100%);
            border-radius: 12px 12px 0 0;
          }

          /* Machine Body */
          .machine-body {
            position: absolute;
            bottom: 70px;
            left: 50%;
            transform: translateX(-50%);
            width: 180px;
            height: 100px;
            background: linear-gradient(160deg, #f5f1e8 0%, #e5ddd0 100%);
            border-radius: 10px;
            box-shadow: 
              inset 0 1px 3px rgba(255,255,255,0.9),
              inset 0 -1px 3px rgba(0,0,0,0.1),
              0 6px 16px var(--shadow-medium);
          }

          .machine-body::after {
            content: '';
            position: absolute;
            top: 10px;
            left: 10px;
            right: 10px;
            bottom: 10px;
            border: 1px solid var(--stitch-beige);
            border-radius: 6px;
            opacity: 0.5;
          }

          /* Hand Wheel */
          .hand-wheel {
            position: absolute;
            top: 30px;
            right: -15px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: linear-gradient(135deg, #d4c8ae 0%, #c5b89e 100%);
            border: 3px solid var(--luxury-gold);
            box-shadow: 
              inset 0 0 8px rgba(255,255,255,0.8),
              0 2px 6px rgba(0,0,0,0.1);
            animation: rotateWheel 4s linear infinite;
          }

          .hand-wheel::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 12px;
            height: 12px;
            background: var(--luxury-gold);
            border-radius: 50%;
          }

          .hand-wheel::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(45deg);
            width: 20px;
            height: 4px;
            background: var(--dark-gold);
            border-radius: 2px;
          }

          /* Needle Bar */
          .needle-bar {
            position: absolute;
            top: 40px;
            left: 50%;
            transform: translateX(-50%);
            width: 8px;
            height: 50px;
            background: linear-gradient(to bottom, #b0a080 0%, #888070 100%);
            border-radius: 4px;
            animation: vibrate 0.1s infinite;
          }

          /* Needle */
          .needle {
            position: absolute;
            top: 90px;
            left: 50%;
            transform: translateX(-50%) translateY(0);
            width: 3px;
            height: 25px;
            background: linear-gradient(to bottom, #c0c0c0 0%, #a0a0a0 100%);
            border-radius: 1px 1px 0 0;
            animation: ${isExiting ? 'stitchComplete 1.2s ease-out forwards' : 'stitch 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite'};
            z-index: 10;
          }

          .needle-eye {
            position: absolute;
            top: 4px;
            left: 50%;
            transform: translateX(-50%);
            width: 2px;
            height: 2px;
            background: #000;
            border-radius: 50%;
          }

          /* Thread */
          .thread {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 1px;
            height: 90px;
            background: linear-gradient(to bottom, 
              transparent 0%, 
              var(--luxury-gold) 20%, 
              var(--luxury-gold) 80%, 
              transparent 100%);
            opacity: 0.8;
            transform-origin: top center;
            animation: ${isExiting ? 'threadRelax 1.2s ease-out forwards' : 'threadStretch 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite'};
          }

          /* Fabric */
          .fabric {
            position: absolute;
            bottom: 40px;
            left: 50%;
            transform: translateX(-50%);
            width: 160px;
            height: 20px;
            background: linear-gradient(90deg, 
              var(--cream-fabric) 0%, 
              var(--warm-beige) 50%, 
              var(--cream-fabric) 100%);
            border-top: 1px dashed var(--stitch-beige);
            animation: ${isExiting ? 'fabricStop 1.2s ease-out forwards' : 'fabricSlide 6s linear infinite'};
            box-shadow: 
              inset 0 1px 2px rgba(255,255,255,0.8),
              0 2px 4px var(--shadow-light);
          }

          .fabric::before {
            content: '';
            position: absolute;
            top: -2px;
            left: 0;
            right: 0;
            height: 1px;
            background: repeating-linear-gradient(90deg, 
              transparent, 
              transparent 3px, 
              var(--luxury-gold) 3px, 
              var(--luxury-gold) 6px);
            opacity: 0.3;
          }

          /* Machine Details */
          .machine-detail {
            position: absolute;
            top: 20px;
            left: 20px;
            width: 60px;
            height: 15px;
            background: linear-gradient(90deg, var(--dark-gold) 0%, var(--luxury-gold) 100%);
            border-radius: 3px;
            opacity: 0.6;
          }

          .machine-detail-2 {
            position: absolute;
            top: 60px;
            right: 20px;
            width: 40px;
            height: 10px;
            background: var(--dark-gold);
            border-radius: 2px;
            opacity: 0.4;
          }

          /* Status Text */
          .status-text {
            margin-top: 30px;
            color: var(--dark-gold);
            font-size: 16px;
            font-weight: 300;
            letter-spacing: 1px;
            text-align: center;
            opacity: ${isExiting ? 0 : 1};
            animation: ${isExiting ? 'none' : 'textFade 3s ease-in-out infinite'};
            transition: opacity 0.6s ease;
            text-shadow: 0 1px 2px rgba(255,255,255,0.8);
          }

          /* Exit State */
          .loader-container.exiting {
            animation: fadeOut 1.2s ease-out forwards;
          }

          .loader-container.exiting .hand-wheel {
            animation: rotateSlow 2s ease-out forwards;
          }

          /* Animations */
          @keyframes stitch {
            0%, 100% {
              transform: translateX(-50%) translateY(0);
            }
            50% {
              transform: translateX(-50%) translateY(20px);
            }
          }

          @keyframes stitchComplete {
            0% {
              transform: translateX(-50%) translateY(0);
            }
            50% {
              transform: translateX(-50%) translateY(20px);
            }
            100% {
              transform: translateX(-50%) translateY(0);
              animation-play-state: paused;
            }
          }

          @keyframes threadStretch {
            0%, 100% {
              height: 90px;
              opacity: 0.8;
            }
            50% {
              height: 110px;
              opacity: 0.9;
            }
          }

          @keyframes threadRelax {
            0% {
              height: 90px;
              opacity: 0.8;
            }
            50% {
              height: 110px;
              opacity: 0.9;
            }
            100% {
              height: 90px;
              opacity: 0;
            }
          }

          @keyframes fabricSlide {
            0% {
              background-position: 160px 0;
            }
            100% {
              background-position: 0 0;
            }
          }

          @keyframes fabricStop {
            0% {
              background-position: 160px 0;
            }
            50% {
              background-position: 80px 0;
            }
            100% {
              background-position: 80px 0;
              animation-play-state: paused;
            }
          }

          @keyframes rotateWheel {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }

          @keyframes rotateSlow {
            0% {
              transform: rotate(0deg);
              animation-timing-function: ease-out;
            }
            100% {
              transform: rotate(180deg);
              animation-play-state: paused;
            }
          }

          @keyframes vibrate {
            0%, 100% {
              transform: translateX(-50%) translateX(-0.3px);
            }
            50% {
              transform: translateX(-50%) translateX(0.3px);
            }
          }

          @keyframes textFade {
            0%, 100% {
              opacity: 0.6;
            }
            50% {
              opacity: 1;
            }
          }

          @keyframes fadeOut {
            0% {
              opacity: 1;
              transform: scale(1);
            }
            100% {
              opacity: 0;
              transform: scale(0.98);
            }
          }

          /* Responsive Design */
          @media (max-width: 768px) {
            .sewing-machine {
              transform: scale(0.8);
            }
            
            .status-text {
              font-size: 14px;
            }
          }

          @media (max-width: 480px) {
            .sewing-machine {
              transform: scale(0.7);
            }
          }
        `}
      </style>

      <div className="sewing-machine">
        {/* Machine Base */}
        <div className="machine-base"></div>

        {/* Machine Body */}
        <div className="machine-body">
          <div className="machine-detail"></div>
          <div className="machine-detail-2"></div>
        </div>

        {/* Hand Wheel */}
        <div className={`hand-wheel ${isExiting ? "exit" : ""}`}></div>

        {/* Needle Assembly */}
        <div className="needle-bar"></div>

        <div className={`thread ${isExiting ? "exit" : ""}`}></div>

        <div className={`needle ${isExiting ? "exit" : ""}`}>
          <div className="needle-eye"></div>
        </div>

        {/* Fabric */}
        <div className={`fabric ${isExiting ? "exit" : ""}`}></div>
      </div>


      <div className="status-text">
        Preparing your tailoring workspace...
      </div>
    </div>
  );
};

export default Loader;