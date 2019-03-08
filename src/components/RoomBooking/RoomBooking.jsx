import React from 'react'
import {getRoomStatusByDate} from '../../services/roomBookingService'

function RoomBooking({rooms, dateSelectStart, dateSelectEnd}) {
    return (
        <div>
            {rooms.map(room => <div key ={room}>{room} {getRoomStatusByDate(room, dateSelectStart, dateSelectEnd)}</div>)}
        </div>
    )
}

export default RoomBooking
