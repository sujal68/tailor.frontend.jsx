import React from 'react'; import { FiUsers } from "react-icons/fi"; import { FaRuler } from "react-icons/fa"; import { AiOutlineUser } from "react-icons/ai"; import { MdOutlineAccessTime } from "react-icons/md"; import { StatCardProps, StatTitle } from '../types';

export default function StatCard({ image, alt, style }: StatCardProps): React.JSX.Element {
    const theme: Record<StatTitle, { color: string; softBg: string }> = {
        "Total Tailor Shops": { color: "#213c58ff", softBg: "rgba(59,110,165,0.18)" },
        "Active Tailors": { color: "#29431fff", softBg: "rgba(106,143,91,0.18)" },
        "Inactive Tailors": { color: "#453722ff", softBg: "rgba(166,124,58,0.18)" },
        "Total Invoices Generated": { color: "#4e2e20ff", softBg: "rgba(181,100,66,0.18)" }
    };

    const current = theme[alt];

    return (
        <div
            className="relative w-full rounded-[26px] overflow-hidden transition-all duration-350 select-none shadow-[0_6px_18px_rgba(0,0,0,0.18),0_2px_6px_rgba(0,0,0,0.12)] hover:-translate-y-[3px] hover:shadow-[0_10px_18px_rgba(0,0,0,0.25),0_6px_12px_rgba(0,0,0,0.18)] max-sm:rounded-[20px]"
            style={style}
        >
            <img
                src={image}
                alt={alt}
                draggable={false}
                onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
                onMouseDown={(e: React.MouseEvent) => e.preventDefault()}
                onDragStart={(e: React.DragEvent) => e.preventDefault()}
                className="w-full h-full block select-none pointer-events-none object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-center pointer-events-none text-[#111111dd] font-['Inter',sans-serif] tracking-[0.3px]" style={{ padding: 'clamp(12px, 3vw, 22px)' }}>

                <div
                    className="mb-1 w-fit shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)]"
                    style={{
                        color: current.color,
                        background: current.softBg,
                        fontSize: 'clamp(20px, 5vw, 10px)',
                        padding: 'clamp(6px, 1.5vw, 14px) clamp(8px, 2vw, 16px)',
                        borderRadius: 'clamp(10px, 2vw, 18px)',
                        marginTop: 'clamp(2px, 0.5vw, 4px)'
                    }}
                >
                    {alt === "Total Tailor Shops" && <FiUsers />}
                    {alt === "Active Tailors" && <FaRuler />}
                    {alt === "Inactive Tailors" && <AiOutlineUser />}
                    {alt === "Total Invoices Generated" && <MdOutlineAccessTime />}
                </div>

                <div
                    className="font-bold leading-none"
                    style={{ color: current.color, fontSize: 'clamp(22px, 5.5vw, 30px)' }}
                >
                    {alt === "Total Tailor Shops" && "2,547"}
                    {alt === "Active Tailors" && "5,123"}
                    {alt === "Inactive Tailors" && "18"}
                    {alt === "Total Invoices Generated" && "215"}
                </div>

                <div className="mt-1 opacity-90" style={{ fontSize: 'clamp(11px, 2.5vw, 18px)' }}>{alt}</div>
            </div>
        </div>
    );
}