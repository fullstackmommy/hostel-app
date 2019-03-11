import React, {Component} from 'react';
import Calendar from "react-big-calendar";
import moment from 'moment';
//import {utcToZonedTime} from 'date-fns-timezone';
import "react-big-calendar/lib/css/react-big-calendar.css";
import {getBookings} from '../../services/bookingService'

const localizer = Calendar.momentLocalizer(moment);

const bookings = getBookings();
const reformattedArray = bookings.map(booking => {
    const checkInDateObj = new Date(booking.checkInDate)
    const checkOutDateObj = new Date(booking.checkOutDate)

    var rObj = {}
    rObj.allDay = true
    rObj.start = checkInDateObj
    rObj.end = checkOutDateObj
    rObj.title = booking.name
    return rObj
});

class Dashboard extends Component {

    state = {
        events: []
    };

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    componentDidMount() {
        setTimeout(() => {
            this.setState({events: reformattedArray})
        }, 300)
    }

    render() {

        return (
            <div className="animated fadeIn">
                <div className="card">
                    <div className="card-header">
                        Dashboard Headings
                    </div>
                    <div className="card-body">
                        <p>List of Booking</p>
                        <Calendar
                            localizer={localizer}
                            defaultDate={new Date()}
                            defaultView="month"
                            events={this.state.events}
                            style={{
                            height: "80vh"
                        }}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;