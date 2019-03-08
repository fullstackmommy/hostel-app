import React from 'react'
import {getRoomStatusByDate} from '../../services/roomBookingService'

function xRoomBooking({rooms, dateSelectStart, dateSelectEnd, handleClickRoom}) {
    const roomsLevel3 = rooms.filter(room => (room.substring(0, 2) === "03"))
    const roomsLevel4 = rooms.filter(room => (room.substring(0, 2) === "04"))

    const getClass = (select) => {
        if (select === "A") 
            return "btn btn-success mr-1"
        else 
            return "btn btn-secondary mr-1"
    }

    return (
        <div>
            <p>Select Rooms:</p>
            <div className="form-group">
                {roomsLevel3.map(room => <button
                    type="button"
                    onClick={() => handleClickRoom(room)}
                    className={getClass(getRoomStatusByDate(room, dateSelectStart, dateSelectEnd).substr(0, 1))}
                    key
                    ={room}
                    value={getRoomStatusByDate(room, dateSelectStart, dateSelectEnd).substr(0, 1)}>{room}
                </button>)}
            </div>
            <div className="form-group">
                {roomsLevel4.map(room => <button
                    type="button"
                    className={getClass(getRoomStatusByDate(room, dateSelectStart, dateSelectEnd).substr(0, 1))}
                    key
                    ={room}
                    value={getRoomStatusByDate(room, dateSelectStart, dateSelectEnd).substr(0, 1)}>{room}
                </button>)
}
            </div>
        </div>

    )
}

export default xRoomBooking