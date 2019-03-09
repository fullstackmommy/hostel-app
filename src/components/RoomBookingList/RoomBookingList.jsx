import React from 'react'
import {format} from 'date-fns';
import RoomBookingItem from '../RoomBookingItem/RoomBookingItem'

function RoomBookingList({rooms, dateSelectStart, dateSelectEnd, handleClickRoom}) {
    const roomsLevel3 = rooms.filter(room => (room.substring(0, 2) === "03"))
    const roomsLevel4 = rooms.filter(room => (room.substring(0, 2) === "04"))

    const formatDateDisplay = () => {
        if (!dateSelectStart && !dateSelectEnd) 
            return "Select dates to view room availability";
        else 
            return `Room availability between ${format(dateSelectStart, 'DD MMM YYYY')} and ${format(dateSelectEnd, 'DD MMM YYYY')}`
    }

    return (
        <div>
            <p>{formatDateDisplay()}</p>
            <div className="form-group">
                {roomsLevel3.map(room => <RoomBookingItem
                    room={room}
                    key={room}
                    handleClickRoom={handleClickRoom}
                    dateSelectStart={dateSelectStart}
                    dateSelectEnd={dateSelectEnd}/>)}
            </div>
            <div className="form-group">
                {roomsLevel4.map(room => <RoomBookingItem
                    room={room}
                    key={room}
                    handleClickRoom={handleClickRoom}
                    dateSelectStart={dateSelectStart}
                    dateSelectEnd={dateSelectEnd}/>)}
            </div>
        </div>
    )
}

export default RoomBookingList