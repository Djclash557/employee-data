import React, { useState, useEffect } from 'react';
import './Attendance.css';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';

const years = Array.from({ length: 50 }, (_, i) => 2000 + i); // 2000-2049
const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const Attendance = () => {
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [attendance, setAttendance] = useState({});
    const today = dayjs().format('YYYY-MM-DD');

    // Fetch attendance from backend
    useEffect(() => {
        const fetchAttendance = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;
            const month = selectedDate.month() + 1;
            const year = selectedDate.year();
            const res = await fetch(`http://localhost:5000/api/attendance?month=${month}&year=${year}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            const attMap = {};
            data.forEach(a => {
                const dateStr = dayjs(a.date).format('YYYY-MM-DD');
                attMap[dateStr] = {
                    in: a.checkIn ? dayjs(a.checkIn).format('HH:mm') : undefined,
                    out: a.checkOut ? dayjs(a.checkOut).format('HH:mm') : undefined
                };
            });
            setAttendance(attMap);
        };
        fetchAttendance();
    }, [selectedDate.month(), selectedDate.year()]);

    const handleCheckIn = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;
        const date = selectedDate.format('YYYY-MM-DD');
        const res = await fetch('http://localhost:5000/api/attendance/checkin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ date })
        });
        if (res.ok) {
            setAttendance(prev => ({
                ...prev,
                [date]: {
                    ...prev[date],
                    in: dayjs().format('HH:mm')
                }
            }));
        } else {
            alert('Check-in failed');
        }
    };

    const handleCheckOut = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;
        const date = selectedDate.format('YYYY-MM-DD');
        const res = await fetch('http://localhost:5000/api/attendance/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ date })
        });
        if (res.ok) {
            setAttendance(prev => ({
                ...prev,
                [date]: {
                    ...prev[date],
                    out: dayjs().format('HH:mm')
                }
            }));
        } else {
            alert('Check-out failed');
        }
    };

    // Handlers for dropdowns
    const handleYearChange = (e) => {
        setSelectedDate(selectedDate.year(Number(e.target.value)));
    };
    const handleMonthChange = (e) => {
        setSelectedDate(selectedDate.month(Number(e.target.value)));
    };

    return (
        <div className="attendance-bg login-bg" style={{ paddingLeft: 220 }}>
            <main className="attendance-main login-main">
                <div className="attendance-card login-card">
                    <div className="attendance-header">
                        <h2>Attendance Tracker</h2>
                    </div>
                    <div className="attendance-content">
                        <div style={{ display: 'flex', gap: 8, marginBottom: 8, justifyContent: 'center' }}>
                            <select
                                value={selectedDate.month()}
                                onChange={handleMonthChange}
                                style={{ fontSize: '1.1rem', fontWeight: 600, borderRadius: 6, padding: '4px 12px', border: '1.5px solid #6366f1', color: '#4338ca', background: '#e0e7ff' }}
                            >
                                {months.map((m, i) => (
                                    <option key={m} value={i}>{m}</option>
                                ))}
                            </select>
                            <select
                                value={selectedDate.year()}
                                onChange={handleYearChange}
                                style={{ fontSize: '1.1rem', fontWeight: 600, borderRadius: 6, padding: '4px 12px', border: '1.5px solid #6366f1', color: '#4338ca', background: '#e0e7ff' }}
                            >
                                {years.map(y => (
                                    <option key={y} value={y}>{y}</option>
                                ))}
                            </select>
                        </div>
                        <div className="attendance-calendar">
                            <DateCalendar value={selectedDate} onChange={setSelectedDate} />
                        </div>
                        <div className="attendance-actions">
                            <div className="attendance-date-label">{selectedDate.format('dddd, MMM D, YYYY')}</div>
                            <div className="attendance-times">
                                <span>Check-in: <b>{attendance[selectedDate.format('YYYY-MM-DD')]?.in || '--:--'}</b></span>
                                <span>Check-out: <b>{attendance[selectedDate.format('YYYY-MM-DD')]?.out || '--:--'}</b></span>
                            </div>
                            <div className="attendance-btn-row">
                                <button
                                    className="attendance-btn in"
                                    onClick={handleCheckIn}
                                    disabled={!!attendance[selectedDate.format('YYYY-MM-DD')]?.in}
                                >
                                    Check In
                                </button>
                                <button
                                    className="attendance-btn out"
                                    onClick={handleCheckOut}
                                    disabled={!attendance[selectedDate.format('YYYY-MM-DD')]?.in || !!attendance[selectedDate.format('YYYY-MM-DD')]?.out}
                                >
                                    Check Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Attendance;