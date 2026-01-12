import React, { useState, useRef, useEffect } from "react";

export default function GlobalFilters({ filters, setFilters }) {
    return (
        <div style={styles.wrapper}>

            <PremiumSelect
                label="Date Range"
                value={filters.dateRange}
                onChange={v => setFilters({ ...filters, dateRange: v })}
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
                onChange={v => setFilters({ ...filters, business: v })}
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
                onChange={v => setFilters({ ...filters, city: v })}
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
                onChange={v => setFilters({ ...filters, status: v })}
                options={[
                    { value: "all", label: "All" },
                    { value: "active", label: "Active" },
                    { value: "suspended", label: "Suspended" },
                    { value: "trial", label: "Trial" },
                ]}
            />

        </div>
    );
}

/* ---------------- PREMIUM SELECT ---------------- */

function PremiumSelect({ label, value, onChange, options }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const close = e => !ref.current?.contains(e.target) && setOpen(false);
        document.addEventListener("mousedown", close);
        return () => document.removeEventListener("mousedown", close);
    }, []);

    const selected = options.find(o => o.value === value)?.label;

    return (
        <div style={styles.group} ref={ref}>
            <label style={styles.label}>{label}</label>

            <div
                style={styles.selectBox}
                onClick={() => setOpen(!open)}
            >
                <span>{selected}</span>
                <span style={{ ...styles.chevron, transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>▾</span>
            </div>

            {open && (
                <div style={styles.dropdown}>
                    {options.map(opt => (
                        <div
                            key={opt.value}
                            onClick={() => { onChange(opt.value); setOpen(false); }}
                            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.55)"}
                            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                            style={{
                                ...styles.option,
                                background: opt.value === value ? "rgba(255,255,255,0.45)" : "transparent"
                            }}
                        >

                            {opt.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

/* ---------------- STYLES ---------------- */

const styles = {
    wrapper: {
        display: "flex",
        gap: "18px",
        padding: "14px 18px",
        borderRadius: "16px",
        background: "linear-gradient(180deg, #ffffff9a 0%, #ffffff4f 100%)",
        border: "1px solid #e3dbd0",
    },

    group: { display: "flex", flexDirection: "column", gap: "6px", position: "relative" },

    label: { fontSize: "12px", color: "#8f8579", fontWeight: 500, fontFamily: 'Inter'},

    selectBox: {
        padding: "10px 14px",
        borderRadius: "14px",
        border: "1px solid rgba(255,255,255,0.45)",
        background: "rgba(255,255,255,0.55)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        fontSize: "13px",
        fontFamily: "Inter",
        color: "#5d4a3b",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
        boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
        minWidth: "150px",
    },

    chevron: {
        transition: "0.25s ease",
        color: "#8b7a63",
        fontSize: "12px",

    },

    dropdown: {
        position: "absolute",
        top: "110%",
        left: 0,
        right: 0,
        borderRadius: "14px",
        padding: "6px",
        background: "rgb(255 255 255 / 38%)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        border: "1px solid rgba(255,255,255,0.4)",
        boxShadow: "0 25px 60px rgba(0,0,0,0.25)",
        overflow: "hidden",
        zIndex: 100,
        fontFamily: 'Inter',
    },

    option: {
        padding: "10px 14px",
        fontSize: "13px",
        borderRadius: "10px",
        cursor: "pointer",
        color: "#5d4a3b",
        transition: "0.25s ease",
        userSelect: "none",
    }
};
