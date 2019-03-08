import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {getBookings, deleteBooking} from '../../services/bookingService';
import BookingTable from '../BookingTable/BookingTable'
import FilterBar from '../FilterBar/FilterBar'
import {getDefaultBookingStat, getBookingStats} from '../../services/bookingStatsService';

class Bookings extends Component {
    state = {
        bookings: getBookings(),
        bookingStats: [
            getDefaultBookingStat(), ...getBookingStats()
        ],
        selectedBookingStat: null
    }

    handleBookingStatSelect = bookingStat => {
        const finalBookingStat = bookingStat.name === "All"
            ? null
            : bookingStat
        this.setState({selectedBookingStat: finalBookingStat})
    }

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    handleDelete = bookingId => {
        deleteBooking(bookingId)
        this.setState({bookings: getBookings()});
    };

    filterBookingList = () => {
        const {bookings, selectedBookingStat} = this.state

        let filteredByBookingStat = selectedBookingStat && selectedBookingStat._id
            ? bookings.filter(b => b.bookingStatus._id === selectedBookingStat._id)
            : bookings

        return filteredByBookingStat
    }
    render() {
        const {bookingStats, selectedBookingStat} = this.state
        const filteredBookings = this.filterBookingList()
        return (
            <div className="animated fadeIn">
                <div data-testid="admin-page">
                    <div className="row justify-content-end">
                        <div className="col-auto mr-auto mt-3">
                            <FilterBar
                                bookingStats={bookingStats}
                                selected={selectedBookingStat}
                                handleClick={this.handleBookingStatSelect}/>
                        </div>
                        <div className="col-auto mt-3">
                            <Link className="btn btn-primary btn-sm" to="/bookings/new">Create New</Link>
                        </div>
                    </div>
                    <div className="row">
                        <BookingTable bookings={filteredBookings} handleDelete={this.handleDelete}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Bookings;
