const express = require('express')
const router = express.Router()
router.use(express.urlencoded({ extended: true }))
router.use(express.json())
const cors = require('cors')
const sqlconnection = require('../Dbconnection')
router.use(cors())

router.get('/bookingDetails',async (req,res)=>{
   
    try {
        const [bookingData]=  await sqlconnection.execute(`Select booking_id,    Bookings.room_id,    customer_name, room_name,  payment_status, check_in_date, check_out_date from Bookings inner join Rooms where Bookings.room_id=Rooms.room_id and room_status='Booked'`)
        res.json({result:"success",bookingRecord:bookingData})
    } catch (error) {
        console.log(error)
        res.json({result:"error"})
    }
})

async function checkOutCustomer(room_id){
   await sqlconnection.execute("Update Rooms SET room_status='Available' where room_id=?",[room_id])
   await sqlconnection.execute("delete from  Bookings where room_id=?",[room_id])

}
router.post('/setcheckout',async (req,res)=>{
    try{
        const room_id=req.body.id
        console.log("ROom id " + JSON.stringify(req.body))
    await checkOutCustomer(room_id);
    res.json({result:"success"})}
    catch(error){
        console.log(error)
        res.json({result:"error"})
    }


})

module.exports=router