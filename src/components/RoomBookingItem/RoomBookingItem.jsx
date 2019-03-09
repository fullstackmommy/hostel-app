import React from 'react'
import {getRoomStatusByDate} from '../../services/roomBookingService'

function RoomBookingItem({room, handleClickRoom, dateSelectStart, dateSelectEnd}) {
    const getClass = (select) => {
        if (select === "A") 
            return "btn btn-success mr-1"
        else 
            return "btn btn-secondary mr-1"
    }

    return (
        <button
            type="button"
            onClick={() => handleClickRoom(room)}
            className={getClass(getRoomStatusByDate(room, dateSelectStart, dateSelectEnd).substr(0, 1))}
            key={room}
            value={getRoomStatusByDate(room, dateSelectStart, dateSelectEnd).substr(0, 1)}>{room}
        </button>
    )
}

export default RoomBookingItem
