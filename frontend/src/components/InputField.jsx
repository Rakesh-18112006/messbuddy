import React from 'react';

const InputField = ({ label, type = 'text', name, value, onChange, placeholder }) => (
    <div className="input-field">
        {label && <label htmlFor={name}>{label}</label>}
        <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    </div>
);

export default InputField;
