import React, {Component} from 'react'
import Input from '../common/Input/Input'
import SelectInput from '../common/SelectInput/SelectInput'
import {getBookings, saveBooking} from '../../services/bookingService'
import {getBookingStats} from '../../services/bookingStatsService'
import Joi from 'joi-browser'
import {Card, CardBody, CardHeader} from 'reactstrap'
import RoomBooking from '../RoomBooking/RoomBooking'
import {getRooms} from '../../services/roomService'

export class BookingForm extends Component {

    state = {
        rooms: getRooms(),
        focusedInput: null,
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

        this.setState({data: newBooking})
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
        this.setState({data});
    };

    handleCancel = (event) => {
        event.preventDefault()
        this
            .props
            .history
            .replace('/bookings');
    }

    render() {

        const {bookingStats, error} = this.state
        const {
            name,
            contactName,
            numPax,
            numRoom,
            bookingStatusId,
            checkInDate,
            checkOutDate
        } = this.state.data

        return (
            <div>
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
                            <label htmlFor="checkInDate-input">Check In Date</label>
                            <input
                                type="date"
                                label="Check In Date"
                                id="checkInDate-input"
                                name="checkInDate"
                                onChange={this.handleChangeDate}
                                value={checkInDate.substring(0, 10)}/>
                            <label htmlFor="checkOutDate-input">Check Out Date</label>
                            <input
                                type="date"
                                label="Check Out Date"
                                id="checkOutDate-input"
                                name="checkOutDate"
                                onChange={this.handleChangeDate}
                                value={checkOutDate.substring(0, 10)}/>
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
                    </CardBody>
                </Card>
                <Card>
                    <RoomBooking
                        rooms={this.state.rooms}
                        dateSelectStart={checkInDate}
                        dateSelectEnd={checkOutDate}/>
                </Card>
            </div>

        )
    }
}

export default BookingForm
