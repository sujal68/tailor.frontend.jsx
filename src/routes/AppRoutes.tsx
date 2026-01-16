import React from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";

import Dashboard from "../pages/Dashboard";
import Customers from "../pages/Customers";
import AdminLayout from "../layouts/AdminLayout";
import Profile from "../pages/Profile";

interface AppRoutesProps {
    onTriggerLoader: () => void;
    onLoaderComplete: () => void;
}

export default function AppRoutes({ onTriggerLoader, onLoaderComplete }: AppRoutesProps): React.JSX.Element {
    return (
        <Routes>

            {/* ===== PUBLIC AUTH ROUTES ===== */}
            
            <Route
                path="/"
                element={
                    <PublicRoute>
                        <Login onTriggerLoader={onTriggerLoader} onLoaderComplete={onLoaderComplete} />
                    </PublicRoute>
                }
            />

            <Route
                path="/login"
                element={
                    <PublicRoute>
                        <Login onTriggerLoader={onTriggerLoader} onLoaderComplete={onLoaderComplete} />
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


            {/* profile page */}
            <Route path="/profile" element={<Profile />} />


        </Routes>
    );
}
