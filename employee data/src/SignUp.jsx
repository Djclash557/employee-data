import React, { useState, useContext } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        if (!termsAccepted) {
            alert("You must accept the terms and conditions.");
            return;
        }
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: email.split("@")[0], email, password, role })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Registration failed");
            // Optionally, log the user in after registration
            const loginRes = await fetch("http://localhost:5000/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            const loginData = await loginRes.json();
            if (!loginRes.ok) throw new Error(loginData.error || "Login after registration failed");
            localStorage.setItem("token", loginData.token);
            setUser(loginData.user);
            setLoading(false);
            navigate("/dashboard");
        } catch (err) {
            setLoading(false);
            alert(err.message);
        }
    };

    const handleLogin = () => {
        navigate("/");
    };

    return (
        <div className="login-bg" style={{ paddingLeft: 220 }}>
            <div className="bubble-bg">
                <span className="bubble" />
                <span className="bubble" />
                <span className="bubble" />
                <span className="bubble" />
                <span className="bubble" />
                <span className="bubble" />
                <span className="bubble" />
                <span className="bubble" />
                <span className="bubble" />
                <span className="bubble" />
            </div>
            <main className="login-main">
                <div className="login-card">
                    {/* Decorative images inside the card */}
                    <div className="card-animated-bg">
                        <span className="card-bubble card-bubble1" />
                        <span className="card-bubble card-bubble2" />
                        <span className="card-bubble card-bubble3" />
                        <span className="card-bubble card-bubble4" />
                    </div>
                    <div className="login-left">
                        <div className="welcome-header">
                            <span className="wave-hand" role="img" aria-label="waving hand">👋</span>
                            <span className="welcome-text">Create Account!</span>
                            <span className="namaste-man" title="Namaste">
                                {/* SVG illustration of a man with namaste gesture */}
                                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <ellipse cx="32" cy="32" rx="32" ry="32" fill="#F3F4F6" />
                                    <ellipse cx="32" cy="25" rx="10" ry="12" fill="#FCD7B6" />
                                    <ellipse cx="32" cy="44" rx="13" ry="8" fill="#6366F1" />
                                    <rect x="28" y="28" width="8" height="14" rx="4" fill="#FCD7B6" />
                                    <rect x="24" y="38" width="4" height="10" rx="2" fill="#FCD7B6" />
                                    <rect x="36" y="38" width="4" height="10" rx="2" fill="#FCD7B6" />
                                    <rect x="30" y="36" width="4" height="12" rx="2" fill="#FCD7B6" />
                                    <ellipse cx="32" cy="23" rx="2.5" ry="2" fill="#222" />
                                    <ellipse cx="28" cy="24" rx="1" ry="1.2" fill="#222" />
                                    <ellipse cx="36" cy="24" rx="1" ry="1.2" fill="#222" />
                                    <path d="M30 28 Q32 30 34 28" stroke="#EABF8A" strokeWidth="1.2" fill="none" />
                                    <path d="M32 38 L32 48" stroke="#EABF8A" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M30 44 Q32 46 34 44" stroke="#EABF8A" strokeWidth="1.2" fill="none" />
                                </svg>
                            </span>
                        </div>
                        <div className="login-logo">workFlow</div>
                        <form className="login-form" onSubmit={handleSignUp}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />

                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />

                            <label htmlFor="confirmPassword">Confirm password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                placeholder="Repeat your password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                required
                            />

                            <div className="login-role">
                                <span>Role</span>
                                <label>
                                    <input
                                        type="radio"
                                        name="role"
                                        value="admin"
                                        checked={role === "admin"}
                                        onChange={() => setRole("admin")}
                                    /> Admin
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="role"
                                        value="intern"
                                        checked={role === "intern"}
                                        onChange={() => setRole("intern")}
                                    /> Intern
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="role"
                                        value="user"
                                        checked={role === "user"}
                                        onChange={() => setRole("user")}
                                    /> User
                                </label>
                            </div>

                            <div className="login-remember">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={termsAccepted}
                                        onChange={e => setTermsAccepted(e.target.checked)}
                                    /> Accept terms and condition
                                </label>
                                <div className="terms-text">
                                    You agree to our Terms of Service and Privacy Policy.
                                </div>
                            </div>

                            <button type="submit" className="login-btn" disabled={loading}>
                                {loading ? "Signing up..." : "Signup with Email"}
                            </button>
                        </form>
                        <div className="login-plant left-plant" />
                    </div>
                    <div className="login-divider" />
                    <div className="login-right">
                        <div className="signup-section">
                            <span>already have an account?</span>
                            <button className="signup-btn" onClick={handleLogin}>Login</button>
                        </div>
                        <div className="login-plant right-plant" />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SignUp; 