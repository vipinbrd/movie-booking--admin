import React, { useEffect, useState } from 'react';
import { Url } from './Url';

export const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${Url}/api/bookings`)
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching bookings:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center text-xl p-8">Loading bookings...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">All Bookings</h1>
      <div className="grid gap-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="border rounded-xl shadow-sm p-4 flex items-center gap-4 bg-white"
          >
            <img
              src={booking.movie.posterUrl}
              alt={booking.movie.name}
              className="w-24 h-36 object-cover rounded-md"
            />
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{booking.movie.name}</h2>
              <p className="text-gray-600">{booking.movie.description}</p>
              <p className="mt-1 text-sm">
                <span className="font-medium">Genre:</span> {booking.movie.genre}
              </p>
              <p className="text-sm">
                <span className="font-medium">Language:</span> {booking.movie.language}
              </p>
              <p className="text-sm">
                <span className="font-medium">Showtime:</span>{' '}
                {new Date(booking.showtime.dateTime).toLocaleString()}
              </p>
              {booking.bookingDate && (
                <p className="text-sm text-green-700">
                  <span className="font-medium">Booked on:</span>{' '}
                  {new Date(booking.bookingDate).toLocaleString()}
                </p>
              )}
              <p className="text-sm">
                <span className="font-medium">Tickets:</span>{' '}
                {booking.ticketsBooked ?? 'N/A'}
              </p>
            </div>
            <div className="text-right text-sm text-gray-700">
              <p>
                <span className="font-medium">User:</span> {booking.userName}
              </p>
              <p>
                <span className="font-medium">Email:</span> {booking.userEmail}
              </p>
              <p>
                <span className="font-medium">Phone:</span> {booking.userPhone}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


