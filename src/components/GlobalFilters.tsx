import React, { useState, useRef, useEffect } from "react";
import { GlobalFiltersProps, PremiumSelectProps } from '../types';

export default function GlobalFilters({ filters, setFilters }: GlobalFiltersProps): React.JSX.Element {
    return (
        <>
            {/* Mobile: Icon-based horizontal scroll */}
            <div className="w-full overflow-x-visible lg:hidden">
                <div className="relative flex gap-2 sm:gap-3 p-2 min-w-max">
                    <MobileFilter
                        label="Date Range"
                        icon={<CalendarIcon />}
                        value={filters.dateRange}
                        onChange={(v: string) => setFilters({ ...filters, dateRange: v })}
                        options={[
                            { value: "7", label: "Last 7 Days" },
                            { value: "30", label: "Last 30 Days" },
                            { value: "90", label: "Last 3 Months" },
                            { value: "365", label: "Last Year" },
                        ]}
                    />
                    <MobileFilter
                        label="Tailor Business"
                        icon={<BusinessIcon />}
                        value={filters.business}
                        onChange={(v: string) => setFilters({ ...filters, business: v })}
                        options={[
                            { value: "all", label: "All" },
                            { value: "royal", label: "Royal Tailors" },
                            { value: "elite", label: "Elite Stitch" },
                            { value: "urban", label: "Urban Fit" },
                        ]}
                    />
                    <MobileFilter
                        label="City"
                        icon={<LocationIcon />}
                        value={filters.city}
                        onChange={(v: string) => setFilters({ ...filters, city: v })}
                        options={[
                            { value: "all", label: "All" },
                            { value: "surat", label: "Surat" },
                            { value: "ahmedabad", label: "Ahmedabad" },
                            { value: "vadodara", label: "Vadodara" },
                        ]}
                    />
                    <MobileFilter
                        label="Status"
                        icon={<StatusIcon />}
                        value={filters.status}
                        onChange={(v: string) => setFilters({ ...filters, status: v })}
                        options={[
                            { value: "all", label: "All" },
                            { value: "active", label: "Active" },
                            { value: "suspended", label: "Suspended" },
                            { value: "trial", label: "Trial" },
                        ]}
                    />
                </div>
            </div>

            {/* Desktop: Original layout */}
            <div className="hidden lg:flex flex-wrap md:flex-nowrap gap-[18px] min-[1300px]:gap-[18px] gap-[12px] p-[14px_18px] min-[1300px]:p-[14px_18px] p-[10px_12px] rounded-[16px] bg-[linear-gradient(180deg,#ffffff9a_0%,#ffffff4f_100%)] border border-[#e3dbd0]">
                <PremiumSelect
                    label="Date Range"
                    value={filters.dateRange}
                    onChange={(v: string) => setFilters({ ...filters, dateRange: v })}
                    options={[
                        { value: "7", label: "Last 7 Days" },
                        { value: "30", label: "Last 30 Days" },
                        { value: "90", label: "Last 3 Months" },
                        { value: "365", label: "Last Year" },
                    ]}
                />
                <PremiumSelect
                    label="Tailor Business"
                    value={filters.business}
                    onChange={(v: string) => setFilters({ ...filters, business: v })}
                    options={[
                        { value: "all", label: "All" },
                        { value: "royal", label: "Royal Tailors" },
                        { value: "elite", label: "Elite Stitch" },
                        { value: "urban", label: "Urban Fit" },
                    ]}
                />
                <PremiumSelect
                    label="City"
                    value={filters.city}
                    onChange={(v: string) => setFilters({ ...filters, city: v })}
                    options={[
                        { value: "all", label: "All" },
                        { value: "surat", label: "Surat" },
                        { value: "ahmedabad", label: "Ahmedabad" },
                        { value: "vadodara", label: "Vadodara" },
                    ]}
                />
                <PremiumSelect
                    label="Status"
                    value={filters.status}
                    onChange={(v: string) => setFilters({ ...filters, status: v })}
                    options={[
                        { value: "all", label: "All" },
                        { value: "active", label: "Active" },
                        { value: "suspended", label: "Suspended" },
                        { value: "trial", label: "Trial" },
                    ]}
                />
            </div>
        </>
    );
}

function MobileFilter({ label, icon, value, onChange, options }: PremiumSelectProps & { icon: React.ReactNode }): React.JSX.Element {
    const [open, setOpen] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const close = (e: MouseEvent): void => {
            if (!ref.current?.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", close);
        return () => document.removeEventListener("mousedown", close);
    }, []);

    return (
        <div ref={ref} className="relative flex flex-col items-center gap-1.5">
            <div
                onClick={() => setOpen(!open)}
                className="w-[56px] h-[56px] sm:w-[60px] sm:h-[60px] rounded-[16px]
                            border border-[rgba(139,122,99,0.2)]
                            bg-[rgba(255,255,255,0.4)] backdrop-blur-[8px]
                            flex items-center justify-center cursor-pointer
                            shadow-[0_6px_16px_rgba(0,0,0,0.06)]
                            hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)]
                            transition-all active:scale-95"
            >
                <div className="text-[#8b7a63]">{icon}</div>
            </div>

            <label className="text-[10px] text-[#8f8579] font-medium font-[Inter] text-center whitespace-nowrap">
                {label}
            </label>

            {open && (
                <div
                    className="absolute top-full mt-2 left-[50px] -translate-x-1/2 min-w-[140px]
          rounded-[14px] p-[6px]
          bg-[rgb(255_255_255_/95%)] backdrop-blur-[18px]
          border border-[rgba(255,255,255,0.4)]
          shadow-[0_25px_60px_rgba(0,0,0,0.25)]
          overflow-hidden z-[200] font-[Inter]
          animate-in fade-in slide-in-from-top-1 duration-150"
                >
                    {options.map(opt => (
                        <div
                            key={opt.value}
                            onClick={() => { onChange(opt.value); setOpen(false); }}
                            className={`px-[14px] py-[10px] text-[13px] rounded-[10px]
              cursor-pointer text-[#5d4a3b]
              transition-all duration-[250ms] select-none
              ${opt.value === value
                                    ? "bg-[rgba(139,122,99,0.15)]"
                                    : "hover:bg-[rgba(255,255,255,0.55)]"}`}
                        >
                            {opt.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

}

function PremiumSelect({ label, value, onChange, options }: PremiumSelectProps): React.JSX.Element {
    const [open, setOpen] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const close = (e: MouseEvent): void => {
            if (!ref.current?.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", close);
        return () => document.removeEventListener("mousedown", close);
    }, []);

    const selected = options.find(o => o.value === value)?.label;

    return (
        <div ref={ref} className="relative flex flex-col gap-[6px] min-[1300px]:gap-[6px] gap-[4px]">
            <label className="text-[12px] min-[1300px]:text-[12px] text-[10px] text-[#8f8579] font-medium font-[Inter]">{label}</label>

            <div
                onClick={() => setOpen(!open)}
                className="flex items-center justify-between px-[14px] min-[1300px]:px-[14px] px-[10px] py-[10px] min-[1300px]:py-[10px] py-[8px] rounded-[14px] border border-[rgba(255,255,255,0.45)] bg-[rgba(255,255,255,0.55)] backdrop-blur-[12px] text-[13px] min-[1300px]:text-[13px] text-[11px] font-[Inter] text-[#5d4a3b] cursor-pointer shadow-[0_10px_25px_rgba(0,0,0,0.12)] min-w-[150px] min-[1300px]:min-w-[150px] min-w-[120px]"
            >
                <span>{selected}</span>
                <span className={`text-[12px] text-[#8b7a63] transition-all duration-[250ms] ${open ? "rotate-180" : "rotate-0"}`}>▾</span>
            </div>

            {open && (
                <div className="absolute top-[110%] left-0 right-0 rounded-[14px] p-[6px] bg-[rgb(255_255_255_/38%)] backdrop-blur-[18px] border border-[rgba(255,255,255,0.4)] shadow-[0_25px_60px_rgba(0,0,0,0.25)] overflow-hidden z-[100] font-[Inter]">
                    {options.map(opt => (
                        <div
                            key={opt.value}
                            onClick={() => { onChange(opt.value); setOpen(false); }}
                            className={`px-[14px] py-[10px] text-[13px] rounded-[10px] cursor-pointer text-[#5d4a3b] transition-all duration-[250ms] select-none ${opt.value === value ? "bg-[rgba(255,255,255,0.45)]" : "hover:bg-[rgba(255,255,255,0.55)]"}`}
                        >
                            {opt.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

const CalendarIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
);

const BusinessIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20 7h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 4h4v3h-4V4z" />
    </svg>
);

const LocationIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

const StatusIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);
