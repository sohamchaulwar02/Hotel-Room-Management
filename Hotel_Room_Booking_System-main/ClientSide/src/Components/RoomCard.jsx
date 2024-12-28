import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const RoomCard = ({ room }) => {
  const navigate=useNavigate();
  const img1 = "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww"
  const img2 = "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww"
  const img3 = "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

  const whichImage = room.name == "Family Room" ? img3 : (room.name == "Deluxe Room" ? img1 : img2)

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={whichImage} alt={room.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold text-gray-800">{room.name}</h3>
          <span className={`text-sm font-medium px-2 py-1 rounded ${room.status === 'Available' ? 'bg-green-200 text-green-00' : 'bg-red-200 text-red-800'}`}>
            {room.status}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-2">Room No: {room.id+100}</p>
        <p className="text-2xl font-bold text-blue-600 mb-4">₹{room.price} <span className="text-sm font-normal text-gray-600">/ night</span></p>
        <div className="flex flex-wrap justify-between mb-4">
          <div className="flex items-center mr-4 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
              <path d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" />
            </svg>
            <span className="text-sm text-gray-600">{room.name=="Deluxe Room"?1+" King Bed":room.name=="Family Room"?"2 Beds":"1 Bed"}</span>
          </div>
          <div className="flex items-center mr-4 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            <span className="text-sm text-gray-600">{room.name=="Family Room"?4:2} Guests</span>
          </div>
        </div>
        <button 
        type="button"
        onClick={()=>{navigate(`/form/${room.id}/${room.name}/${room.price}`);}}
          className={`w-full font-bold py-2 px-4 rounded transition duration-300 ${
            room.status === 'Available' 
              ? 'bg-green-600 hover:bg-green-700 text-white' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={room.status !== 'Available'}
        >
          {room.status === 'Available' ? 'Book Now' : 'Not Available'}
        </button>
      </div>
    </div>
  )
}

export default function RoomList() {
  const [roomDetails, setRoomDetails] = useState([])

  useEffect(() => {
    async function getroom() {
      try {
        const response = await axios.get("http://localhost:3030/getRooms")
        if (response.data.result == "success") {
          console.log(response.data.roomdata.rooms)
          setRoomDetails(response.data.roomdata.rooms)
        }
      }
      catch (err) {
        console.log(err)
      }
    }
    getroom()
  }, [])

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-blue-100 to-purple-100 min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {roomDetails.map((room) => (
          <RoomCard 
            key={room.room_id} 
            room={{
              id: room.room_id,
              name: room.room_name, 
              price: room.room_price,
              status: room.room_status || '' 
            }} 
          />
        ))}
      </div>
    </div>
  )
}