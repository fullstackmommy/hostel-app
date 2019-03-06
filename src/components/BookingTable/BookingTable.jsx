import React from 'react'
import {Link} from "react-router-dom"

function BookingTable({bookings, handleDelete}) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Contact Name</th>
                    <th>Check In Date</th>
                    <th>Check Out Date</th>
                    <th>Number of Pax</th>
                    <th>Number of Rooms</th>
                    <th>Booking Status</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {bookings.map(booking => (
                    <tr key={booking._id} data-testid="booking-table-row">
                        <td>{booking.name}</td>
                        <td>{booking.contactName}</td>
                        <td>{booking.checkInDate}</td>
                        <td>{booking.checkOutDate}</td>
                        <td>{booking.numPax}</td>
                        <td>{booking.numRoom}</td>
                        <td>{booking.bookingStatus}</td>
                        <td>
                            <Link className="btn btn-primary btn-sm" to={`/bookings/${booking._id}`}>View</Link>
                        </td>
                        <td>
                            <Link className="btn btn-primary btn-sm" to={`/bookings/${booking._id}/edit`}>Edit</Link>
                        </td>
                        <td>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDelete(booking._id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default BookingTable