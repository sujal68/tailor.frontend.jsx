import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function OTPRoute({ children }) {
    const location = useLocation();
    const [allowed, setAllowed] = useState(null);

    useEffect(() => {
        if (!location.state || !location.state.email) {
            setAllowed(false);
        } else {
            setAllowed(true);
        }
    }, [location]);

    if (allowed === null) return null;        // wait one tick
    if (!allowed) return <Navigate to="/login" replace />;

    return children;
}
