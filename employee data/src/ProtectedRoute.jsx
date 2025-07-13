import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(UserContext);
    const token = localStorage.getItem("token");

    // Show loading spinner while checking authentication
    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                fontSize: '18px',
                color: '#6366F1'
            }}>
                Loading...
            </div>
        );
    }

    // Redirect to login if no token or no user
    if (!token || !user) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute; 