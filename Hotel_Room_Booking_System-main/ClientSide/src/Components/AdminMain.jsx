import { NavLink, Routes, Route } from 'react-router-dom';
import AdminPage from './AdminPage';
import AddRooms from './AddRooms';
import DeleteRoomForm from './DeleteRooms';
import AdminPage2 from './AdminPage2';

const AdminNavbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-semibold">Admin Dashboard</div>
        <ul className="flex space-x-4">
          <li>
            <NavLink
              to="./addRooms"
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              }
            >
              Insert Room
            </NavLink>
          </li>
          <li>
            <NavLink
              to="./removeRoom"
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              }
            >
              Delete Room
            </NavLink>
          </li>
          <li>
            <NavLink
              to="./paymentStatus"
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              }
            >
              Mark Payment Status
            </NavLink>
          </li>
          <li>
            <NavLink
              to="./roomcheckout"
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              }
            >
              Room Checkout
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const AdminMain = () => {
  return (
    <>
      <AdminNavbar />
      <Routes>
        <Route path="/paymentStatus" element={<AdminPage />} />
        <Route path="/removeRoom" element={<DeleteRoomForm />} />
        <Route path="/addRooms" element={<AddRooms />} />
        <Route path="/roomcheckout" element={<AdminPage2 />} />

      </Routes>
    </>
  );
};

export default AdminMain;