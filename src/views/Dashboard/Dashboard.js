import React, {Component} from 'react';
import BookingCalendar from '../../components/BookingCalendar/BookingCalendar'
import './Dashboard.css';

class Dashboard extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {

    return (
      <div className="animated fadeIn">
        <BookingCalendar/>
      </div>
    );
  }
}

export default Dashboard;
