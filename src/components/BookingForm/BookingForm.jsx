import React, {Component} from 'react'
import Input from '../common/Input/Input'
import SelectInput from '../common/SelectInput/SelectInput'
import {getBookings, saveBooking} from '../../services/bookingService'
import {getBookingStats} from '../../services/bookingStatsService'
import Joi from 'joi-browser'
import moment from 'moment';
import {DateRangePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';

export class BookingForm extends Component {

    state = {
        bookingStats: getBookingStats(),
        date: moment(),
        momentStartDate: moment(),
        momentEndDate: moment(),
        data: {
            name: "",
            contactName: "",
            checkInDate: "",
            checkOutDate: "",
            numPax: "",
            numRoom: "",
            bookingStatusId: ""
        },
        error: {
            name: "",
            contactName: "",
            checkInDate: "",
            checkOutDate: "",
            numPax: "",
            numRoom: "",
            bookingStatusId: ""
        }
    }

    schema = {
        _id: Joi.string(),
        name: Joi
            .string()
            .required(),
        contactName: Joi
            .string()
            .required(),
        checkInDate: Joi
            .string()
            .required(),
        checkOutDate: Joi
            .string()
            .required(),
        numPax: Joi
            .number()
            .integer()
            .min(1),
        numRoom: Joi
            .number()
            .integer()
            .min(1),
        bookingStatusId: Joi
            .string()
            .required()
    }

    validateField = (inputName, value) => {
        const schema = {
            [inputName]: this.schema[inputName]
        }

        const result = Joi.validate({
            [inputName]: value
        }, schema)

        return result.error;
    }

    validate = () => {
        const option = {
            abortEarly: false
        }
        const result = Joi.validate(this.state.data, this.schema, option);
        return result.error
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
        newBooking.bookingStatusId = newBooking.bookingStatus._id
        delete newBooking.bookingStatus

        this.setState({data: newBooking});

        this.setState({
            momentStartDate: moment(newBooking.checkInDate, 'D MMM YYYY'),
            momentEndDate: moment(newBooking.checkOutDate, 'D MMM YYYY')
        })
    }

    handleSubmit = event => {
        event.preventDefault();

        const isInvalidForm = this.validate()

        if (isInvalidForm) 
            return;
        
        const {bookingStatusId, numPax, numRoom} = this.state.data
        const bookingStatus = getBookingStats().find(bookingStat => bookingStat._id === bookingStatusId)

        let booking = {
            ...this.state.data
        }
        delete booking.bookingStatusId;
        booking.bookingStatus = bookingStatus;

        booking.numPax = parseInt(numPax)
        booking.numRoom = parseInt(numRoom)

        saveBooking(booking)

        this
            .props
            .history
            .replace('/bookings');
    }

    handleChange = ({currentTarget: input}) => {
        const copyError = {
            ...this.state.error
        }

        const isInvalid = this.validateField(input.name, input.value)

        if (isInvalid) {
            copyError[input.name] = isInvalid.details[0].message
            this.setState({error: copyError})
        } else {
            copyError[input.name] = ""
            this.setState({error: copyError})
        }

        const data = {
            ...this.state.data
        };
        data[input.name] = input.value;
        this.setState({data});
    };

    handleChangeDate = (event) => {
        const data = {
            ...this.state.data
        }

        data.checkInDate = event
            .startDate
            .format('D MMM YYYY')
        data.checkOutDate = event
            .endDate
            .format('D MMM YYYY')

        this.setState({data});
        this.setState({momentStartDate: event.startDate, momentEndDate: event.endDate})
    }

    handleCancel = (event) => {
        event.preventDefault()
        this
            .props
            .history
            .replace('/bookings');
    }

    render() {

        const {bookingStats, error} = this.state
        const {name, contactName, numPax, numRoom, bookingStatusId} = this.state.data

        return (
            <div data-testid="create-page">
                <h3>{this.props.match.params.id
                        ? "Edit Booking"
                        : "Create New Booking"}</h3>
                <form onSubmit={this.handleSubmit}>
                    <Input
                        name="name"
                        label="Name"
                        onChange={this.handleChange}
                        value={name}
                        error={error.name}/>
                    <Input
                        name="contactName"
                        label="Contact Name"
                        onChange={this.handleChange}
                        value={contactName}
                        error={error.contactName}/>
                    <label htmlFor="checkInDate">Check In Date - Check Out Date</label>
                    <DateRangePicker
                        displayFormat="DD MM YYYY"
                        startDate={this.state.momentStartDate}
                        startDateId="checkInDate"
                        endDate={this.state.momentEndDate}
                        endDateId="checkOutDate"
                        onDatesChange={this.handleChangeDate}
                        focusedInput={this.state.focusedInput}
                        onFocusChange={focusedInput => this.setState({focusedInput})}/>
                    <Input
                        name="numPax"
                        label="Num of Pax"
                        type="number"
                        onChange={this.handleChange}
                        value={numPax}
                        error={error.numPax}/>
                    <Input
                        name="numRoom"
                        label="Num of Rooms"
                        type="number"
                        onChange={this.handleChange}
                        value={numRoom}
                        error={error.numRoom}/>
                    <SelectInput
                        name="bookingStatusId"
                        label="Booking Status"
                        options={bookingStats}
                        onChange={this.handleChange}
                        value={bookingStatusId}
                        error={error.bookingStatusId}/>
                    <span>
                        <button
                            type="cancel"
                            className="btn btn-secondary btn-sm mr-2"
                            onClick={this.handleCancel}>Cancel</button>
                        <button
                            type="submit"
                            className="btn btn-primary btn-sm"
                            disabled={this.validate()}>Save</button>
                    </span>

                </form>
            </div>
        )
    }
}

export default BookingForm
