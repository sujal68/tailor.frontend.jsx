import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface OTPRouteProps {
    children: React.ReactNode;
}

interface LocationState {
    email?: string;
}

export default function OTPRoute({ children }: OTPRouteProps): React.JSX.Element | null {
    const location = useLocation();
    const [allowed, setAllowed] = useState<boolean | null>(null);

    useEffect(() => {
        const state = location.state as LocationState;
        if (!state || !state.email) {
            setAllowed(false);
        } else {
            setAllowed(true);
        }
    }, [location]);

    if (allowed === null) return null;        // wait one tick
    if (!allowed) return <Navigate to="/login" replace />;

    return children as React.JSX.Element;
}
