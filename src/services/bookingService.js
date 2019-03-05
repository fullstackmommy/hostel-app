let bookings = [
    {
        _id: "5c342ac9fc13ae39f8000000",
        name: "DJC Youth Retreat",
        contactName: "Catherine Tan",
        checkInDate: "12 Jan 2019",
        checkOutDate: "13 Jan 2019",
        numPax: 25,
        numRoom: 7,
        bookingStatus: "Closed"
    }, {
        _id: "5c342ac9fc13ae39f8000001",
        name: "CFC-YFC Leader Retreat",
        contactName: "Clara Koh",
        checkInDate: "23 Nov 2018",
        checkOutDate: "25 Nov 2018",
        numPax: 12,
        numRoom: 4,
        bookingStatus: "Closed"
    }, {
        _id: "5c342ac9fc13ae39f8000002",
        name: "MCG Retreat",
        contactName: "John Varghese",
        checkInDate: "7 Dec 2018",
        checkOutDate: "9 Dec 2018",
        numPax: 60,
        numRoom: 15,
        bookingStatus: "Closed"
    }, {
        _id: "5c342ac9fc13ae39f8000003",
        name: "NY Camp",
        contactName: "Francis Goh",
        checkInDate: "5 Jan 2019",
        checkOutDate: "6 Jan 2019",
        numPax: 20,
        numRoom: 5,
        bookingStatus: "Closed"
    }, {
        _id: "5c342ac9fc13ae39f8000004",
        name: "JY Working Ministry Retreat",
        contactName: "Jessin Francis",
        checkInDate: "9 Feb 2019",
        checkOutDate: "10 Feb 2019",
        numPax: 59,
        numRoom: 15,
        bookingStatus: "Closed"
    }, {
        _id: "5c342ac9fc13ae39f8000005",
        name: "SMC Youth Ministry",
        contactName: "Owen Lim",
        checkInDate: "15 Mar 2019",
        checkOutDate: "17 Mar 2019",
        numPax: 47,
        numRoom: 12,
        bookingStatus: "Confirmed"
    }, {
        _id: "5c342ac9fc13ae39f8000006",
        name: "ICy NUS",
        contactName: "Genevieve Husada",
        checkInDate: "5 Apr 2019",
        checkOutDate: "7 Apr 2019",
        numPax: 8,
        numRoom: 8,
        bookingStatus: "Pending"
    }, {
        _id: "5c342ac9fc13ae39f8000007",
        name: "HC Pre-Confirmation Camp",
        contactName: "Tiffany Ling",
        checkInDate: "2 Mar 2019",
        checkOutDate: "3 Mar 2019",
        numPax: 68,
        numRoom: 17,
        bookingStatus: "Cancelled"
    }
];

export function getBookings() {
    return bookings;
}

export function deleteBooking(id) {
    const found = bookings.find(booking => booking._id === id);
    bookings = bookings.filter(booking => booking._id !== id);
    return found;
}