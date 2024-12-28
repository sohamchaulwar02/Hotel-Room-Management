const express=require('express')
const router=express.Router()
router.use(express.urlencoded({ extended:true}))
router.use(express.json())
const cors=require('cors')
const sqlconnection=require('../Dbconnection')
const emailsender=require('../EmailFunction')
router.use(cors())

async function total_costing(){
    await sqlconnection.execute()
}

async function customerData(name,email,phoneNumber){
    try
    {
    await sqlconnection.execute('insert into Customers(customer_name,email,phone_number) values(?,?,?)',[name,email,phoneNumber])}

    catch(err){
        console.log(err)
        throw err;
    }
}

async function Bookingdata(name, roomid, checkindate, checkoutdate) {
    try {
        const [rows] = await sqlconnection.execute(
            'CALL create_booking(?, ?, ?, ?, @booking_id, @total_cost, @nights)', 
            [name, roomid, checkindate, checkoutdate]
        );

        const [output] = await sqlconnection.execute('SELECT @booking_id AS booking_id, @total_cost AS total_cost,@nights AS nights');
        console.log('Booking ID:', output[0].booking_id);
        console.log('Total Cost:', output[0].total_cost);
        console.log('Number of Nights:', output[0].nights);
        return output[0];
    } catch (err) {
        console.log(err);
        throw err;
    }
}



router.post('/',async(req,res)=>{
    const a= {customerName,email,roomId,checkInDate,checkOutDate,bookingStatus,phoneNumber}=req.body
    let phoneNumber2=BigInt(phoneNumber) 
       console.log(phoneNumber)

    await customerData(customerName,email,phoneNumber2)
    const data = await Bookingdata(customerName,roomId,checkInDate,checkOutDate,bookingStatus)
    await emailsender.sendConfirmationEmail(email,customerName,{checkoutDate:checkOutDate,checkinDate:checkInDate,room:roomId},data.nights,data.booking_id,data.total_cost)
    console.log(a)
    res.json({result:"success"})
    
})
module.exports=router