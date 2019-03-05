import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {getBookings, deleteBooking} from '../../services/bookingService';
import BookingTable from '../BookingTable/BookingTable'

class Bookings extends Component {
    state = {
        bookings: getBookings()
    }

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    handleDelete = bookingId => {
        deleteBooking(bookingId)
        this.setState({bookings: getBookings()});
    };

    render() {
        const {bookings} = this.state
        return (
            <div className="animated fadeIn">
                <div data-testid="admin-page">
                    <div className="row justify-content-end">
                        <Link className="btn btn-primary btn-sm mb-2" to="/bookings/new">Create New</Link>
                    </div>
                    <div className="row">
                        <BookingTable bookings={bookings} handleDelete={this.handleDelete}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Bookings;
