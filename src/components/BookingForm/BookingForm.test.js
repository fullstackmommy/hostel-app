import "jest-dom/extend-expect";
import "react-testing-library/cleanup-after-each";
import React from "react";
import {render} from "react-testing-library";
import BookingForm from "./BookingForm";
import {fireEvent} from "react-testing-library/dist";

const match = {
    params: {
        id: 1
    }
}
const returnPath = "/bookings"
const errorMessage = /is not allowed to be empty/i;

describe("BookingForm", () => {
    test("displays all form fields on load", () => {

        const {getByLabelText} = render(<BookingForm match ={match} returnPath={returnPath}/>);

        expect(getByLabelText("Name")).toHaveAttribute("type", "text");
        expect(getByLabelText("Contact Name")).toHaveAttribute("type", "text");
        // expect(getByLabelText("Check In Date")).toHaveAttribute("type", "date");
        // expect(getByLabelText("Check Out Date")).toHaveAttribute("type", "date");
        expect(getByLabelText("Num of Pax")).toHaveAttribute("type", "number");
        expect(getByLabelText("Booking Status")).toBeInTheDocument();
    });

    test("shows Save button is disabled on page load", () => {
        const {getByText} = render(<BookingForm match ={match} returnPath={returnPath}/>);

        expect(getByText("Save")).toHaveAttribute("disabled")
    })

    test("displays no error message when it first loads", () => {

        const {queryByText} = render(<BookingForm match ={match} returnPath={returnPath}/>);

        expect(queryByText(errorMessage))
            .not
            .toBeInTheDocument()
    })

    test("displays error message when text input is invalid and remove the message when va" +
            "lid",
    () => {
        const {getByText, getByLabelText, queryByText} = render(<BookingForm match ={match} returnPath={returnPath}/>);
        const inputLabel = getByLabelText(/name/i);

        fireEvent.change(inputLabel, {
            target: {
                value: "a"
            }
        })
        fireEvent.change(inputLabel, {
            target: {
                value: ""
            }
        })

        expect(getByText(errorMessage)).toBeInTheDocument()

        fireEvent.change(inputLabel, {
            target: {
                value: "test"
            }
        })

        expect(queryByText(errorMessage))
            .not
            .toBeInTheDocument()
    })
})
