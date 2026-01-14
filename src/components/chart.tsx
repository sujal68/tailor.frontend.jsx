import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChartData } from '../types';

const data: ChartData[] = [
    { name: 'Jan', revenue: 120, customers: 820 },
    { name: 'Feb', revenue: 180, customers: 950 },
    { name: 'Mar', revenue: 160, customers: 1000 },
    { name: 'Apr', revenue: 220, customers: 1250 },
    { name: 'May', revenue: 260, customers: 1400 },
    { name: 'Jun', revenue: 300, customers: 1580 },
    { name: 'Jul', revenue: 280, customers: 1320 },
    { name: 'Aug', revenue: 320, customers: 1790 },
    { name: 'Sep', revenue: 290, customers: 1050 },
    { name: 'Oct', revenue: 340, customers: 1200 },
    { name: 'Nov', revenue: 360, customers: 2380 },
    { name: 'Dec', revenue: 400, customers: 1500 },
];

export default function CustomerGrowthChart(): React.JSX.Element {
    const [filter, setFilter] = useState<string>('Year');

    const getFilteredData = () => {
        if (filter === 'Year') return data;
        if (filter === 'Q1') return data.slice(0, 3);
        if (filter === 'Q2') return data.slice(3, 6);
        if (filter === 'Q3') return data.slice(6, 9);
        if (filter === 'Q4') return data.slice(9, 12);
        if (filter === 'Month') return data.slice(-1);
        return data;
    };

    return (
        <div className="w-full flex justify-center mt-5 font-['Poppins',_sans-serif] [&_.recharts-wrapper_*]:focus:outline-none [&_.recharts-surface]:outline-none [&_svg:focus]:outline-none">
            <div className="w-full bg-[linear-gradient(rgb(255_255_255_/_61%),_rgb(255_255_255_/_7%))] backdrop-blur-[12px] rounded-[20px] sm:rounded-[26px] pt-[14px] sm:pt-[16px] pr-[16px] sm:pr-[32px] sm:pb-[15px] pl-[4px] sm:pl-[6px] shadow-[0_20px_40px_rgba(0,0,0,0.06),_inset_0_1px_1px_rgba(255,255,255,0.6)] border border-[rgba(255,255,255,0.35)]">
                <div className="flex justify-between items-center mb-[18px] sm:mb-[21px] ml-[20px] sm:ml-[30px] mr-[10px] sm:mr-[20px]">
                    <div>
                        <h3 className="text-[16px] sm:text-[18px] font-semibold tracking-wide text-[rgb(111,91,62)] opacity-90 font-['Poppins',_sans-serif]">
                            Monthly Growth Overview
                        </h3>
                        <p className="text-[11px] sm:text-[12px] text-[#6f5b3e] opacity-60 mt-1 font-light">
                            Revenue & Total Customers (All Shops)
                        </p>
                    </div>
                    <div className="flex gap-2">
                        {['Year', 'Q1', 'Q2', 'Q3', 'Q4'].map((item) => (
                            <button
                                key={item}
                                onClick={() => setFilter(item)}
                                className={`px-3 py-1 text-[11px] sm:text-[12px] rounded-lg transition-all font-light tracking-wide ${filter === item
                                    ? 'bg-[#6f5b3e] text-white shadow-md'
                                    : 'bg-white/40 text-[#6f5b3e] opacity-70 hover:opacity-100'
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                <ResponsiveContainer width="105%" height={200}>
                    <AreaChart
                        data={getFilteredData()}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <defs>
                            <linearGradient id="revenueGradient" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#d4af37" stopOpacity={0.3} />
                                <stop offset="25%" stopColor="#e6c487" stopOpacity={0.3} />
                                <stop offset="50%" stopColor="#d4af37" stopOpacity={0.3} />
                                <stop offset="75%" stopColor="#e6c487" stopOpacity={0.3} />
                                <stop offset="100%" stopColor="#d4af37" stopOpacity={0.2} />
                            </linearGradient>
                            <linearGradient id="revenueLineGradient" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#d4af37" />
                                <stop offset="50%" stopColor="#e6c487" />
                                <stop offset="100%" stopColor="#d4af37" />
                            </linearGradient>
                            <linearGradient id="customersGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#8b9e7d" stopOpacity={0.2} />
                                <stop offset="100%" stopColor="#8b9e7d" stopOpacity={0.05} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid
                            strokeDasharray="0"
                            stroke="#6f5b3e"
                            strokeOpacity={0.06}
                            vertical={false}
                        />

                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6f5b3e', fontSize: 13, opacity: 0.6, fontWeight: 300, letterSpacing: 1 }}
                            dy={10}
                        />

                        <YAxis
                            yAxisId="left"
                            domain={[0, 400]}
                            ticks={[0, 100, 200, 300, 400]}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6f5b3e', fontSize: 13, opacity: 0.6, fontWeight: 300 }}
                            dx={-10}
                        />

                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            domain={[0, 3000]}
                            ticks={[0, 1000, 2000, 3000]}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#8b9e7d', fontSize: 13, opacity: 0.6, fontWeight: 300 }}
                            dx={10}
                        />

                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                border: 'none',
                                borderRadius: '12px',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                padding: '12px',
                                fontWeight: 300
                            }}
                        />

                        <Legend
                            wrapperStyle={{ fontSize: '12px', fontWeight: 300, paddingTop: '10px' }}
                            iconType="line"
                        />

                        <Area
                            yAxisId="left"
                            type="monotone"
                            dataKey="revenue"
                            name="Revenue"
                            stroke="url(#revenueLineGradient)"
                            strokeWidth={2}
                            fill="url(#revenueGradient)"
                            dot={false}
                        />

                        <Area
                            yAxisId="right"
                            type="monotone"
                            dataKey="customers"
                            name="Customers"
                            stroke="#8b9e7d"
                            strokeWidth={2}
                            fill="url(#customersGradient)"
                            dot={false}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}