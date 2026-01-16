import React from 'react'; import { StatCardProps, StatTitle } from '../types';

export default function StatCard({ image, alt, style, subtitle, trend, trendDirection }: StatCardProps): React.JSX.Element {
    const theme: Record<StatTitle, { color: string; softBg: string }> = {
        "Total Tailor Shops": { color: "#213c58ff", softBg: "rgba(59,110,165,0.18)" },
        "Active Tailors": { color: "#29431fff", softBg: "rgba(106,143,91,0.18)" },
        "Inactive Tailors": { color: "#453722ff", softBg: "rgba(166,124,58,0.18)" },
        "Total Invoices Generated": { color: "#4e2e20ff", softBg: "rgba(181,100,66,0.18)" }
    };

    const current = theme[alt];

    const getIcon = () => {
        if (alt === "Total Tailor Shops") {
            return (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2">
                        <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
                    </path>
                    <circle cx="9" cy="7" r="4">
                        <animate attributeName="r" values="4;4.5;4" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87">
                        <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
                    </path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75">
                        <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
                    </path>
                </svg>
            );
        }
        if (alt === "Active Tailors") {
            return (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14">
                        <animate attributeName="stroke-dasharray" values="0 100;100 0" dur="3s" repeatCount="indefinite" />
                    </path>
                    <polyline points="22 4 12 14.01 9 11.01">
                        <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
                    </polyline>
                </svg>
            );
        }
        if (alt === "Inactive Tailors") {
            return (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2">
                        <animate attributeName="stroke-dasharray" values="0 30;30 0" dur="2s" repeatCount="indefinite" />
                    </path>
                    <circle cx="12" cy="7" r="4">
                        <animate attributeName="r" values="4;4.3;4" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                </svg>
            );
        }
        if (alt === "Total Invoices Generated") {
            return (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z">
                        <animate attributeName="stroke-dasharray" values="0 100;100 0" dur="3s" repeatCount="indefinite" />
                    </path>
                    <polyline points="14 2 14 8 20 8">
                        <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
                    </polyline>
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
            );
        }
    };

    return (
        <div
            className="relative w-full rounded-[26px] overflow-hidden transition-all duration-500 select-none shadow-[0_6px_18px_rgba(0,0,0,0.18),0_2px_6px_rgba(0,0,0,0.12)] hover:-translate-y-[4px] hover:shadow-[0_12px_28px_rgba(0,0,0,0.28),0_8px_16px_rgba(0,0,0,0.18)] max-sm:rounded-[20px] group"
            style={style}
        >
            <img
                src={image}
                alt={alt}
                draggable={false}
                onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
                onMouseDown={(e: React.MouseEvent) => e.preventDefault()}
                onDragStart={(e: React.DragEvent) => e.preventDefault()}
                className="w-full h-full block select-none pointer-events-none object-cover scale-[1.15] transition-transform duration-700 group-hover:scale-[1.18]"
            />
            <div className="absolute inset-0 flex flex-col justify-center pointer-events-none text-[#111111dd] font-['Inter',sans-serif] tracking-[0.3px]" style={{ padding: 'clamp(8px, 2vw, 22px)' }}>

                <div
                    className="mb-1 w-fit shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)] transition-all duration-500 group-hover:scale-110 group-hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.5),0_4px_12px_rgba(0,0,0,0.15)]"
                    style={{
                        color: current.color,
                        background: current.softBg,
                        fontSize: 'clamp(14px, 3vw, 25px)',
                        padding: 'clamp(3px, 0.8vw, 14px) clamp(5px, 1.2vw, 16px)',
                        borderRadius: 'clamp(6px, 1.2vw, 18px)',
                        marginTop: 'clamp(2px, 0.5vw, 4px)'
                    }}
                >
                    {getIcon()}
                </div>

                <div
                    className="font-bold leading-none transition-all duration-500 group-hover:scale-105"
                    style={{ color: current.color, fontSize: 'clamp(16px, 3.5vw, 30px)' }}
                >
                    {alt === "Total Tailor Shops" && "2,547"}
                    {alt === "Active Tailors" && "5,123"}
                    {alt === "Inactive Tailors" && "18"}
                    {alt === "Total Invoices Generated" && "215"}
                </div>

                <div className="mt-1 opacity-90" style={{ fontSize: 'clamp(8px, 1.8vw, 18px)' }}>
                    {alt === "Total Invoices Generated" ? "Total Invoices" : alt}
                </div>
                
                {subtitle && (
                    <div className="mt-0.5 opacity-60" style={{ fontSize: 'clamp(7px, 1.5vw, 12px)' }}>
                        {subtitle}
                    </div>
                )}

                {trend && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-md bg-white/40 backdrop-blur-sm border border-dashed border-white/60 transition-all duration-300 group-hover:scale-105 group-hover:bg-white/50" style={{ fontSize: 'clamp(7px, 1.5vw, 11px)' }}>
                        {trendDirection === 'up' && <span className="text-green-600">↑</span>}
                        {trendDirection === 'down' && <span className="text-red-600">↓</span>}
                        {trendDirection === 'stable' && <span className="text-gray-600">—</span>}
                        <span className={trendDirection === 'up' ? 'text-green-600' : trendDirection === 'down' ? 'text-red-600' : 'text-gray-600'}>
                            {trend}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}