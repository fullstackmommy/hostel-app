import React from 'react'
import {getRoomStatusByDate} from '../../services/roomBookingService'

function RoomBooking({rooms, dateSelectStart, dateSelectEnd}) {
    const roomsLevel3 = rooms.filter(room => (room.substring(0, 2) === "03"))
    const roomsLevel4 = rooms.filter(room => (room.substring(0, 2) === "04"))

    const getClass = (select) => {
        if (select === "A") 
            return "btn btn-success"
        else 
            return "btn btn-secondary"
    }

    return (
        <div className="card">
            <p>Select Rooms:</p>
            <div>
                {roomsLevel3.map(room => <button
                    type="button"
                    className={getClass(getRoomStatusByDate(room, dateSelectStart, dateSelectEnd).substr(0, 1))}
                    key
                    ={room}
                    value={getRoomStatusByDate(room, dateSelectStart, dateSelectEnd).substr(0, 1)}>{room}
                </button>)}
            </div>
            <div>
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

export default RoomBooking