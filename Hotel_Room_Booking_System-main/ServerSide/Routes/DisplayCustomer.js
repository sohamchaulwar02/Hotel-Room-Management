const express=require('express')
const router=express.Router()
router.use(express.urlencoded({ extended:true}))
router.use(express.json())
const cors=require('cors')
const sqlconnection=require('../Dbconnection')
const emailsender = require('../EmailFunction')
router.use(cors())
async function fetchdb(){
    const [getdetails] = await sqlconnection.execute("Select Bookings.customer_name,customer_id,payment_status,total_cost, booking_id,room_id,check_in_date,check_out_date,booking_status from Bookings inner join customers on Bookings.customer_name = customers.customer_name")
    

    console.log(JSON.stringify(getdetails)+"\n");

    return getdetails
    
}
router.get('/',async(req,res)=>{
    
    try{
    const details = await fetchdb()
    res.json({result:"success",customerRecord:details})
    }
    catch(err){
        res.json({result:"error"})
    }
})

router.post("/setPayment",async(req,res)=>{
    try {
        const id = req.body.id;
        const qeuryDetail=await sqlconnection.execute("Update Bookings SET payment_status=true where booking_id=? ",[id])
        const [emaildetails] = await sqlconnection.execute('Select Bookings.customer_name,total_cost,room_id,customers.email from Bookings join customers on Bookings.customer_name = customers.customer_name and booking_id = ?',[id])
        console.log(emaildetails[0].email,emaildetails[0].customer_name,emaildetails[0].room_id,id,emaildetails[0].total_cost);
        emailsender.payment_confirmation(emaildetails[0].email,emaildetails[0].customer_name,emaildetails[0].room_id,id,emaildetails[0].total_cost);
        res.json({res:"success"})
    } catch (error) {
        console.log(error);
    }
})

module.exports=router