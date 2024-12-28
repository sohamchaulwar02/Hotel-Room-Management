import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerDetails = ({ customer, onUpdatePaymentStatus }) => (
  <tr className="bg-white border-b hover:bg-gray-50">
    <td className="px-6 py-4">{customer.customer_id}</td>
    <td className="px-6 py-4">{customer.customer_name}</td>
    <td className="px-6 py-4">{customer.room_id}</td>
    <td className="px-6 py-4">{customer.check_in_date.substring(0, 10)}</td>
    <td className="px-6 py-4">{customer.check_out_date.substring(0, 10)}</td>
    <td className="px-6 py-4">{customer.booking_id}</td>
    <td className="px-6 py-4">₹{customer.total_cost}</td>
    <td className="px-6 py-4">
      {customer.payment_status ? (
        <span className="text-green-600">Paid</span>
      ) : (
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => onUpdatePaymentStatus(customer.booking_id, true)} 
        >
          Mark as Paid
        </button>
      )}
    </td>
  </tr>
);

export default function AdminPage() {
  const [customerData, setCustomerData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  

  async function fetchCustomerData() {
    try {
      const response = await axios.get("http://localhost:3030/displaydetails")
      if (response.data.result === "success") {
        setCustomerData(response.data.customerRecord)
        console.log(response.data.customerRecord)
      } else {
        setError("Failed to fetch customer data")
      }
    } catch (err) {
      setError("An error occurred while fetching data")
    } finally {
      setIsLoading(false)
    }
  }


  useEffect(() => {
    fetchCustomerData()
    setIsLoading(false);
  }, []);

  const updatePaymentStatus = async (bookingId, newStatus) => {
    try {
      await axios.post(`http://localhost:3030/displaydetails/setPayment`, { payment_status: newStatus,id:bookingId});
          location.reload(true);
        
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
      <h1 className="text-2xl font-bold mb-4">Customer Bookings</h1>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Customer ID</th>
              <th scope="col" className="px-6 py-3">Customer Name</th>
              <th scope="col" className="px-6 py-3">Room</th>
              <th scope="col" className="px-6 py-3">Check-in Date</th>
              <th scope="col" className="px-6 py-3">Check-out Date</th>
              <th scope="col" className="px-6 py-3">Booking ID</th>
              <th scope="col" className="px-6 py-3">Total Cost</th>
              <th scope="col" className="px-6 py-3">Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {customerData && customerData.map((customer) => (
              <CustomerDetails
                key={customer.booking_id}
                customer={customer}
                onUpdatePaymentStatus={updatePaymentStatus}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
