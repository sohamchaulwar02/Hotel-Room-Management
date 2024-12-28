import React, { useState } from 'react';
import axios from "axios"
import { Route } from 'react-router-dom';

const getRef = (refType) => refType.current.value;


const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  width: '100%',
  padding: '20px',
  boxSizing: 'border-box',
  backgroundColor: '#f0f4f8',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const formStyle = {
  backgroundColor: '#ffffff',
  padding: '30px',
  borderRadius: '12px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '600px',
};

const titleStyle = {
  color: '#2c3e50',
  marginBottom: '30px',
  fontSize: '28px',
  fontWeight: 'bold',
  textAlign: 'center',
};

const inputStyle = {
  width: '100%',
  padding: '12px',
  marginBottom: '20px',
  border: '2px solid #e0e0e0',
  borderRadius: '8px',
  fontSize: '16px',
  transition: 'border-color 0.3s',
};

const focusedInputStyle = {
  ...inputStyle,
  borderColor: '#3498db',
  outline: 'none',
};

const selectStyle = {
  ...inputStyle,
  appearance: 'none',
  backgroundImage: "url(\"data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E\")",
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 12px top 50%',
  backgroundSize: '12px auto',
};

const buttonStyle = {
  width: '100%',
  padding: '14px',
  backgroundColor: '#3498db',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontSize: '18px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

const buttonHoverStyle = {
  ...buttonStyle,
  backgroundColor: '#2980b9',
};

export default function AddRooms() {
  const [newRoom, setNewRoom] = useState({
    room_name: '',
    room_price: '',
    room_status: 'available',
  });

  const [isHovered, setIsHovered] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRoom(prevRoom => ({
      ...prevRoom,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(newRoom);
        let response = await axios.post('http://localhost:3030/modifyrooms/addrooms',newRoom)
        console.log(response);
        

        if (newRoom.room_name && newRoom.room_price) {
            // Here you would typically send this data to your backend API
            console.log('New room added:', newRoom);
            alert('Room added successfully!');
            setNewRoom({
              room_name: '',
              room_price: '',
              room_status: 'available',
            });
          } else {
            alert('Please fill in all fields');
          } 
    } catch (error) {
        console.log(error);
        
        
    }
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h1 style={titleStyle}>Add New Room</h1>
        <select
          name="room_name"
          value={newRoom.room_name}
          onChange={handleInputChange}
          style={selectStyle}
        >
          <option value="">Select Room Type</option>
          <option value="Deluxe Room">Deluxe Room</option>
          <option value="Family Room">Family Room</option>
          <option value="Executive Room">Executive Room</option>
        </select>
        <input
          type="number"
          name="room_price"
          value={newRoom.room_price}
          onChange={handleInputChange}
          placeholder="Room Price"
          style={focusedInput === 'room_price' ? focusedInputStyle : inputStyle}
          onFocus={() => setFocusedInput('room_price')}
          onBlur={() => setFocusedInput(null)}
        />  
        <select
          name="room_status"
          value={newRoom.room_status}
          onChange={handleInputChange}
          style={selectStyle}
        >
          <option value="available">Available</option>
          <option value="booked">Booked</option>
        </select>
        <button 
          type="submit" 
          style={isHovered ? buttonHoverStyle : buttonStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Add Room
        </button>
      </form>
    </div>
  );
}