import React from 'react'
import {Link} from "react-router-dom"

function BookingTable({bookings, handleDelete}) {

    const sortedBookings = bookings.sort((first, second) => {
        if (first.checkInDate < second.checkInDate) 
            return -1
        if (first.checkInDate > second.checkInDate) 
            return 1
        return 0
    })

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Contact Name</th>
                    <th>Contact No</th>
                    <th>Email Address</th>
                    <th>Check In Date</th>
                    <th>Check Out Date</th>
                    <th>Number of Pax</th>
                    <th>Booking Status</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {sortedBookings.map(booking => (
                    <tr key={booking._id} data-testid="booking-table-row">
                        <td>{booking.name}</td>
                        <td>{booking.contactName}</td>
                        <td>{booking.contactNum}</td>
                        <td>{booking.contactEmail}</td>
                        <td>{booking
                                .checkInDate
                                .substring(0, 10)}</td>
                        <td>{booking
                                .checkOutDate
                                .substring(0, 10)}</td>
                        <td>{booking.numPax}</td>
                        <td>{booking.bookingStatus.name}</td>
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
