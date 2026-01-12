import StatCard from "../components/StatCard";
import Chart from "../components/chart";
import MeasurementsChart from "../components/MeasurementsChart";
import Table from "../components/table";
import customerCard from "../assets/total-customer-card.png";
import measurementCard from "../assets/total-maesurement.png";
import adminCard from "../assets/Total-admin-card.png";
import activityCard from "../assets/total-activity-card.png";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import GlobalFilters from "../components/GlobalFilters";



export default function Dashboard() {
    const [filters, setFilters] = useState({
        dateRange: "30",
        business: "all",
        city: "all",
        status: "all"
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 16);   // 1.6 sec luxury intro

        return () => clearTimeout(timer);
    }, []);
    return (
        <>
            <Loader show={loading} />

            {!loading && (
                <div style={{ padding: "4px 24px 24px 24px" }}>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            marginBottom: "22px",
                            gap: "20px"
                        }}
                    >
                        {/* Left Title */}
                        <div>
                            <h1 style={{
                                fontSize: "32px",
                                fontWeight: 700,
                                margin: 0,
                                color: "#6f5b3e",
                                fontFamily: "'Inter', sans-serif"
                            }}>
                                Dashboard
                            </h1>

                            <p style={{
                                margin: "6px 0 0",
                                fontSize: "14px",
                                color: "#8b7a63",
                                fontFamily: "'Inter', sans-serif"
                            }}>
                                Overview of your tailoring business
                            </p>
                        </div>

                        {/* Right Filters */}
                        <div style={{ minWidth: "520px" }}>
                            <GlobalFilters filters={filters} setFilters={setFilters} />
                        </div>
                    </div>

                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "20px",
                        flexWrap: "nowrap"
                    }}>
                        <StatCard image={customerCard} alt="Total Customers" style={{ width: "95%" }} />
                        <StatCard image={measurementCard} alt="Total Measurements" style={{ width: "100%" }} />
                        <StatCard image={adminCard} alt="Total Admins" style={{ width: "100%" }} />
                        <StatCard image={activityCard} alt="Today's Activity" style={{ width: "104%" }} />
                    </div>

                    <div
                        style={{
                            marginTop: "25px",
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "24px",
                            alignItems: "stretch"
                        }}
                    >
                        <div style={{ display: "flex" }}>
                            <Chart />
                        </div>

                        <div style={{ display: "flex", marginTop: "16px" }}>
                            <MeasurementsChart />
                        </div>
                    </div>

                    <div style={{ marginTop: "40px" }}>
                        <Table />
                    </div>

                </div>
            )}
        </>
    );

}

