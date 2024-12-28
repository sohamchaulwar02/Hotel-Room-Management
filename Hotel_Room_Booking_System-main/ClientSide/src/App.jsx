import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Routes,Route} from "react-router-dom"
import LandingPage from './Components/Landingpage'
import './App.css'
import RoomList from './Components/RoomCard'
import RoomBookingForm from './Components/BookingForm'
import AdminMain from './Components/AdminMain'
import AddRooms from './Components/AddRooms'

function App() {
  const [count, setCount] = useState(0)
  return (

  <> 
  <Routes>
    <Route path='/' element={<LandingPage/>}></Route>
    <Route path="/rooms" element={ <RoomList/>}/> 
    <Route path="/form/:id/:type/:price" element={<RoomBookingForm />} />
    <Route  path="/Admins/*" element={<AdminMain/>}/>
   
        </Routes>
  </>    
   
    
  )
}

export default App
