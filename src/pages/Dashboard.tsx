import React, { useState } from "react";
import StatCard from "../components/StatCard";
import Chart from "../components/chart";
import SystemHealth from "../components/SystemHealth";
import Table from "../components/table";
import customerCard from "../assets/total-customer-card.png";
import measurementCard from "../assets/total-maesurement.png";
import adminCard from "../assets/Total-admin-card.png";
import activityCard from "../assets/total-activity-card.png";
import GlobalFilters from "../components/GlobalFilters";
import { FilterState } from '../types';

export default function Dashboard(): React.JSX.Element {
    const [filters, setFilters] = useState<FilterState>({ dateRange: "30", business: "all", city: "all", status: "all" });

    return (
        <div className="px-4 sm:px-6 pb-6 pt-1">

                    <div className="flex flex-col lg:flex-row justify-between items-start mb-[22px] gap-5">
                        {/* Left Title */}
                        <div>
                            <h1 className="text-[28px] sm:text-[32px] font-bold m-0 text-[#6f5b3e] font-sans">
                                Dashboard
                            </h1>

                            <p className="m-0 mt-1.5 text-sm text-[#8b7a63] font-sans">
                                Overview of your tailoring business
                            </p>
                            
                            <p className="m-0 mt-2 text-xs text-[#8b7a63] opacity-70 font-sans">
                                Updated: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                            </p>
                        </div>

                        {/* Right Filters */}
                        <div className="w-full lg:min-w-[520px] lg:w-auto">
                            <GlobalFilters filters={filters} setFilters={setFilters} />
                        </div>
                    </div>

                    {/* Business Overview Section */}
                    <div className="mb-3">
                        <h2 className="text-[14px] sm:text-[15px] font-semibold text-[#6f5b3e] opacity-80 tracking-wide uppercase">
                            Business Overview
                        </h2>
                    </div>

                    {/* Stat Cards: 2 per row on mobile, 4 on desktop */}
                    <div className="grid grid-cols-2 min-[750px]:grid-cols-3 min-[1200px]:grid-cols-4 gap-3 sm:gap-4 xl:gap-5 w-full">
                        <StatCard 
                            image={customerCard} 
                            alt="Total Tailor Shops" 
                            subtitle="Across all registered businesses"
                            trend="3.2% this week"
                            trendDirection="up"
                        />
                        <StatCard 
                            image={measurementCard} 
                            alt="Active Tailors" 
                            subtitle="Currently operational"
                            trend="Stable"
                            trendDirection="stable"
                        />
                        <StatCard 
                            image={adminCard} 
                            alt="Inactive Tailors" 
                            subtitle="Temporarily closed"
                            trend="1.1% vs last month"
                            trendDirection="down"
                        />
                        <StatCard 
                            image={activityCard} 
                            alt="Total Invoices Generated" 
                            subtitle="Generated this year"
                            trend="5.8% this month"
                            trendDirection="up"
                        />
                    </div>

                    {/* Charts: Single column on mobile/tablet, 2 columns on desktop */}
                    <div className="mt-[25px] grid grid-cols-1 lg:grid-cols-2 gap-4 xl:gap-6 items-stretch">
                        <div className="flex">
                            <Chart />
                        </div>

                        <div className="flex">
                            <SystemHealth />
                        </div>
                    </div>

                    <div className="mt-10">
                        <Table />
                    </div>

                </div>
    );
}