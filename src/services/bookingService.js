let bookings = [
    {
        _id: "5c342ac9fc13ae39f8000000",
        name: "DJC Camp",
        contactName: "Catherine Tan",
        checkInDate: "2019-01-12T17:00:00Z",
        checkOutDate: "2019-01-13T12:00:00Z",
        numPax: 25,
        numRoom: 7,
        bookingStatus: {
            _id: "CL",
            name: "Closed"
        }
    }, {
        _id: "5c342ac9fc13ae39f8000001",
        name: "CFC-YFC Junior Champ Camp",
        contactName: "Clara Koh",
        checkInDate: "2018-11-23T17:00:00Z",
        checkOutDate: "2018-11-25T12:00:00Z",
        numPax: 12,
        numRoom: 4,
        bookingStatus: {
            _id: "CL",
            name: "Closed"
        }
    }, {
        _id: "5c342ac9fc13ae39f8000002",
        name: "MCG Camp",
        contactName: "John Varghese",
        checkInDate: "2018-12-07T17:00:00Z",
        checkOutDate: "2018-12-09T17:00:00Z",
        numPax: 60,
        numRoom: 15,
        bookingStatus: {
            _id: "CL",
            name: "Closed"
        }
    }, {
        _id: "5c342ac9fc13ae39f8000003",
        name: "NY Camp",
        contactName: "Francis Goh",
        checkInDate: "2019-01-05T17:00:00Z",
        checkOutDate: "2019-01-06T17:00:00Z",
        numPax: 20,
        numRoom: 5,
        bookingStatus: {
            _id: "CL",
            name: "Closed"
        }
    }, {
        _id: "5c342ac9fc13ae39f8000004",
        name: "JY Away Day",
        contactName: "Jessin Francis",
        checkInDate: "2019-02-09T17:00:00Z",
        checkOutDate: "2019-02-10T17:00:00Z",
        numPax: 59,
        numRoom: 15,
        bookingStatus: {
            _id: "CL",
            name: "Closed"
        }
    }, {
        _id: "5c342ac9fc13ae39f8000005",
        name: "SMC Youth Leadership Camp",
        contactName: "Owen Lim",
        checkInDate: "2019-03-15T12:00:00Z",
        checkOutDate: "2019-03-17T17:00:00Z",
        numPax: 47,
        numRoom: 12,
        bookingStatus: {
            _id: "CO",
            name: "Confirmed"
        }
    }, {
        _id: "5c342ac9fc13ae39f8000006",
        name: "ICy NBS",
        contactName: "Genevieve Husada",
        checkInDate: "2019-04-0512:00:00Z",
        checkOutDate: "2019-04-07T17:00:00Z",
        numPax: 8,
        numRoom: 8,
        bookingStatus: {
            _id: "PE",
            name: "Pending"
        }
    }, {
        _id: "5c342ac9fc13ae39f8000007",
        name: "HC PC Camp",
        contactName: "Tiffany Ling",
        checkInDate: "2019-03-02T12:00:00Z",
        checkOutDate: "2019-03-03T17:00:00Z",
        numPax: 68,
        numRoom: 17,
        bookingStatus: {
            _id: "CA",
            name: "Cancelled"
        }
    }
];

export function getBooking(id) {
    return bookings.find(booking => booking._id === id);
}

export function getBookings() {
    return bookings;
}

export function deleteBooking(id) {
    const found = bookings.find(booking => booking._id === id);
    bookings = bookings.filter(booking => booking._id !== id);
    return found;
}

export function saveBooking(booking) {
    let existing = bookings.find(bk => bk._id === booking._id);
    if (existing) {
        const merged = {
            ...existing,
            ...booking
        };
        bookings = bookings.filter(booking => booking._id !== existing._id);
        bookings.push(merged);
        return merged;
    } else {
        const newBooking = {
            _id: Date
                .now()
                .toString(),
            ...booking
        };
        bookings.push(newBooking);
        return newBooking;
    }
}