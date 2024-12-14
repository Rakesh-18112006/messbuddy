import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getComplaints } from '../services/complaintsService';
import RoleBasedRoute from '../roles/RoleBasedRoute';

const DashboardPage = () => {
    const { user } = useContext(AuthContext);
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        if (user) {
            getComplaints()
                .then(data => setComplaints(data))
                .catch(error => console.error('Failed to fetch complaints', error));
        }
    }, [user]);

    return (
        <div className="dashboard-page">
            <RoleBasedRoute />
            <h1>Dashboard</h1>
            <h2>Complaints</h2>
            <ul>
                {complaints.map(complaint => (
                    <li key={complaint.id}>{complaint.message}</li>
                ))}
            </ul>
        </div>
    );
};

export default DashboardPage;
