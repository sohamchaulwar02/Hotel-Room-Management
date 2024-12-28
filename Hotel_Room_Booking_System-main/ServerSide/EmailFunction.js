require('dotenv').config();
const nodemailer = require('nodemailer');

const sendConfirmationEmail = (customerEmail, customerName, bookingDetails, nights, booking_id, total_cost) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });


  let mailOptions = {
    from: '"Hotel Booking" <' + process.env.EMAIL_USER + '>',
    to: customerEmail,
    subject: 'Booking Confirmation', html: `<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #003366;
            color: white;
            padding: 20px;
            text-align: center;
        }
        .content {
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 5px;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 0.8em;
            color: #666;
        }
        img {
            max-width: 100%;
            height: auto;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Booking Confirmation</h1>
    </div>
    <div class="content">
        <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Hotel Image" style="width: 100%; max-width: 600px; height: auto;">
        <h2>Hello, ${customerName}!</h2>
        <p>Thank you for booking with us. Here are your booking details:</p>
        <p><strong>Room:</strong> ${bookingDetails.room}</p>
        <p><strong>Check-in Date:</strong> ${bookingDetails.checkinDate}</p>
        <p><strong>Check-out Date:</strong> ${bookingDetails.checkoutDate}</p>
        <p><strong>Number of Nights:</strong> ${nights}</p>
        <p><strong>Booking ID:</strong> ${booking_id}</p>
        <p><strong>Total Cost:</strong> ${total_cost}</p>
        <p>We look forward to hosting you!</p>
    </div>
    <div class="footer">
        <p>Best regards,<br>Hotel Booking Team</p>
        <p>If you have any questions, please contact us at ${process.env.EMAIL_USER}</p>
    </div>
</body>
</html>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log('Error sending email: ', error);
    }
    console.log('Email sent: ' + info.response);
  });
};

const payment_confirmation = (customerEmail, customerName, rooms, booking_id, total_cost) => {
  console.log(customerEmail);

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });



  let mailOptions = {
    from: '"Hotel Booking" <' + process.env.EMAIL_USER + '>',
    to: customerEmail,
    subject: 'Payment Confirmation', html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Confirmation</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f0f8f0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <tr>
            <td style="padding: 30px; text-align: center;">
<div style="background-color: transparent; width: 100; height: 100; border-radius: 50%; margin: 0 auto 20px;">
                  <img src="https://cdn.pixabay.com/photo/2017/01/13/01/22/ok-1976099_1280.png" width="100px" height="100px"></img>
                </div>
                <h2 style="color: #4CAF50; font-size: 24px; margin-bottom: 10px;">₹ ${total_cost}</h2>
                <p style="font-size: 20px; margin-bottom: 20px;">Payment Successful!</p>
                <p style="font-size: 14px; color: #666; margin-bottom: 20px;">A confirmation email has been sent to ${customerEmail}</p>
                <table width="100%" cellpadding="10" cellspacing="0" style="border-top: 1px solid #eee; border-bottom: 1px solid #eee; margin-bottom: 20px;">
                    <tr>
                        <td style="font-weight: bold;">Customer Name:</td>
                        <td>${customerName}</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold;">Room:</td>
                        <td>${rooms}</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold;">Booking ID:</td>
                        <td>${booking_id}</td>
                    </tr>
                </table>
              
            </td>
        </tr>
    </table>
</body>
</html>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log('Error sending email: ', error);
    }
    console.log('Email sent: ' + info.response);
  });
};



module.exports = { sendConfirmationEmail, payment_confirmation };