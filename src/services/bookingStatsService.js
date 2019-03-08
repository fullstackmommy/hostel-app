const bookingStats = [
  {
    _id: "PE",
    name: "Pending"
  }, {
    _id: "CO",
    name: "Confirmed"
  }, {
    _id: "CA",
    name: "Cancelled"
  }, {
    _id: "CL",
    name: "Closed"
  }
];

const defaultBookingStat = {
  _id: "ALL",
  name: "All"
}

export function getBookingStats() {
  return bookingStats;
}

export function getDefaultBookingStat() {
  return defaultBookingStat
}