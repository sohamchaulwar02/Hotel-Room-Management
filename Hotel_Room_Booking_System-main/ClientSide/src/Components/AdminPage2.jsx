import AdminPage from "./AdminPage";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingDetails = ({ booking, onUpdateCheckOutStatus, handleClosePopup,showPopup}) => (
    <>
  <tr className="bg-white border-b hover:bg-gray-50">
    <td className="px-6 py-4">{booking.booking_id}</td>
    <td className="px-6 py-4">{booking.customer_name}</td>
    <td className="px-6 py-4">{booking.room_id}</td>
    <td className="px-6 py-4">{booking.room_name}</td>
    <td className="px-6 py-4">{booking.check_in_date.substring(0, 10)}</td>
    <td className="px-6 py-4">{booking.check_out_date.substring(0, 10)}</td>
    <td className="px-6 py-4">
      {booking.room_status ? (
          <span className="text-green-600">Checked out</span>
        ) : (
            <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => onUpdateCheckOutStatus(booking.room_id)} 
            >
          Check Out
        </button>
      )}
    </td>
  </tr>
  {showPopup && (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h3 className="text-  lg font-semibold mb-4">Checkout Confirmation</h3>
            <p className="mb-6">Customer {booking.customer_name} has checked out</p>
            <button
              onClick={handleClosePopup}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Close
            </button>
          </div>
          </div>)}
    </>
);

 function AdminPage2() {
  const [bookingData, setBookingData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false)

  
  const handleClosePopup = () => {
    setShowPopup(false)
    location.reload(true)
  }
  async function fetchBookingData() {

    try {
      const response = await axios.get("http://localhost:3030/checkOut/bookingDetails")
      if (response.data.result === "success") {
        setBookingData(response.data.bookingRecord)
        console.log(response.data.bookingRecord)
      } else {
        setError("Failed to fetch  data")
      }
    } catch (err) {
      setError("An error occurred while fetching data")
    } finally {
      setIsLoading(false)
    }
  }


  useEffect(() => {
    fetchBookingData()
  }, []);

  const updateCheckOut = async (roomId) => {
    try {
      const response= await axios.post('http://localhost:3030/checkOut/setcheckout', { id:roomId});
        if(response.data.result=='success'){
            setShowPopup(true)
        }
        else{
            alert("Error occured")
        }
    } catch (err) {
      console.error("Error updating payment status", err);
    }
  };

  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Customer Checkouts</h1>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Booking ID</th>
              <th scope="col" className="px-6 py-3">Customer Name</th>
              <th scope="col" className="px-6 py-3">Room</th>
              <th scope="col" className="px-6 py-3">Room Type</th>
              <th scope="col" className="px-6 py-3">Check-in Date</th>
              <th scope="col" className="px-6 py-3">Check-out Date</th>
              <th scope="col" className="px-6 py-3">Check Out Status</th>
            </tr>
          </thead>
          <tbody>
            {bookingData && bookingData.map((booking) => (
              <BookingDetails
                key={booking.booking_id}
                booking={booking}
                onUpdateCheckOutStatus={updateCheckOut}
                handleClosePopup={handleClosePopup}
                showPopup={showPopup}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


export default AdminPage2;