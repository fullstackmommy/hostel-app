import React from "react";

function DateInput({name, label, onChange, value, error}) {
    return (
        <div className="form-group">
            <label htmlFor={`${name}-input`}>{label}</label>
            {< input
            required
            type = "date"
            value = {
                value
            }
            className = "form-control"
            id = {
                `${name}-input`
            }
            name = {
                name
            }
            onChange = {
                onChange
            } />}
            {error && <div className="alert alert-danger">
                {error}
            </div>}
        </div>
    )
}

export default DateInput;