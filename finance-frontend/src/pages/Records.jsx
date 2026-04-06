import React, { useState, useEffect } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { Plus, Trash2, Edit } from 'lucide-react';

const Records = () => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();


    const [showForm, setShowForm] = useState(false);
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('EXPENSE');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [notes, setNotes] = useState('');

    const fetchRecords = async () => {
        try {
            const res = await api.get('/records');
            setRecords(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await api.post('/records', { amount: parseFloat(amount), type, category, date, notes });
            setShowForm(false);
            setAmount(''); setCategory(''); setDate(''); setNotes('');
            fetchRecords();
        } catch (err) {
            alert('Failed to create record. Note: Only Admin can create records.');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this record?')) return;
        try {
            await api.delete(`/records/${id}`);
            fetchRecords();
        } catch (err) {
            alert('Failed to delete.');
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Financial Records</h1>
                {user.role === 'ADMIN' && (
                    <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                        <Plus size={18} /> Add Record
                    </button>
                )}
            </div>

            {showForm && (
                <div className="card" style={{ marginBottom: '2rem' }}>
                    <h3>Add New Record</h3>
                    <form onSubmit={handleCreate} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                        <div className="form-group">
                            <label className="form-label">Amount</label>
                            <input type="number" step="0.01" required className="form-input" value={amount} onChange={(e) => setAmount(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Type</label>
                            <select className="form-input" value={type} onChange={(e) => setType(e.target.value)}>
                                <option value="EXPENSE">Expense</option>
                                <option value="INCOME">Income</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Category</label>
                            <input type="text" required className="form-input" value={category} onChange={(e) => setCategory(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Date</label>
                            <input type="date" required className="form-input" value={date} onChange={(e) => setDate(e.target.value)} />
                        </div>
                        <div className="form-group" style={{ gridColumn: 'span 2' }}>
                            <label className="form-label">Notes</label>
                            <input type="text" className="form-input" value={notes} onChange={(e) => setNotes(e.target.value)} />
                        </div>
                        <div style={{ gridColumn: 'span 2', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                            <button type="button" className="btn" onClick={() => setShowForm(false)} style={{ background: 'var(--surface-hover)', color: 'white' }}>Cancel</button>
                            <button type="submit" className="btn btn-primary">Save Record</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="table-container">
                {loading ? <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div> : (
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Category</th>
                                <th>Notes</th>
                                <th>Type</th>
                                <th style={{ textAlign: 'right' }}>Amount</th>
                                {user.role === 'ADMIN' && <th style={{ textAlign: 'right' }}>Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {records.length > 0 ? records.map(req => (
                                <tr key={req.id}>
                                    <td>{req.date}</td>
                                    <td>{req.category}</td>
                                    <td style={{ color: 'var(--text-muted)' }}>{req.notes || '-'}</td>
                                    <td>
                                        <span className={`tag ${req.type === 'INCOME' ? 'income' : 'expense'}`}>
                                            {req.type}
                                        </span>
                                    </td>
                                    <td style={{ textAlign: 'right', fontWeight: 'bold' }}>
                                        ${req.amount?.toLocaleString()}
                                    </td>
                                    {user.role === 'ADMIN' && (
                                        <td style={{ textAlign: 'right' }}>
                                            <button onClick={() => handleDelete(req.id)} style={{ background: 'transparent', border: 'none', color: '#FB7185', cursor: 'pointer', padding: '0.25rem' }}>
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            )) : <tr><td colSpan="6" style={{ textAlign: 'center' }}>No records found.</td></tr>}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Records;
