import React from 'react';
import './Sidebar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const navItems = [
    { to: '/dashboard', icon: '🏠', label: 'Dashboard' },
    { to: '/employees', icon: '👥', label: 'Employees' },
    { to: '/attendance', icon: '📅', label: 'Attendance' },
    { to: '/tasks', icon: '📝', label: 'Tasks' },
    { to: '/settings', icon: '⚙️', label: 'Settings' },
];

const Sidebar = ({ mobileOpen, onClose }) => {
    const [search, setSearch] = React.useState('');
    const filteredItems = navItems.filter(item =>
        item.label.toLowerCase().includes(search.toLowerCase())
    );
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 700;
    const { logout } = React.useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className={
            isMobile
                ? `sidebar sidebar-drawer${mobileOpen ? ' open' : ''}`
                : 'sidebar'
        }>
            {isMobile && (
                <button className="sidebar-close-btn" onClick={onClose} aria-label="Close sidebar">✕</button>
            )}
            <div className="sidebar-logo">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="18" cy="18" r="18" fill="#fff" fillOpacity="0.2" />
                    <path d="M10 18c4-8 12-8 16 0" stroke="#fff" strokeWidth="2" fill="none" />
                </svg>
                <span className="sidebar-title">workflow</span>
            </div>
            <div className="sidebar-search">
                <input
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <span className="search-icon">🔍</span>
            </div>
            <nav className="sidebar-nav">
                <ul>
                    {filteredItems.map(item => (
                        <li key={item.to}>
                            <NavLink to={item.to} className={({ isActive }) => isActive ? 'active' : ''} onClick={onClose}>
                                <span className="sidebar-icon">{item.icon}</span>
                                <span>{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            <button onClick={handleLogout} className="sidebar-logout-btn" style={{ margin: '20px', padding: '10px', width: '80%' }}>Logout</button>
        </div>
    );
};

export default Sidebar; 