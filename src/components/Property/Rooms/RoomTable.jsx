import React, {Component} from 'react'
import {getAllRooms} from '../../../services/roomService';
import {Link} from "react-router-dom"

export class RoomTable extends Component {

    state = {
        rooms: getAllRooms()
    }
    render() {
        const {rooms} = this.state
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Room Number</th>
                        <th>Type</th>
                        <th>Bed Frames</th>
                        <th>Aircond</th>
                        <th>Fan</th>
                        <th>Bedside Table</th>
                        <th>Wardrobe</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map(room => (
                        <tr key={room._id} data-testid="booking-table-row">
                            <td>{room._id}</td>
                            <td>{room.type.name}</td>
                            <td>{room.bedframe}</td>
                            <td>{room.aircond}</td>
                            <td>{room.fan}</td>
                            <td>{room.bedsideTable}</td>
                            <td>{room.wardrobe}</td>
                            <td>
                                <Link className="btn btn-primary btn-sm" to={`/rooms/${room._id}/edit`}>Edit</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }
}

export default RoomTable
