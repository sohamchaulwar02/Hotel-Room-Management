const db = require('./Dbconnection');  
async function insertCustomer(name,email,phno) {
  try {
    const [rows] = await db.execute('INSERT INTO Customers (customer_name, email, phone_number) VALUES (?, ?)', [name,email,phno]);
    console.log('Customer inserted successfully:', rows);
  } catch (err) {
    console.error('Error inserting customer:', err);
  }
}

async function insertRoom(roomName, roomPrice, roomStatus = 'Available') {
  try {
    const [rows] = await db.execute(
      'INSERT INTO Rooms (room_name, room_price, room_status) VALUES (?, ?, ?)', 
      [roomName, roomPrice, roomStatus]
    );
    console.log('Room inserted successfully:', rows);
  } catch (err) {
    console.error('Error inserting room:', err);
  }
}


     insertRoom('Deluxe Room', 1100);   
     insertRoom('Executive Room', 1500);
     insertRoom('Family Room', 2000);    
     insertRoom('Deluxe Room', 1250);    
     insertRoom('Executive Room', 1750); 
     insertRoom('Family Room', 2500);     
     insertRoom('Deluxe Room', 1350);    
     insertRoom('Executive Room', 1650); 


