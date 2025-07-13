import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const restoreUserFromToken = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    const response = await fetch("http://localhost:5000/api/users/me", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });

                    if (response.ok) {
                        const data = await response.json();
                        if (data && !data.error) {
                            setUser(data);
                        } else {
                            // Invalid token, remove it
                            localStorage.removeItem("token");
                            setUser(null);
                        }
                    } else {
                        // Token is invalid or expired
                        localStorage.removeItem("token");
                        setUser(null);
                    }
                }
            } catch (error) {
                console.error("Error restoring user from token:", error);
                localStorage.removeItem("token");
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        restoreUserFromToken();
    }, []);

    const login = (userData, token) => {
        setUser(userData);
        localStorage.setItem("token", token);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <UserContext.Provider value={{ user, setUser, login, logout, loading }}>
            {children}
        </UserContext.Provider>
    );
}; 