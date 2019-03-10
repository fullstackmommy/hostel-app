import React, {Component} from 'react'
import {getRoomStatusByDate} from '../../services/roomBookingService'

export class RoomBookingItem extends Component {

    getClass = (select) => {
        if (!this.props.condition) {
            if (select === "A") 
                return "btn btn-success mr-1"
            else 
                return "btn btn-secondary mr-1"
        } else {
            if (select === "A") 
                return "btn btn-secondary mr-1"
            else 
                return "btn btn-success mr-1"
        }
    }

    render() {
        const {room, handleClickRoom, dateSelectStart, dateSelectEnd, disabled} = this.props
        return (
            <button
                type="button"
                disabled={disabled}
                onClick={() => handleClickRoom(room)}
                className={this.getClass(getRoomStatusByDate(room, dateSelectStart, dateSelectEnd).substr(0, 1))}
                key={room}
                value={getRoomStatusByDate(room, dateSelectStart, dateSelectEnd).substr(0, 1)}>{room}
            </button>
        )
    }
}

export default RoomBookingItem
