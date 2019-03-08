import React, {Component} from 'react'
import Input from '../common/Input/Input'
import DateInput from '../common/DateInput/DateInput'
import SelectInput from '../common/SelectInput/SelectInput'
import {getBookings, saveBooking} from '../../services/bookingService'
import {getBookingStats} from '../../services/bookingStatsService'
import Joi from 'joi-browser'
import {Card, CardBody, CardHeader} from 'reactstrap'
import RoomBookingList from '../RoomBookingList/RoomBookingList'
import {getRooms} from '../../services/roomService'

export class BookingForm extends Component {

    state = {
        rooms: getRooms(),
        bookedRoom: {},
        startDate: "",
        endDate: "",
        bookingStats: getBookingStats(),
        data: {
            name: "",
            contactName: "",
            checkInDate: "",
            checkOutDate: "",
            numPax: "",
            bookingStatusId: ""
        },
        error: {
            name: "",
            contactName: "",
            checkInDate: "",
            checkOutDate: "",
            numPax: "",
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

        this.setState({data: newBooking, startDate: newBooking.checkInDate, endDate: newBooking.checkOutDate})
    }

    handleSubmit = event => {
        event.preventDefault();

        const isInvalidForm = this.validate()

        if (isInvalidForm) 
            return;
        
        const {bookingStatusId, numPax} = this.state.data
        const bookingStatus = getBookingStats().find(bookingStat => bookingStat._id === bookingStatusId)

        let booking = {
            ...this.state.data
        }
        delete booking.bookingStatusId;
        booking.bookingStatus = bookingStatus;

        booking.numPax = parseInt(numPax)

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

    handleChangeDate = ({currentTarget: input}) => {
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

        const valueDateObj = new Date(input.value)
        const valueDateISO = valueDateObj.toISOString()

        data[input.name] = valueDateISO;
        if (input.name === "checkInDate") {
            this.setState({data, startDate: valueDateISO})
        } else {
            this.setState({data, endDate: valueDateISO})
        }
    };

    handleCancel = (event) => {
        event.preventDefault()
        this
            .props
            .history
            .replace('/bookings');
    }

    handleClickRoom = () => {
        console.log("click ")
    }

    render() {

        const {bookingStats, error} = this.state
        const {
            name,
            contactName,
            numPax,
            bookingStatusId,
            checkInDate,
            checkOutDate
        } = this.state.data

        return (
            <Card>
                <CardHeader>
                    {this.props.match.params.id
                        ? "Edit Booking"
                        : "Create New Booking"}
                </CardHeader>
                <CardBody>
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
                        <span
                            style={{
                            display: 'inline-block'
                        }}>
                            <DateInput
                                name="checkInDate"
                                label="Check In Date"
                                onChange={this.handleChangeDate}
                                value={checkInDate.substring(0, 10)}
                                error={error.checkInDate}/>
                            <DateInput
                                name="checkOutDate"
                                label="Check Out Date"
                                onChange={this.handleChangeDate}
                                value={checkOutDate.substring(0, 10)}
                                error={error.checkOutDate}/>
                        </span>
                        <Input
                            name="numPax"
                            label="Num of Pax"
                            type="number"
                            onChange={this.handleChange}
                            value={numPax}
                            error={error.numPax}/>
                        <RoomBookingList
                            rooms={this.state.rooms}
                            dateSelectStart={this.state.startDate}
                            dateSelectEnd={this.state.endDate}
                            handleClickRoom={this.state.handleClickRoom}/>
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
                </CardBody>
            </Card>

        )
    }
}

export default BookingForm