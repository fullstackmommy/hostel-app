import "jest-dom/extend-expect";
import "react-testing-library/cleanup-after-each";
import React from "react";
import {Router} from "react-router-dom";
import {createMemoryHistory} from "history";
import {render, fireEvent} from "react-testing-library";
import Bookings from "./Bookings";
import * as BookingService from "../../services/bookingService";

beforeEach(() => {
    let sampleData = [
        {
            _id: "1",
            name: "ABC",
            contactName: "D",
            checkInDate: "12 Mar 2019",
            checkOutDate: "13 Mar 2019",
            numPax: 25,
            numRoom: 7,
            bookingStatus: "Confirmed"
        }, {
            _id: "2",
            name: "EFG",
            contactName: "H",
            checkInDate: "23 Mar 2018",
            checkOutDate: "25 Mar 2018",
            numPax: 12,
            numRoom: 4,
            bookingStatus: "Pending"
        }
    ];

    jest
        .spyOn(BookingService, "getBookings")
        .mockImplementation(() => sampleData);

    jest
        .spyOn(BookingService, "deleteBooking")
        .mockImplementation(id => {
            sampleData = sampleData.filter(item => item._id !== id);
        });
});

afterEach(() => {
    BookingService
        .getBookings
        .mockRestore();
});

describe("Bookings", () => {
    test("displays list of two bookings on load", () => {
        const history = createMemoryHistory({initialEntries: ["/"]});
        const {getAllByText} = render(
            <Router history={history}>
                <Bookings/>
            </Router>
        );

        expect(BookingService.getBookings).toHaveBeenCalledTimes(1);
        expect(getAllByText("Delete").length).toEqual(2);
    });

    test("when the delete button is clicked the booking row will be removed from the table", () => {
        const history = createMemoryHistory({initialEntries: ["/"]});
        const {getByText, queryByText} = render(
            <Router history={history}>
                <Bookings/>
            </Router>
        );
        const firstDeleteBtn = getByText("Delete");
        fireEvent.click(firstDeleteBtn);
        expect(queryByText(/ABC/i))
            .not
            .toBeInTheDocument();
    });

})
