import React from "react";
import { motion } from "framer-motion";
import RecentRegistrationsTable from "../components/RecentRegistrationsTable";

export default function RecentRegistrations(): React.JSX.Element {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="px-4 sm:px-6 pb-6 pt-1"
        >
            <div className="mb-[22px]">
                <h1 className="text-[28px] sm:text-[32px] font-bold m-0 text-[#6f5b3e] font-sans">
                    Recent Registrations
                </h1>
                <p className="m-0 mt-1.5 text-sm text-[#8b7a63] font-sans">
                    Latest tailor shop registrations
                </p>
            </div>

            <div className="font-['Inter',sans-serif] text-[#4e463e]">
                <div className="main-container max-w-[1154px] [body.sidebar-collapsed_&]:max-w-[1334px] mx-auto bg-gradient-to-b from-white/60 to-white/30 rounded-[18px] p-[18px] sm:p-[26px] border border-white transition-[max-width] duration-350 ease-in-out">
                    <RecentRegistrationsTable />
                </div>
            </div>
        </motion.div>
    );
}