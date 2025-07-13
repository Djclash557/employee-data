import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

export default function EmployeeManager() {
    const [employees, setEmployees] = useState([]);
    const [form, setForm] = useState({ name: "", email: "", position: "" });
    const [loading, setLoading] = useState(false);

    // Fetch employees
    useEffect(() => {
        const fetchEmployees = async () => {
            setLoading(true);
            const auth = getAuth();
            const user = auth.currentUser;
            if (!user) return;
            const token = await user.getIdToken();
            const res = await fetch("http://localhost:5000/api/employees", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            setEmployees(data);
            setLoading(false);
        };
        fetchEmployees();
    }, []);

    // Add employee
    const handleAdd = async (e) => {
        e.preventDefault();
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) return;
        const token = await user.getIdToken();
        const res = await fetch("http://localhost:5000/api/employees", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(form),
        });
        if (res.ok) {
            const newEmp = await res.json();
            setEmployees((prev) => [...prev, newEmp]);
            setForm({ name: "", email: "", position: "" });
        } else {
            alert("Failed to add employee");
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "2rem auto" }}>
            <h2>Employees</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {employees.map((emp) => (
                        <li key={emp._id}>
                            <strong>{emp.name}</strong> - {emp.position} <br />
                            <small>{emp.email}</small>
                        </li>
                    ))}
                </ul>
            )}
            <h3>Add Employee</h3>
            <form onSubmit={handleAdd}>
                <input
                    type="text"
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                /><br />
                <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                /><br />
                <input
                    type="text"
                    placeholder="Position"
                    value={form.position}
                    onChange={(e) => setForm({ ...form, position: e.target.value })}
                    required
                /><br />
                <button type="submit">Add Employee</button>
            </form>
        </div>
    );
} 