import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ModernRoomAdminPage from './Components/AddRooms.jsx'
import DeleteRoomForm from './Components/DeleteRooms.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
  <App/>
   
  </BrowserRouter>
  </StrictMode>
  
  ,
)
