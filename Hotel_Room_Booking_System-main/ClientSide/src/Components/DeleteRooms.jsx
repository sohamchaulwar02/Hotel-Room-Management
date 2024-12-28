import React, { useState } from 'react';
import axios from 'axios';

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
  maxWidth: '400px',
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
  borderColor: '#e74c3c',
  outline: 'none',
};

const buttonStyle = {
  width: '100%',
  padding: '14px',
  backgroundColor: '#e74c3c',
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
  backgroundColor: '#c0392b',
};

export default function DeleteRoomForm() {
  const [roomId, setRoomId] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e) => {
    setRoomId(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      console.log(roomId);
      let response = await axios.post('http://localhost:3030/modifyrooms/deleterooms',{roomId})
      if (roomId) {
        console.log('Room to be deleted:', roomId);
        alert(`Room ${roomId} has been marked for deletion.`);
        setRoomId('');
      } else {
        alert('Please enter a Room ID');
      }
      
    } catch (error) {
      console.log(error);
      
      
    }
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h1 style={titleStyle}>Delete Room</h1>
        <input
          type="text"
          name="room_id"
          value={roomId}
          onChange={handleInputChange}
          placeholder="Enter Room ID"
          style={isFocused ? focusedInputStyle : inputStyle}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <button 
          type="submit" 
          style={isHovered ? buttonHoverStyle : buttonStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Delete Room
        </button>
      </form>
    </div>
  );
}