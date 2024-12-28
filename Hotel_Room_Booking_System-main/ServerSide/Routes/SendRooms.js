const express=require('express')
const router=express.Router()
router.use(express.urlencoded({ extended:true}))
router.use(express.json())
const cors=require('cors')
const sqlconnection=require('../Dbconnection')
router.use(cors())

router.get('/',async (req,res)=>{
    try {
        const [roomsArray]=await sqlconnection.execute("SELECT * from Rooms")
        console.log(roomsArray)
        res.json({result:"success",roomdata:{rooms:roomsArray}})

    } catch (error) {
        console.log(error)
        res.json({result:"fail"})
    }
})

module.exports=router