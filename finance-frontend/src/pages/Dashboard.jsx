import React, { useState, useEffect } from 'react';
import api from '../api';
import { ArrowUpRight, ArrowDownRight, DollarSign, Activity } from 'lucide-react';

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await api.get('/dashboard/summary');
                setData(response.data);
            } catch (err) {
                console.error('Error fetching dashboard', err);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboard();
    }, []);

    if (loading) return <div>Loading dashboard parameters...</div>;
    if (!data) return <div>Failed to load data</div>;

    return (
        <div>
            <h1 style={{ marginBottom: '2rem' }}>Dashboard Overview</h1>

            <div className="dashboard-grid">
                <div className="card metric-card">
                    <div>
                        <div className="metric-label">Net Balance</div>
                        <div className="metric-value">${data.netBalance?.toLocaleString() || '0'}</div>
                    </div>
                    <div style={{ color: 'var(--primary)', background: 'rgba(79, 70, 229, 0.1)', padding: '1rem', borderRadius: '50%' }}>
                        <DollarSign size={24} />
                    </div>
                </div>

                <div className="card metric-card">
                    <div>
                        <div className="metric-label">Total Income</div>
                        <div className="metric-value" style={{ color: '#34D399' }}>${data.totalIncome?.toLocaleString() || '0'}</div>
                    </div>
                    <div style={{ color: '#34D399', background: 'rgba(52, 211, 153, 0.1)', padding: '1rem', borderRadius: '50%' }}>
                        <ArrowUpRight size={24} />
                    </div>
                </div>

                <div className="card metric-card">
                    <div>
                        <div className="metric-label">Total Expense</div>
                        <div className="metric-value" style={{ color: '#FB7185' }}>${data.totalExpense?.toLocaleString() || '0'}</div>
                    </div>
                    <div style={{ color: '#FB7185', background: 'rgba(251, 113, 133, 0.1)', padding: '1rem', borderRadius: '50%' }}>
                        <ArrowDownRight size={24} />
                    </div>
                </div>
            </div>

            <div className="dashboard-grid">
                <div className="card">
                    <h3 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Activity size={20} color="var(--primary)" /> Category Breakdown
                    </h3>
                    {data.categorySummary && Object.keys(data.categorySummary).length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {Object.entries(data.categorySummary).map(([cat, amount]) => (
                                <div key={cat} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>{cat}</span>
                                    <span style={{ fontWeight: 600 }}>${amount.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No category data available.</p>
                    )}
                </div>

                <div className="card" style={{ gridColumn: 'span 2' }}>
                    <h3 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '1rem' }}>Recent Transactions</h3>
                    <div className="table-container" style={{ border: 'none' }}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Category</th>
                                    <th>Type</th>
                                    <th style={{ textAlign: 'right' }}>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.recentTransactions?.length ? data.recentTransactions.map(req => (
                                    <tr key={req.id}>
                                        <td>{req.date}</td>
                                        <td>{req.category}</td>
                                        <td>
                                            <span className={`tag ${req.type === 'INCOME' ? 'income' : 'expense'}`}>
                                                {req.type}
                                            </span>
                                        </td>
                                        <td style={{ textAlign: 'right', fontWeight: 'bold' }}>
                                            ${req.amount?.toLocaleString()}
                                        </td>
                                    </tr>
                                )) : <tr><td colSpan="4" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No transactions found.</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
