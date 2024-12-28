create database hotel_room_booking;
use hotel_room_booking;
Create Table Rooms(
	room_id INT auto_increment primary key,
    room_name varchar(100),
    room_price decimal(10,2),
    room_status ENUM('Available','Booked','Under Maintenance ') 
    default "Available"
);


CREATE TABLE Bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    room_id INT,
    customer_name VARCHAR(100),
    check_in_date DATE,
    check_out_date DATE,
    booking_status ENUM('Pending', 'Confirmed', 'Cancelled') DEFAULT 'Pending',
    FOREIGN KEY (room_id) REFERENCES Rooms(room_id)
);


CREATE TABLE Customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100),
    email varchar(100)
);

CREATE TRIGGER after_booking_insert
AFTER 
INSERT ON Bookings
FOR EACH ROW
    UPDATE Rooms
    SET room_status = 'Booked'
    WHERE room_id = NEW.room_id ;
    
DELIMITER //
CREATE PROCEDURE calculate_total_cost (
    IN input_room_id INT,
    IN check_in DATE,
    IN check_out DATE,
    OUT total_cost DECIMAL(10, 0),
    OUT nights INT
)
BEGIN
    DECLARE price_per_night DECIMAL(10, 0);
    
    SELECT room_price 
    INTO price_per_night 
    FROM Rooms 
    WHERE room_id = input_room_id 
    LIMIT 1;
    SET nights = DATEDIFF(check_out, check_in);
    SET total_cost = price_per_night * nights;
END //
DELIMITER ;



DELIMITER //
CREATE PROCEDURE create_booking (
    IN customer_name VARCHAR(100),
    IN room_id INT,
    IN check_in_date DATE,
    IN check_out_date DATE,
    OUT booking_id INT,
    OUT total_cost DECIMAL(10, 0),
    INOUT nights INT
    
)
BEGIN

    CALL calculate_total_cost(room_id, check_in_date, check_out_date, total_cost,nights);
    

    INSERT INTO Bookings (room_id, customer_name, check_in_date, check_out_date, total_cost)
    VALUES (room_id, customer_name, check_in_date, check_out_date, total_cost);
    
    SET booking_id = LAST_INSERT_ID();
END //
DELIMITER ;



select * from Rooms;

ALTER TABLE Customers
ADD column phone_number BIGINT;

ALTER TABLE Customers
ADD UNIQUE (customer_name);

ALTER TABLE Bookings
ADD CONSTRAINT bookings_ibfk_2
FOREIGN KEY (customer_name) 
REFERENCES Customers(customer_name);
 
desc customers;

truncate table Bookings;
truncate table Customers;
select * from Bookings;
select * from Customers;
select * from Rooms;
show create table Bookings;
ALTER TABLE Bookings
DROP FOREIGN KEY bookings_ibfk_1;
ALTER TABLE Bookings
DROP FOREIGN KEY bookings_ibfk_2;

ALTER TABLE Bookings
ADD CONSTRAINT bookings_ibfk_1customers
FOREIGN KEY (room_id) REFERENCES Rooms(room_id)
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE Bookings
ADD CONSTRAINT bookings_ibfk_2
FOREIGN KEY (customer_name) REFERENCES Customers(customer_name)
ON DELETE CASCADE
ON UPDATE CASCADE;
drop procedure calculate_total_cost;
drop procedure create_booking;
alter table Bookings add column total_cost varchar(10);
select * from Bookings;
delete from Bookings where booking_id=2;
delete from Rooms where room_id;
alter table Bookings add column payment_status boolean;
ALTER TABLE Bookings 
MODIFY COLUMN payment_status BOOLEAN DEFAULT false;
update Bookings set payment_status=false where booking_id = 10;
select * from Customers;
Select Bookings.customer_name,total_cost,room_id,customers.email from Bookings join customers on Bookings.customer_name = customers.customer_name and booking_id = 10;
desc Bookings;
desc customers;

Select booking_id,    Bookings.room_id,    customer_name, room_name,  payment_status, check_in_date, check_out_date 
 from Bookings inner join Rooms where Bookings.room_id=Rooms.room_id and room_status='Booked';
