import React, {Component} from 'react'
import Input from '../common/Input/Input'
import SelectInput from '../common/SelectInput/SelectInput'
import {getBookings, saveBooking} from '../../services/bookingService'
import {getBookingStats} from '../../services/bookingStatsService'
import Joi from 'joi-browser'
import {Card, CardBody, CardHeader} from 'reactstrap'
import {addDays, format} from 'date-fns';
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import {DateRangePicker} from 'react-date-range';
import RoomBookingList from '../RoomBookingList/RoomBookingList'
import {getRooms} from '../../services/roomService'
import {getRoomBookings, getRoomStatusByDate, updateRoomStatus, saveRoomBooking} from '../../services/roomBookingService'

export class BookingForm extends Component {

    state = {
        rooms: getRooms(),
        startDate: "",
        endDate: "",
        roomBookings: getRoomBookings(),
        bookingStats: getBookingStats(),
        roomBooking: {
            status: "",
            bookingId: "",
            roomId: "",
            startDate: "",
            endDate: ""
        },
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
            numPax: "",
            bookingStatusId: ""
        },
        selectionRange: {
            selection: {
                startDate: new Date(),
                endDate: addDays(new Date(), 2),
                key: 'selection'
            }
        },
        condition: false,
        isRoomSelectDisabled: false
    }

    schema = {
        _id: Joi.string(),
        name: Joi
            .string()
            .required(),
        contactName: Joi
            .string()
            .required(),
        checkInDate: Joi.string(),
        checkOutDate: Joi.string(),
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

        const startDateObj = new Date(newBooking.checkInDate)
        const endDateObj = new Date(newBooking.checkOutDate)

        let isButtonDisabled = false
        if (newBooking.bookingStatusId === "CL" || newBooking.bookingStatusId === "CA") 
            isButtonDisabled = true

        this.setState({
            data: newBooking,
            startDate: newBooking.checkInDate,
            endDate: newBooking.checkOutDate,
            selectionRange: {
                selection: {
                    startDate: startDateObj,
                    endDate: endDateObj,
                    key: 'selection'
                }
            },
            isRoomSelectDisabled: isButtonDisabled
        })
    }

    handleSubmit = (event) => {
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

    handleCancel = (event) => {
        event.preventDefault()
        this
            .props
            .history
            .replace('/bookings');
    }

    handleSelectDate = (dateRange) => {

        const startDateISO = format(dateRange.selection.startDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
        const endDateISO = format(dateRange.selection.endDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ')

        const data = {
            ...this.state.data
        };

        data["checkInDate"] = startDateISO
        data["checkOutDate"] = endDateISO

        this.setState({
            data,
            startDate: startDateISO,
            endDate: endDateISO,
            selectionRange: {
                ...this.state.selectionRange,
                ...dateRange
            }
        })
    }

    handleClickRoom = (roomId) => {
        console.log("room ", roomId, " condition ", this.state.condition)
        if (getRoomStatusByDate(roomId, this.state.startDate, this.state.endDate) === "Reserved") {
            updateRoomStatus(this.state.data, roomId)
        } else {
            saveRoomBooking(this.state.data, roomId, "Reserved")
        }
        this.setState({
            condition: !this.state.condition
        })

    }

    render() {

        const {bookingStats, error, selectionRange, isRoomSelectDisabled} = this.state
        const {name, contactName, numPax, bookingStatusId} = this.state.data

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
                        <Input
                            name="numPax"
                            label="Num of Pax"
                            type="number"
                            onChange={this.handleChange}
                            value={numPax}
                            error={error.numPax}/>
                        <DateRangePicker
                            showSelectionPreview={true}
                            moveRangeOnFirstSelection={false}
                            months={1}
                            ranges={[selectionRange.selection]}
                            onChange={this.handleSelectDate}/>
                        <RoomBookingList
                            disabled={isRoomSelectDisabled}
                            rooms={this.state.rooms}
                            dateSelectStart={this.state.startDate}
                            dateSelectEnd={this.state.endDate}
                            handleClickRoom={this.handleClickRoom}
                            condition={this.condition}/>
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