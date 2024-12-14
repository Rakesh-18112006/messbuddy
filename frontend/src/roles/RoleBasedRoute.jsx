import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import StudentDashboard from './StudentDashboard';
import MrDashboard from './MrDashboard';
import HigherOfficialDashboard from './HigherOfficialDashboard';

const RoleBasedRoute = () => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <div>Loading...</div>;
    }

    switch (user.role) {
        case 'student':
            return <StudentDashboard />;
        case 'mr':
            return <MrDashboard />;
        case 'higher_official':
            return <HigherOfficialDashboard />;
        default:
            return <div>Unauthorized access</div>;
    }
};

export default RoleBasedRoute;
