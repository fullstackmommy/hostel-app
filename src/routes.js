import React from 'react';
import DefaultLayout from './containers/DefaultLayout';

const Dashboard = React.lazy(() => import ('./views/Dashboard'));
const Users = React.lazy(() => import ('./views/Users/Users'));
const User = React.lazy(() => import ('./views/Users/User'));
const Bookings = React.lazy(() => import ('./components/Bookings/Bookings'));
const BookingForm = React.lazy(() => import ('./components/BookingForm/BookingForm'));
const BookingView = React.lazy(() => import ('./components/BookingView/BookingView'));
const RoomTable = React.lazy(() => import ('./components/Property/Rooms/RoomTable'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-rout
// er-config
const routes = [
  {
    path: '/',
    exact: true,
    name: 'Home',
    component: DefaultLayout
  }, {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  }, {
    path: '/users',
    exact: true,
    name: 'Users',
    component: Users
  }, {
    path: '/users/:id',
    exact: true,
    name: 'User Details',
    component: User
  }, {
    path: '/bookings',
    exact: true,
    name: 'Booking List',
    component: Bookings
  }, {
    path: '/bookings/new',
    exact: true,
    name: 'Create New Booking',
    component: BookingForm
  }, {
    path: '/bookings/:id/edit',
    exact: true,
    name: 'Edit Booking',
    component: BookingForm
  }, {
    path: '/bookings/:id',
    exact: true,
    name: 'View Booking',
    component: BookingView
  }, {
    path: '/rooms',
    exact: true,
    name: 'View Rooms',
    component: RoomTable
  }
];

export default routes;
