import React, { useState, useEffect } from "react";
import "./EmployeeList.css";
import employeeIllustration from './assets/image11.png';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("Newest");
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [newEmployee, setNewEmployee] = useState({ name: "", email: "", role: "", department: "", status: "Active" });
    const [loading, setLoading] = useState(false);

    // Fetch employees from backend
    useEffect(() => {
        const fetchEmployees = async () => {
            setLoading(true);
            const token = localStorage.getItem("token");
            if (!token) return;
            const res = await fetch("http://localhost:5000/api/employees", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            setEmployees(data);
            setLoading(false);
        };
        fetchEmployees();
    }, []);

    // Delete employee
    const handleDelete = async (email) => {
        const emp = employees.find(e => e.email === email);
        if (!emp || !emp._id) return;
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await fetch(`http://localhost:5000/api/employees/${emp._id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 204) {
            setEmployees(employees.filter(e => e._id !== emp._id));
        } else {
            alert("Failed to delete employee");
        }
    };

    // Add employee
    const handleAdd = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await fetch("http://localhost:5000/api/employees", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newEmployee),
        });
        if (res.ok) {
            const newEmp = await res.json();
            setEmployees([newEmp, ...employees]);
            setShowAdd(false);
            setNewEmployee({ name: "", email: "", role: "", department: "", status: "Active" });
        } else {
            alert("Failed to add employee");
        }
    };

    // Edit employee
    const handleEdit = (index) => {
        setEditIndex(index);
        setNewEmployee({ ...employees[index] });
        setShowEdit(true);
    };

    const handleEditSave = async () => {
        const emp = employees[editIndex];
        if (!emp || !emp._id) return;
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await fetch(`http://localhost:5000/api/employees/${emp._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newEmployee),
        });
        if (res.ok) {
            const updated = await res.json();
            setEmployees(employees.map((e, i) => i === editIndex ? updated : e));
            setShowEdit(false);
            setEditIndex(null);
            setNewEmployee({ name: "", email: "", role: "", department: "", status: "Active" });
        } else {
            alert("Failed to update employee");
        }
    };

    const toCSV = (data) => {
        if (!data.length) return "";
        const header = Object.keys(data[0]).join(",");
        const rows = data.map(e => Object.values(e).join(","));
        return [header, ...rows].join("\n");
    };

    const handleExport = () => {
        const csv = toCSV(employees);
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "employees.csv";
        a.click();
        URL.revokeObjectURL(url);
    };

    const filteredEmployees = employees.filter(e =>
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.email.toLowerCase().includes(search.toLowerCase()) ||
        (e.role || "").toLowerCase().includes(search.toLowerCase()) ||
        (e.department || "").toLowerCase().includes(search.toLowerCase())
    );

    // Sorting logic
    const sortedEmployees = [...filteredEmployees];
    if (sort === "Name (A-Z)") sortedEmployees.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === "Name (Z-A)") sortedEmployees.sort((a, b) => b.name.localeCompare(a.name));
    else if (sort === "Oldest") sortedEmployees.reverse();
    // Newest is default (latest added first)

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
                <div className="login-card employee-list-card">
                    <div className="employee-list-header">
                        <span className="employee-list-title">Employees</span>
                        <div className="employee-list-actions">
                            <button className="add-employee-btn" onClick={() => setShowAdd(true)}>
                                <span role="img" aria-label="add">👤➕</span> Add an employee
                            </button>
                            <input
                                className="employee-search"
                                type="text"
                                placeholder="Search employees"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                            <select className="employee-sort" value={sort} onChange={e => setSort(e.target.value)}>
                                <option>Newest</option>
                                <option>Oldest</option>
                                <option>Name (A-Z)</option>
                                <option>Name (Z-A)</option>
                            </select>
                            <button className="employee-export-btn" onClick={handleExport}>Export</button>
                        </div>
                    </div>
                    <div className="employee-table-wrapper">
                        <table className="employee-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Department</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedEmployees.map((e, i) => (
                                    <tr key={e._id || i}>
                                        <td>{e.name}</td>
                                        <td>{e.email}</td>
                                        <td>{e.role}</td>
                                        <td>{e.department}</td>
                                        <td>
                                            <span className={`status-badge ${e.status === "Active" ? "active" : "inactive"}`}>{e.status}</span>
                                        </td>
                                        <td>
                                            <button className="employee-action-btn edit" title="Edit" onClick={() => handleEdit(i)}><span role="img" aria-label="edit">✏️</span></button>
                                            <button className="employee-action-btn delete special-delete" title="Delete" onClick={() => handleDelete(e.email)}><span role="img" aria-label="delete">🗑️</span></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {showAdd && (
                        <div className="employee-add-modal">
                            <div className="employee-add-content">
                                <h3>Add Employee</h3>
                                <input placeholder="Name" value={newEmployee.name} onChange={e => setNewEmployee({ ...newEmployee, name: e.target.value })} />
                                <input placeholder="Email" value={newEmployee.email} onChange={e => setNewEmployee({ ...newEmployee, email: e.target.value })} />
                                <input placeholder="Role" value={newEmployee.role} onChange={e => setNewEmployee({ ...newEmployee, role: e.target.value })} />
                                <input placeholder="Department" value={newEmployee.department} onChange={e => setNewEmployee({ ...newEmployee, department: e.target.value })} />
                                <select value={newEmployee.status} onChange={e => setNewEmployee({ ...newEmployee, status: e.target.value })}>
                                    <option>Active</option>
                                    <option>Inactive</option>
                                </select>
                                <div className="employee-add-actions">
                                    <button onClick={handleAdd}>Add</button>
                                    <button onClick={() => setShowAdd(false)}>Cancel</button>
                                </div>
                                <div className="employee-illustration-wrapper">
                                    <img
                                        src={employeeIllustration}
                                        alt="Employee Illustration"
                                        className="employee-illustration-img"
                                        style={{ width: '120px', margin: '32px auto 0', display: 'block' }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    {showEdit && (
                        <div className="employee-add-modal">
                            <div className="employee-add-content">
                                <h3>Edit Employee</h3>
                                <input placeholder="Name" value={newEmployee.name} onChange={e => setNewEmployee({ ...newEmployee, name: e.target.value })} />
                                <input placeholder="Email" value={newEmployee.email} onChange={e => setNewEmployee({ ...newEmployee, email: e.target.value })} />
                                <input placeholder="Role" value={newEmployee.role} onChange={e => setNewEmployee({ ...newEmployee, role: e.target.value })} />
                                <input placeholder="Department" value={newEmployee.department} onChange={e => setNewEmployee({ ...newEmployee, department: e.target.value })} />
                                <select value={newEmployee.status} onChange={e => setNewEmployee({ ...newEmployee, status: e.target.value })}>
                                    <option>Active</option>
                                    <option>Inactive</option>
                                </select>
                                <div className="employee-add-actions">
                                    <button onClick={handleEditSave}>Save</button>
                                    <button onClick={() => setShowEdit(false)}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default EmployeeList; 