import { Routes, Route } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import OTPVerification from "../pages/VerifyOTP";

import Dashboard from "../pages/Dashboard";
import Customers from "../pages/Customers";
import AdminLayout from "../layouts/AdminLayout";

export default function AppRoutes() {
    return (
        <Routes>

            {/* ===== PUBLIC AUTH ROUTES ===== */}
            
            <Route
                path="/"
                element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                }
            />

            <Route
                path="/login"
                element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                }
            />

            <Route
                path="/forgot-password"
                element={
                    <PublicRoute>
                        <ForgotPassword />
                    </PublicRoute>
                }
            />

            <Route path="/verify-otp" element={<OTPVerification />} />


            {/* ===== PROTECTED ADMIN AREA ===== */}
            <Route
                path="/dashboard"
                element={
                    <PrivateRoute>
                        <AdminLayout />
                    </PrivateRoute>
                }
            >
                <Route index element={<Dashboard />} />
                <Route path="customers" element={<Customers />} />
            </Route>

        </Routes>
    );
}
