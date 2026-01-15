import React from "react";

interface StatRowProps {
    label: string;
    value: string;
}

const StatRow: React.FC<StatRowProps> = ({ label, value }) => (
    <div className="flex justify-between items-center py-2.5 border-b border-[#6f5b3e]/10 last:border-0">
        <span className="text-[12px] sm:text-[13px] text-[#6f5b3e] opacity-70 font-light">{label}</span>
        <span className="text-[12px] sm:text-[13px] text-[#6f5b3e] font-medium">{value}</span>
    </div>
);

export default function SystemHealth(): React.JSX.Element {
    return (
        <div className="w-full bg-gradient-to-b from-white/55 to-white/35 rounded-[20px] sm:rounded-[26px] pt-2.5 px-4 sm:px-6 pb-5 sm:pb-6 mt-5 shadow-[0_20px_40px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.6)] border border-white/35 font-['Poppins',sans-serif] h-[300px] sm:h-[300px] relative flex flex-col">
            
            {/* Header */}
            <div className="flex justify-between items-center mb-4 sm:mb-5">
                <h3 className="text-[16px] sm:text-[18px] font-semibold text-[#6f5b3e] pt-2">
                    System Health
                </h3>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500 shadow-md" />
                    <span className="text-[12px] sm:text-[13px] text-[#6f5b3e] font-medium">Stable</span>
                </div>
            </div>

            {/* Stats Body */}
            <div className="flex-1 bg-white/20 rounded-[12px] sm:rounded-[14px] px-3 sm:px-4 py-2 sm:py-3">
                <StatRow label="Uptime" value="99.9%" />
                <StatRow label="API Latency" value="120 ms" />
                <StatRow label="Database" value="Connected" />
                <StatRow label="Errors" value="0.3%" />
            </div>

            {/* Footer */}
            <div className="mt-3 sm:mt-4 text-center">
                <span className="text-[10px] sm:text-[11px] text-[#6f5b3e] opacity-50 font-light">
                    Last checked: 2 minutes ago
                </span>
            </div>
        </div>
    );
}
