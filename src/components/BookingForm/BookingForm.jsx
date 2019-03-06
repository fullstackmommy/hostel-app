import React, {Component} from 'react'
import Input from '../common/Input/Input'
import SelectInput from '../common/SelectInput/SelectInput'
import {getBookings, saveBooking} from '../../services/bookingService'
import {getBookingStats} from '../../services/bookingStatsService'
import Joi from 'joi-browser'

export class BookingForm extends Component {

    state = {
        bookingStats: getBookingStats(),
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
            .replace(this.props.returnPath);
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

    render() {
        const {bookingStats, error} = this.state
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
            <div data-testid="create-page">
                <h3>{this.props.match.params.id
                        ? "Edit Booking"
                        : "Create New Booking"}</h3>
                <form>
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
                    <Input
                        name="checkInDate"
                        label="Check In Date"
                        onChange={this.handleChange}
                        value={checkInDate}
                        error={error.checkInDate}/>
                    <Input
                        name="checkOutDate"
                        label="Check Out Date"
                        onChange={this.handleChange}
                        value={checkOutDate}
                        error={error.checkOutDate}/>
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
                    <button className="btn btn-primary btn-sm" disabled={this.validate()}>Save</button>
                </form>
            </div>
        )
    }
}

export default BookingForm
