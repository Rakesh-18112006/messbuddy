import React from 'react';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Goes back to the previous page
    };

    return (
        <div className="unauthorized-page">
            <h1>Unauthorized Access</h1>
            <p>You do not have permission to view this page.</p>
            <button onClick={handleGoBack}>Go Back</button>
        </div>
    );
};

export default UnauthorizedPage;
