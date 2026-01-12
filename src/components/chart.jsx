import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { month: 'Jan', series1: 120, series2: 80, series3: 60 },
    { month: 'Feb', series1: 180, series2: 140, series3: 110 },
    { month: 'Mar', series1: 160, series2: 200, series3: 130 },
    { month: 'Apr', series1: 220, series2: 180, series3: 140 },
    { month: 'May', series1: 260, series2: 170, series3: 160 },
    { month: 'Jun', series1: 300, series2: 240, series3: 190 },
];
const noFocusCss = `
.recharts-wrapper *:focus {
  outline: none !important;
}

.recharts-surface {
  outline: none !important;
}

svg:focus {
  outline: none !important;
}
`;

export default function CustomerGrowthChart() {

    return (
        <>
            <style>{noFocusCss}</style>
            <div style={{
                width: "100%",
                display: "flex",
                // justifyContent: "center",
                padding: "20px 0",
                fontFamily: "'Poppins', sans-serif"
            }}>

                <div style={{
                    width: "100%",
                    maxWidth: "600px",
                    background: "linear-gradient(rgb(255 255 255 / 61%), rgb(255 255 255 / 7%))",
                    backdropFilter: "blur(12px)",
                    borderRadius: "26px",
                    padding: "16px 32px 26px 6px",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.06), inset 0 1px 1px rgba(255,255,255,0.6)",
                    border: "1px solid rgba(255,255,255,0.35)"
                }}>
                    <h3 style={{
                        fontSize: "18px",
                        fontWeight: 600,
                        marginBottom: "21px",
                        marginLeft: "30px",
                        color: "rgb(111, 91, 62)",
                        fontFamily: "'Poppins', sans-serif"
                    }}>
                        Monthly Customer Growth
                    </h3>

                    <ResponsiveContainer width="100%" height={150}>
                        <LineChart
                            data={data}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <defs>
                                <linearGradient id="colorSeries1" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#e8d5c4" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#e8d5c4" stopOpacity={0.1} />
                                </linearGradient>
                                <linearGradient id="colorSeries2" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#a8b5a0" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#a8b5a0" stopOpacity={0.1} />
                                </linearGradient>
                                <linearGradient id="colorSeries3" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#9ca3af" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#9ca3af" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>

                            <CartesianGrid
                                strokeDasharray="0"
                                stroke="#f0f0f0"
                                vertical={false}
                            />

                            <XAxis
                                dataKey="month"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#40454cff', fontSize: 14 }}
                                dy={10}
                            />

                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#40454cff', fontSize: 14 }}
                                dx={-10}
                            />

                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                    border: 'none',
                                    borderRadius: '12px',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                    padding: '12px'
                                }}
                            />

                            <Line
                                type="monotone"
                                dataKey="series1"
                                stroke="#d4a574"
                                strokeWidth={3}
                                dot={{ fill: '#d4a574', r: 6, strokeWidth: 3, stroke: '#fff' }}
                                activeDot={{ r: 8 }}
                                fill="url(#colorSeries1)"
                            />

                            <Line
                                type="monotone"
                                dataKey="series2"
                                stroke="#8b9e7d"
                                strokeWidth={3}
                                dot={{ fill: '#8b9e7d', r: 6, strokeWidth: 3, stroke: '#fff' }}
                                activeDot={{ r: 8 }}
                                fill="url(#colorSeries2)"
                            />

                            <Line
                                type="monotone"
                                dataKey="series3"
                                stroke="#7d8894"
                                strokeWidth={3}
                                dot={{ fill: '#7d8894', r: 6, strokeWidth: 3, stroke: '#fff' }}
                                activeDot={{ r: 8 }}
                                fill="url(#colorSeries3)"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div >
        </>
    );
}