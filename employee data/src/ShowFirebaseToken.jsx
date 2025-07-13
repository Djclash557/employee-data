import React, { useState } from "react";
import { getAuth } from "firebase/auth";

export default function ShowFirebaseToken() {
    const [token, setToken] = useState("");

    const handleGetToken = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            const idToken = await user.getIdToken();
            setToken(idToken);
            console.log("Firebase ID Token:", idToken);
        } else {
            setToken("No user is logged in.");
        }
    };

    return (
        <div style={{ margin: 20 }}>
            <button onClick={handleGetToken}>Show Firebase ID Token</button>
            {token && (
                <div style={{ marginTop: 10, wordBreak: "break-all" }}>
                    <strong>Token:</strong>
                    <div>{token}</div>
                </div>
            )}
        </div>
    );
} 