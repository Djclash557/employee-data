import React from 'react';
import './Settings.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './UserContext';

const Settings = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const handleLogout = () => {
        setUser(null);
        navigate('/');
    };

    return (
        <div className="settings-bg login-bg" style={{ paddingLeft: 220 }}>
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
            <main className="settings-main login-main">
                <div className="settings-card login-card">
                    <div className="settings-header">
                        <h2>Settings</h2>
                        <p className="settings-desc">Manage your account and preferences below.</p>
                    </div>
                    <div className="settings-section">
                        <button className="settings-logout-btn" onClick={handleLogout}>Logout</button>
                    </div>
                    <div className="settings-section">
                        <h3>Other Features</h3>
                        <ul className="settings-features">
                            <li>🔒 Change Password (coming soon)</li>
                            <li>🎨 Theme Switcher (coming soon)</li>
                            <li>🔔 Notification Preferences (coming soon)</li>
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Settings; 