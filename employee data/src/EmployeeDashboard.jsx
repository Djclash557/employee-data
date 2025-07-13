import React, { useState, useContext, useRef, useEffect } from "react";
import "./EmployeeDashboard.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from "recharts";
// Remove react-calendar import
// import Calendar from "react-calendar";
// import 'react-calendar/dist/Calendar.css';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { UserContext } from "./UserContext";
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";
import GlowingGrid from './components/GlowingGrid';
import ScrollAnimations from './components/ScrollAnimations';
import { API_BASE_URL } from "./config";

const baseActivityData = [
    { name: 'Jan', value: 18 },
    { name: 'Feb', value: 22 },
    { name: 'Mar', value: 15 },
    { name: 'Apr', value: 20 },
    { name: 'May', value: 16 },
    { name: 'Jun', value: 19 },
    { name: 'Jul', value: 21 },
    { name: 'Aug', value: 25, highlight: true },
    { name: 'Sep', value: 25 },
    { name: 'Oct', value: 23 },
    { name: 'Nov', value: 17 },
    { name: 'Dec', value: 15 },
];

function getRandomActivityData(date) {
    // Generate random data for the selected date (for demo)
    const month = date.month();
    return baseActivityData.map((d, i) => ({
        ...d,
        value: i === month ? Math.floor(Math.random() * 40) + 10 : Math.floor(Math.random() * 25) + 10,
        highlight: i === month
    }));
}

const years = Array.from({ length: 50 }, (_, i) => 2000 + i); // 2000-2049
const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const EmployeeDashboard = () => {
    const token = localStorage.getItem('token');
    const [date, setDate] = useState(dayjs('2025-06-16'));
    const [activityData, setActivityData] = useState(baseActivityData);
    const [pop, setPop] = useState(false);
    const [year, setYear] = useState(date.year());
    const [month, setMonth] = useState(date.month());
    const { user } = useContext(UserContext);
    const activityRef = useRef();
    const navigate = useNavigate();
    const [employeeCount, setEmployeeCount] = useState(0);
    const [employeeCountPrev, setEmployeeCountPrev] = useState(0);
    const [activeTaskCount, setActiveTaskCount] = useState(0);
    const [activeTaskCountPrev, setActiveTaskCountPrev] = useState(0);
    const [internCount, setInternCount] = useState(0);
    const [internCountPrev, setInternCountPrev] = useState(0);

    // Remove getPercentChange helper

    const handleDateChange = (newDate) => {
        setDate(newDate);
        setYear(newDate.year());
        setMonth(newDate.month());
        setActivityData(getRandomActivityData(newDate));
        setPop(true);
        setTimeout(() => setPop(false), 400);
    };

    const handleYearChange = (e) => {
        const newYear = Number(e.target.value);
        setYear(newYear);
        // Keep the same month/day, just change the year
        const newDate = date.year(newYear);
        setDate(newDate);
        setActivityData(getRandomActivityData(newDate));
        setPop(true);
        setTimeout(() => setPop(false), 400);
    };

    const handleMonthChange = (e) => {
        const newMonth = Number(e.target.value);
        setMonth(newMonth);
        const newDate = date.month(newMonth);
        setDate(newDate);
        setActivityData(getRandomActivityData(newDate));
        setPop(true);
        setTimeout(() => setPop(false), 400);
    };

    useEffect(() => {
        const fetchDashboardData = () => {
            const now = dayjs();
            const startOfThisMonth = now.startOf('month').format('YYYY-MM-DD');
            const startOfLastMonth = now.subtract(1, 'month').startOf('month').format('YYYY-MM-DD');
            const endOfLastMonth = now.startOf('month').format('YYYY-MM-DD');
            // Employees: all time
            fetch(`${API_BASE_URL}/api/employees`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(res => res.json())
                .then(data => {
                    setEmployeeCount(data.length);
                    setInternCount(data.filter(e => e.role && e.role.toLowerCase() === "intern").length);
                });
            // Employees: last month (optional, you may want to keep this for trend)
            fetch(`${API_BASE_URL}/api/employees?createdAfter=${startOfLastMonth}&createdBefore=${endOfLastMonth}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(res => res.json())
                .then(data => setEmployeeCountPrev(data.length));
            // Tasks: all active
            fetch(`${API_BASE_URL}/api/tasks?status=active`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(res => res.json())
                .then(data => setActiveTaskCount(data.length));
            // Tasks: last week
            const startOfLastWeek = now.subtract(1, 'week').startOf('week').format('YYYY-MM-DD');
            const endOfLastWeek = now.startOf('week').format('YYYY-MM-DD');
            fetch(`${API_BASE_URL}/api/tasks?createdAfter=${startOfLastWeek}&createdBefore=${endOfLastWeek}&status=active`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(res => res.json())
                .then(data => setActiveTaskCountPrev(data.length));
            // Interns: last month
            fetch(`${API_BASE_URL}/api/employees?createdAfter=${startOfLastMonth}&createdBefore=${endOfLastMonth}&role=intern`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(res => res.json())
                .then(data => setInternCountPrev(data.length));
        };
        fetchDashboardData();
        const interval = setInterval(fetchDashboardData, 5000); // every 5 seconds
        return () => clearInterval(interval);
    }, [token]);

    return (
        <div className="login-bg dashboard-bg" style={{ paddingLeft: 220 }}>
            <GlowingGrid variant="dots" color="green" intensity="low" speed="slow" opacity={0.2}>
                <main className="login-main dashboard-main">
                    <div className="login-card dashboard-card">
                        <div className="card-animated-bg">
                            <span className="card-bubble card-bubble1" />
                            <span className="card-bubble card-bubble2" />
                            <span className="card-bubble card-bubble3" />
                            <span className="card-bubble card-bubble4" />
                        </div>
                        <div className="dashboard-header" style={{ justifyContent: 'space-between' }}>
                            <ScrollAnimations effect="slideUp" delay={0.2}>
                                <div className="dashboard-welcome">
                                    {user && (
                                        <>
                                            <span className="dashboard-welcome-text">Welcome, {user.name || user.email}!</span>
                                            {user.email && <span className="dashboard-user-email">({user.email})</span>}
                                            {user.photoURL && <img src={user.photoURL} alt="User" className="dashboard-user-photo" />}
                                        </>
                                    )}
                                </div>
                            </ScrollAnimations>
                            <ScrollAnimations effect="slideLeft" delay={0.4}>
                                <button className="employee-list-nav-btn" onClick={() => navigate('/employees')}>
                                    Employee List
                                </button>
                            </ScrollAnimations>
                        </div>
                        <div className="dashboard-summary-row">
                            <ScrollAnimations effect="card" delay={0.2}>
                                <div className="dashboard-summary-card">
                                    <div className="summary-title">Total Employees</div>
                                    <div className="summary-value">{employeeCount}</div>
                                    {/* Removed trend for total employees */}
                                    <div className="summary-icon"><span role="img" aria-label="employees">👥</span></div>
                                </div>
                            </ScrollAnimations>
                            <ScrollAnimations effect="card" delay={0.3}>
                                <div className="dashboard-summary-card">
                                    <div className="summary-title">Active Tasks</div>
                                    <div className="summary-value">{activeTaskCount}</div>
                                    {/* Removed trend for active tasks */}
                                    <div className="summary-icon"><span role="img" aria-label="tasks">📝</span></div>
                                </div>
                            </ScrollAnimations>
                            <ScrollAnimations effect="card" delay={0.4}>
                                <div className="dashboard-summary-card">
                                    <div className="summary-title">Interns</div>
                                    <div className="summary-value">{internCount}</div>
                                    {/* Removed trend for interns */}
                                    <div className="summary-icon"><span role="img" aria-label="interns">🎓</span></div>
                                </div>
                            </ScrollAnimations>
                        </div>
                        <div className="dashboard-content-row">
                            <ScrollAnimations effect="slideUp" delay={0.5}>
                                <div className={`dashboard-activity${pop ? ' pop' : ''}`} ref={activityRef}>
                                    <div className="dashboard-section-title">Employee Activity</div>
                                    <div className="dashboard-section-subtitle">Quarterly</div>
                                    <ResponsiveContainer width="100%" height={220}>
                                        <BarChart data={activityData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                                            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                                            <YAxis hide />
                                            <Tooltip />
                                            <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#a5b4fc">
                                                <LabelList
                                                    dataKey="value"
                                                    position="top"
                                                    content={({ x, y, value, index }) =>
                                                        activityData[index].highlight ? (
                                                            <g>
                                                                <rect
                                                                    x={x - 28}
                                                                    y={y - 38}
                                                                    width={72}
                                                                    height={34}
                                                                    rx={17}
                                                                    fill="url(#impactGradient)"
                                                                    filter="url(#impactShadow)"
                                                                />
                                                                <text
                                                                    x={x + 8}
                                                                    y={y - 16}
                                                                    className="recharts-impact-label"
                                                                    textAnchor="middle"
                                                                    alignmentBaseline="middle"
                                                                    style={{ fontSize: '1.35rem', fontWeight: 900, stroke: '#222', strokeWidth: 0.7 }}
                                                                >↑ {activityData[index].value}%</text>
                                                                <defs>
                                                                    <linearGradient id="impactGradient" x1="0" y1="0" x2="1" y2="1">
                                                                        <stop offset="0%" stopColor="#6366f1" />
                                                                        <stop offset="100%" stopColor="#22c55e" />
                                                                    </linearGradient>
                                                                    <filter id="impactShadow" x="-20%" y="-20%" width="140%" height="140%">
                                                                        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#6366f1" floodOpacity="0.3" />
                                                                    </filter>
                                                                </defs>
                                                            </g>
                                                        ) : null
                                                    }
                                                />
                                            </Bar>
                                            <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#6366f1" isAnimationActive={true}
                                                {
                                                ...{
                                                    data: activityData.map(d => d.highlight ? { ...d, fill: "#6366f1" } : d)
                                                }
                                                }
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </ScrollAnimations>
                            <ScrollAnimations effect="slideUp" delay={0.6}>
                                <div className="dashboard-attendance">
                                    <div className="dashboard-section-title">Attendance Overview</div>
                                    <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                                        <select
                                            value={month}
                                            onChange={handleMonthChange}
                                            style={{ fontSize: '1.1rem', fontWeight: 600, borderRadius: 6, padding: '4px 12px', border: '1.5px solid #6366f1', color: '#4338ca', background: '#e0e7ff' }}
                                        >
                                            {months.map((m, i) => (
                                                <option key={m} value={i}>{m}</option>
                                            ))}
                                        </select>
                                        <select
                                            value={year}
                                            onChange={handleYearChange}
                                            style={{ fontSize: '1.1rem', fontWeight: 600, borderRadius: 6, padding: '4px 12px', border: '1.5px solid #6366f1', color: '#4338ca', background: '#e0e7ff' }}
                                        >
                                            {years.map(y => (
                                                <option key={y} value={y}>{y}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <DateCalendar
                                        value={date}
                                        onChange={handleDateChange}
                                        sx={{
                                            bgcolor: '#fff',
                                            borderRadius: 2,
                                            boxShadow: 1,
                                            p: 1,
                                            width: '100%',
                                            mx: 'auto',
                                        }}
                                    />
                                </div>
                            </ScrollAnimations>
                        </div>
                    </div>
                </main>
            </GlowingGrid>
        </div>
    );
};

export default EmployeeDashboard;