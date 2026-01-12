import { useState, useEffect } from "react";


export default function MeasurementsChart() {

    const [hovered, setHovered] = useState(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const data = [
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
        <div style={{
            width: "100%",
            maxWidth: "600px",
            background: "linear-gradient(180deg, rgba(255,255,255,0.55), rgba(255,255,255,0.35))",
            borderRadius: "26px",
            padding: "10px 24px 24px 24px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.06), inset 0 1px 1px rgba(255,255,255,0.6)",
            border: "1px solid rgba(255,255,255,0.35)",
            fontFamily: "'Poppins', sans-serif",
            height: "220px",
            position: "relative"
        }}>

            <h3 style={{
                fontSize: "18px",
                fontWeight: 600,
                marginBottom: "25px",
                color: "#6f5b3e"
            }}>
                Measurements Added This Month
            </h3>

            <div style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                height: "160px",
                padding: "0 8px"
            }}>
                {data.map((item, i) => (
                    <div key={i} style={{
                        textAlign: "center",
                        width: "42px",
                        position: "relative",
                        transitionDelay: `${i * 80}ms`
                    }}>

                        {/* Tooltip */}
                        {hovered === i && (
                            <div
                                style={{
                                    position: "absolute",
                                    bottom: `${item.height + 35}px`,
                                    left: "50%",
                                    // transform: "translateX(-50%)",
                                    padding: "7px 14px",
                                    background: "rgba(255,255,255,0.92)",
                                    borderRadius: "14px",
                                    fontSize: "12px",
                                    fontWeight: 600,
                                    zIndex: 99,
                                    color: "#6f5b3e",
                                    boxShadow: "0 10px 24px rgba(0,0,0,.15)",
                                    whiteSpace: "nowrap",
                                    pointerEvents: "none",
                                    animation: "slideIn .35s cubic-bezier(.25,.8,.25,1) forwards"
                                }}
                            >
                                {item.value} measurements
                            </div>
                        )}


                        <div
                            style={{
                                height: mounted ? `${item.height}px` : "0px",
                                background: `linear-gradient(180deg, ${item.color}, rgba(118, 101, 76, 0.2))`,
                                borderRadius: "10px",
                                position: "relative",
                                overflow: "hidden",
                                boxShadow: hovered === i
                                    ? "0 12px 26px rgba(0,0,0,0.15)"
                                    : "0 8px 18px rgba(0,0,0,0.08)",
                                transition: "height 1.9s cubic-bezier(.25,.8,.25,1), box-shadow .35s ease, transform .35s ease",
                                cursor: "pointer",
                                transform: hovered === i ? "translateY(-6px)" : "translateY(0)",
                            }}
                            onMouseEnter={() => setHovered(i)}
                            onMouseLeave={() => setHovered(null)}
                        >
                            <div
                                style={{
                                    position: "absolute",
                                    inset: "6px",
                                    borderRadius: "10px",
                                    border: "2px dashed rgba(0, 0, 0, 0.24)"
                                }}
                            />
                        </div>


                        <div style={{
                            marginTop: "10px",
                            fontSize: "13px",
                            color: "#444"
                        }}>{item.day}</div>
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
