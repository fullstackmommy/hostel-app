import React, {Component} from 'react'
import {format} from 'date-fns';
import RoomBookingItem from '../RoomBookingItem/RoomBookingItem'

export class RoomBookingList extends Component {

    formatDateDisplay = () => {
        if (!this.props.dateSelectStart && !this.props.dateSelectEnd) 
            return "Select dates to view room availability";
        else 
            return `Room availability between ${format(this.props.dateSelectStart, 'DD MMM YYYY')} and ${format(this.props.dateSelectEnd, 'DD MMM YYYY')}`
    }

    render() {
        const {rooms, dateSelectStart, dateSelectEnd, handleClickRoom} = this.props
        const roomsLevel3 = rooms.filter(room => (room.substring(0, 2) === "03"))
        const roomsLevel4 = rooms.filter(room => (room.substring(0, 2) === "04"))

        return (

            <div>
                <p>{this.formatDateDisplay()}</p>
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
}

export default RoomBookingList
