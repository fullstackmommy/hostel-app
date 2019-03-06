const bookingStats = [
  {
    _id: "PE",
    name: "Pending"
  },
  {
    _id: "CO",
    name: "Confirmed"
  },
  {
    _id: "CA",
    name: "Cancelled"
  },
  {
    _id: "CL",
    name: "Closed"
  }
];

export function getBookingStats() {
  return bookingStats;
}