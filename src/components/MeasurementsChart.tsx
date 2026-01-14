import React, { useState, useEffect } from "react";

interface MeasurementData { day: string; height: number; value: number; color: string; }

export default function MeasurementsChart(): React.JSX.Element {
    const [hovered, setHovered] = useState<number | null>(null); const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const data: MeasurementData[] = [
        { day: "Mon", height: 90, value: 42, color: "#b7c4d6" },
        { day: "Tue", height: 140, value: 78, color: "#e6c487" },
        { day: "Wed", height: 70, value: 31, color: "#bcd2b3" },
        { day: "Thu", height: 110, value: 56, color: "#e3b5a0" },
        { day: "Thu", height: 130, value: 64, color: "#b7c4d6" },
        { day: "Fri", height: 95, value: 47, color: "#e6c487" },
        { day: "Sat", height: 120, value: 69, color: "#bcd2b3" },
        { day: "Sun", height: 65, value: 28, color: "#e3b5a0" },
    ];

    return (
        <div className="w-full bg-gradient-to-b from-white/55 to-white/35 rounded-[20px] sm:rounded-[26px] pt-2.5 px-4 sm:px-6 pb-5 sm:pb-6 mt-5 shadow-[0_20px_40px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.6)] border border-white/35 font-['Poppins',sans-serif] h-[220px] sm:h-[242px] relative">

            <h3 className="text-[16px] sm:text-[18px] font-semibold mt-2.5  mb-[10px] sm:mb-[25px] text-[#6f5b3e]">
                Measurements Added This Month
            </h3>

            <div className="flex items-end justify-between h-[140px] sm:h-[160px] px-1 sm:px-2">
                {data.map((item: MeasurementData, i: number) => (
                    <div
                        key={i}
                        className="text-center w-[28px] sm:w-[36px] md:w-[42px] relative transition-all"
                        style={{ transitionDelay: `${i * 80}ms` }}
                    >

                        {/* Tooltip */}
                        {hovered === i && (
                            <div
                                className="absolute left-1/2 py-[6px] sm:py-[7px] px-2.5 sm:px-3.5 bg-white/92 rounded-[12px] sm:rounded-[14px] text-[11px] sm:text-[12px] font-semibold z-[99] text-[#6f5b3e] shadow-[0_10px_24px_rgba(0,0,0,0.15)] whitespace-nowrap pointer-events-none animate-[slideIn_0.35s_cubic-bezier(0.25,0.8,0.25,1)_forwards]"
                                style={{ bottom: `${item.height + 30}px` }}
                            >
                                {item.value} measurements
                            </div>
                        )}

                        <div
                            className={`relative overflow-hidden rounded-[6px] sm:rounded-[8px] md:rounded-[10px] cursor-pointer transition-all duration-[1.9s] cubic-bezier(0.25,0.8,0.25,1) ${hovered === i
                                ? "shadow-[0_12px_26px_rgba(0,0,0,0.15)] -translate-y-1.5"
                                : "shadow-[0_8px_18px_rgba(0,0,0,0.08)] translate-y-0"
                                }`}
                            style={{
                                height: mounted ? `${window.innerWidth < 800 ? item.height * 0.7 : window.innerWidth < 1000 ? item.height * 0.85 : item.height}px` : "0px",
                                background: `linear-gradient(180deg, ${item.color}, rgba(118, 101, 76, 0.2))`
                            }}
                            onMouseEnter={() => setHovered(i)}
                            onMouseLeave={() => setHovered(null)}
                        >
                            <div className="absolute inset-[3px] sm:inset-1 md:inset-1.5 rounded-[6px] sm:rounded-[8px] md:rounded-[10px] border-2 border-dashed border-black/25" />
                        </div>

                        <div className="mt-1.5 sm:mt-2 md:mt-2.5 text-[10px] sm:text-[11px] md:text-[13px] text-[#444]">{item.day}</div>
                    </div>
                ))}
            </div>

            <style>
                {`
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translate(-80px, 20px) scale(0.85);
                }
                to {
                    opacity: 1;
                    transform: translate(-50%, 0) scale(1);
                }
            }
            `}
            </style>
        </div>
    );
}