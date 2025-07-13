import React, { useState, useEffect, useContext } from 'react';
import './Tasks.css';
import { UserContext } from './UserContext';
import GlowingGrid from './components/GlowingGrid';
import ScrollAnimations from './components/ScrollAnimations';

const Tasks = () => {
    const { user, loading } = useContext(UserContext);
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [editing, setEditing] = useState(null);
    const [editValue, setEditValue] = useState('');
    const [lastAddedId, setLastAddedId] = useState(null);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    // Fetch tasks from backend
    useEffect(() => {
        if (loading || !user) return;
        const fetchTasks = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/tasks?userId=${user._id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (!res.ok) throw new Error('Failed to fetch tasks');
                const data = await res.json();
                setTasks(data);
                setError(null);
            } catch (err) {
                setError('Could not load tasks. Please check your connection.');
                setTasks([]);
            }
        };
        fetchTasks();
    }, [user, token, loading]);

    const handleAdd = async () => {
        if (newTask.trim() && user) {
            const res = await fetch('http://localhost:5000/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ title: newTask, userId: user._id, status: 'active' })
            });
            if (res.ok) {
                const added = await res.json();
                setTasks(prev => [added, ...prev]);
                setNewTask('');
                setLastAddedId(added._id);
                setTimeout(() => setLastAddedId(null), 2000);
            }
        }
    };

    const handleDelete = async (id) => {
        const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` }
        });
        if (res.status === 204) {
            setTasks(tasks.filter(t => t._id !== id));
        }
    };

    const handleToggle = async (id) => {
        const task = tasks.find(t => t._id === id);
        if (!task) return;
        const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ ...task, status: task.status === 'done' ? 'pending' : 'done' })
        });
        if (res.ok) {
            const updated = await res.json();
            setTasks(tasks.map(t => t._id === id ? updated : t));
        }
    };

    const handleEdit = (id, title) => { setEditing(id); setEditValue(title); };
    const handleEditSave = async (id) => {
        const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ title: editValue })
        });
        if (res.ok) {
            const updated = await res.json();
            setTasks(tasks.map(t => t._id === id ? updated : t));
            setEditing(null);
            setEditValue('');
        }
    };

    const doneCount = tasks.filter(t => t.status === 'done').length;

    if (loading) {
        return <div style={{ textAlign: 'center', marginTop: 60, fontSize: 20, color: '#6366F1' }}>Loading...</div>;
    }

    return (
        <div className="tasks-bg login-bg" style={{ paddingLeft: 220 }}>
            <GlowingGrid variant="lines" color="purple" intensity="medium" speed="normal" opacity={0.25}>
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
                <main className="tasks-main login-main">
                    <div className="tasks-card login-card">
                        <ScrollAnimations effect="slideUp" delay={0.2}>
                            <div className="tasks-header">
                                <h2>My Tasks</h2>
                                <div className="tasks-summary">
                                    <span>Done: <b>{doneCount}</b></span>
                                    <span>Pending: <b>{tasks.length - doneCount}</b></span>
                                </div>
                            </div>
                        </ScrollAnimations>
                        {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
                        <ScrollAnimations effect="slideUp" delay={0.3}>
                            <div className="tasks-add-row">
                                <input
                                    className="tasks-input"
                                    type="text"
                                    placeholder="Add a new task..."
                                    value={newTask}
                                    onChange={e => setNewTask(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && handleAdd()}
                                />
                                <button className="tasks-add-btn" onClick={handleAdd}>Add</button>
                            </div>
                        </ScrollAnimations>
                        <ul className="tasks-list">
                            {tasks.map(task => (
                                <li key={task._id} className={
                                    (task.status === 'done' ? 'done ' : '') +
                                    (editing === task._id ? 'editing ' : '') +
                                    (lastAddedId === task._id ? 'new-task' : '')
                                }>
                                    <input type="checkbox" checked={task.status === 'done'} onChange={() => handleToggle(task._id)} />
                                    {editing === task._id ? (
                                        <>
                                            <input
                                                className="tasks-edit-input"
                                                value={editValue}
                                                onChange={e => setEditValue(e.target.value)}
                                                onKeyDown={e => e.key === 'Enter' && handleEditSave(task._id)}
                                            />
                                            <button className="tasks-save-btn" onClick={() => handleEditSave(task._id)}>Save</button>
                                        </>
                                    ) : (
                                        <span className="tasks-title" onDoubleClick={() => handleEdit(task._id, task.title)}>{task.title}</span>
                                    )}
                                    <button className="tasks-delete-btn" onClick={() => handleDelete(task._id)}>Delete</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </main>
            </GlowingGrid>
        </div>
    );
};

export default Tasks; 