import React, { useState, useContext } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(false);
    const [showForgot, setShowForgot] = useState(false);
    const [forgotEmail, setForgotEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useContext(UserContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Login failed");
            login(data.user, data.token);
            setLoading(false);
            navigate("/dashboard");
        } catch (err) {
            setLoading(false);
            alert(err.message);
        }
    };

    const handleForgot = (e) => {
        e.preventDefault();
        setShowForgot(true);
    };

    const handleForgotSubmit = () => {
        alert(`Password for ${forgotEmail} has been reset to: ${newPassword}`);
        setShowForgot(false);
        setForgotEmail("");
        setNewPassword("");
    };

    const handleSignUp = () => {
        navigate("/signup");
    };

    const handleGoogle = () => {
        alert("Google login is disabled.");
    };

    const handleFacebook = () => {
        alert("Facebook login clicked! (Implement Facebook OAuth)");
    };

    return (
        <div className="login-bg" style={{ paddingLeft: 220 }}>
            {/* Decorative images at page corners */}
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
                            <span className="welcome-text">Welcome!</span>
                            <span className="namaste-man" title="Namaste">
                                {/* Simple SVG illustration of a man with namaste gesture */}
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
                        <form className="login-form" onSubmit={handleLogin}>
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
                                <label><input type="checkbox" /> Remember me</label>
                            </div>

                            <button type="submit" className="login-btn" disabled={loading}>
                                {loading ? "Logging in..." : "Login"}
                            </button>
                            <a href="#" className="login-forgot" onClick={handleForgot}>forgot password?</a>
                        </form>
                        <div className="login-plant left-plant" />
                    </div>
                    <div className="login-divider" />
                    <div className="login-right">
                        <div className="signup-section">
                            <span>don't have an account?</span>
                            <button className="signup-btn" onClick={handleSignUp}>
                                <span className="waving-tree" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <ellipse cx="12" cy="10" rx="7" ry="6" fill="#4CAF50" />
                                        <ellipse cx="8" cy="13" rx="4" ry="3" fill="#388E3C" />
                                        <ellipse cx="16" cy="13" rx="4" ry="3" fill="#388E3C" />
                                        <rect x="10.5" y="14" width="3" height="6" rx="1.5" fill="#8D6E63" />
                                    </svg>
                                </span>
                                Sign Up with Email
                            </button>
                            <div className="signup-or">Or,</div>
                            <div className="signup-social">
                                <button className="social-btn google" aria-label="Sign in with Google" onClick={handleGoogle}>G</button>
                            </div>
                        </div>
                        <div className="login-plant right-plant" />
                    </div>
                </div>
            </main>
            {showForgot && (
                <div className="employee-add-modal">
                    <div className="employee-add-content">
                        <h3>Reset Password</h3>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={forgotEmail}
                            onChange={e => setForgotEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                        />
                        <div className="employee-add-actions">
                            <button onClick={handleForgotSubmit}>Reset</button>
                            <button onClick={() => setShowForgot(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login; 