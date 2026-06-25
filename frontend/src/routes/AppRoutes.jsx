import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import AdminDashboard from "../pages/AdminDashboard";
import AdminProtectedRoute from "./AdminProtectedRoute";
import UserProtectedRoute from "./UserProtectedRoute";


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
        <Route path="/home" element={<UserProtectedRoute><Home /></UserProtectedRoute>}/>
        <Route path="/profile" element={<UserProtectedRoute><Profile /></UserProtectedRoute>}/>
        
      </Routes>
    </BrowserRouter>
  );
}