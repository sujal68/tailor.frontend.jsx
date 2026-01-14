import React, { useState, useEffect } from "react";
import StatCard from "../components/StatCard";
import Chart from "../components/chart";
import MeasurementsChart from "../components/MeasurementsChart";
import Table from "../components/table";
import customerCard from "../assets/total-customer-card.png";
import measurementCard from "../assets/total-maesurement.png";
import adminCard from "../assets/Total-admin-card.png";
import activityCard from "../assets/total-activity-card.png";
import Loader from "../components/Loader";
import GlobalFilters from "../components/GlobalFilters";
import { FilterState } from '../types';

export default function Dashboard(): React.JSX.Element {
    const [filters, setFilters] = useState<FilterState>({ dateRange: "30", business: "all", city: "all", status: "all" }); const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 16);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Loader show={loading} />

            {!loading && (
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
                        </div>

                        {/* Right Filters */}
                        <div className="w-full lg:min-w-[520px] lg:w-auto">
                            <GlobalFilters filters={filters} setFilters={setFilters} />
                        </div>
                    </div>

                    {/* Stat Cards: 2 per row on mobile, 4 on desktop */}
                    <div className="grid grid-cols-2 min-[900px]:grid-cols-4 gap-3 sm:gap-4 xl:gap-5 w-full">
                        <StatCard image={customerCard} alt="Total Tailor Shops" />
                        <StatCard image={measurementCard} alt="Active Tailors" />
                        <StatCard image={adminCard} alt="Inactive Tailors" />
                        <StatCard image={activityCard} alt="Total Invoices Generated" />
                    </div>

                    {/* Charts: Single column on mobile/tablet, 2 columns on desktop */}
                    <div className="mt-[25px] grid grid-cols-1 lg:grid-cols-2 gap-4 xl:gap-6 items-stretch">
                        <div className="flex">
                            <Chart />
                        </div>

                        <div className="flex">
                            <MeasurementsChart />
                        </div>
                    </div>

                    <div className="mt-10">
                        <Table />
                    </div>

                </div>
            )}
        </>
    );
}