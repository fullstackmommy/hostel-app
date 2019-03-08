import React from "react";

function Input({
    name,
    label,
    type = "text",
    onChange,
    value,
    error
}) {
    return (
        <div className="form-group">
            <label htmlFor={`${name}-input`}>{label}</label>
            {type === "text"
                ? (<input
                    type="text"
                    value={value}
                    className="form-control"
                    id={`${name}-input`}
                    name={name}
                    onChange={onChange}/>)
                : (<input
                    type="number"
                    min="1"
                    step="1"
                    value={value}
                    className="form-control"
                    id={`${name}-input`}
                    name={name}
                    onChange={onChange}/>)}
            {error && <div className="alert alert-danger">
                {error}
            </div>}
        </div>
    );
}

export default Input;