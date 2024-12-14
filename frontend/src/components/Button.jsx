import React from 'react';

const Button = ({ label, onClick, type = 'button', className = '' }) => {
    return (
        <button type={type} className={`btn ${className}`} onClick={onClick}>
            {label}
        </button>
    );
};

export default Button;
