import React from 'react'
import {getRoomStatusByDate} from '../../services/roomBookingService'

function RoomBooking({rooms, dateSelectStart, dateSelectEnd}) {
    const roomsLevel3 = rooms.filter(room => (room.substring(0, 2) === "03"))
    const roomsLevel4 = rooms.filter(room => (room.substring(0, 2) === "04"))

    return (
        <table className="table table-bordered">
            <tbody>
                <tr>{roomsLevel3.map(room => <td key ={room}>{room} {getRoomStatusByDate(room, dateSelectStart, dateSelectEnd).substr(0, 1)}
                    </td>)}</tr>
                <tr>{roomsLevel4.map(room => <td key ={room}>{room} {getRoomStatusByDate(room, dateSelectStart, dateSelectEnd).substr(0, 1)}</td>)}</tr>
            </tbody>

        </table>
    )
}

export default RoomBooking
