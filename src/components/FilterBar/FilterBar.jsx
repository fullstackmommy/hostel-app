import React from 'react'

function FilterBar({bookingStats, selected, handleClick}) {

    const getClass = (bookingStat, selected) => {
        if (!selected && bookingStat.name === "All") 
            return "btn btn-primary btn-sm";
        if (selected && bookingStat._id === selected._id) 
            return "btn btn-primary btn-sm";
        return "btn btn-outline-primary btn-sm";
    }

    return (
        <div className="btn-group" role="group">
            {bookingStats.map(bookingStat => (
                <button
                    key={bookingStat._id}
                    type="button"
                    className={getClass(bookingStat, selected)}
                    onClick={() => handleClick(bookingStat)}>{bookingStat.name}</button>
            ))
}
        </div>
    )
}

export default FilterBar
