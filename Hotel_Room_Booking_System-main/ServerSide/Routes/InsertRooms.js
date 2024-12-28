const express = require('express')
const router = express.Router()
router.use(express.urlencoded({ extended: true }))
router.use(express.json())
const cors = require('cors')
const sqlconnection = require('../Dbconnection')
router.use(cors())

router.post('/addrooms', async (req, res) => {
    try {
        const {room_name, room_price, room_status } = req.body;
        console.log({ room_name, room_price, room_status }); 
        
        const [rows] = await sqlconnection.execute(
            'INSERT INTO Rooms (room_name, room_price,room_status) VALUES (?, ?, ?)',
            [room_name, room_price, room_status]
        );
        res.json({ response: "Data insertion successfull" })
    } catch (error) {
        console.log(error);
    }

})

router.post('/deleterooms', async (req,res)=>{
    try {
        const {roomId} = req.body;
        console.log({roomId});
    const [rows] = await sqlconnection.execute('DELETE FROM ROOMS WHERE room_id = ?',[roomId])
    if(rows.affectedRows>0){
        res.send({result:"Room Deletion Successfull"})
    }
    else{
        res.send({result:"Room Deletion Failed"})
    }
        
    } catch (error) {
        console.log(error);
        
    }
})



module.exports = router