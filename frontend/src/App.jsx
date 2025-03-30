import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { UserDashboard } from './user/UserDashboard';
import { AdminDashboard } from './admin/AdminDashboard';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;