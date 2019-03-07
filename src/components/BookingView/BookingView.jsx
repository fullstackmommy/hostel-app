import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {getBookings} from '../../services/bookingService'

export class BookingView extends Component {
    state = {
        data: {
            name: "",
            contactName: "",
            checkInDate: "",
            checkOutDate: "",
            numPax: "",
            numRoom: "",
            bookingStatusId: ""
        }
    }
    componentDidMount() {
        const id = this.props.match
            ? this.props.match.params.id
            : null;
        const bookingFound = getBookings().find(booking => booking._id === id);

        if (!bookingFound) 
            return;
        const newBooking = {
            ...bookingFound
        }
        newBooking.bookingStatusId = newBooking.bookingStatus.name
        delete newBooking.bookingStatus
        this.setState({data: newBooking});
    }
    render() {
        const {
            name,
            contactName,
            checkInDate,
            checkOutDate,
            numPax,
            numRoom,
            bookingStatusId
        } = this.state.data
        return (
            <div className="container">
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <th scope="row">
                                Name
                            </th>
                            <td>
                                {name}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                Contact Name
                            </th>
                            <td>
                                {contactName}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                Check In Date
                            </th>
                            <td>
                                {checkInDate}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                Check Out Date
                            </th>
                            <td>
                                {checkOutDate}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                Num of Pax
                            </th>
                            <td>
                                {numPax}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                Num of Rooms
                            </th>
                            <td>
                                {numRoom}
                            </td>
                        </tr>

                        <tr>
                            <th scope="row">
                                Booking Status
                            </th>
                            <td>
                                {bookingStatusId}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Link to="/bookings">Back to Booking List</Link>
            </div>

        )
    }
}

export default BookingView
