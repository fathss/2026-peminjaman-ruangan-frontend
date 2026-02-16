import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddRoomPage from "./pages/admin/AddRoomPage";
import AdminBookingDetailPage from "./pages/admin/AdminBookingDetailPage";
import AllBookingsPage from "./pages/admin/AllBookingsPage";
import LoginPage from "./pages/user/LoginPage";
import RegisterPage from "./pages/user/RegisterPage";
import UserDashboard from "./pages/user/UserDashboard";
import RoomPage from "./pages/user/RoomPage";
import BookingHistory from "./pages/user/BookingHistory";
import BookingFormPage from "./pages/user/BookingFormPage";
import BookingDetailPage from "./pages/user/BookingDetailPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/roombookings/detail" element={<AdminBookingDetailPage />} />
      <Route path="/admin/rooms/add" element={<AddRoomPage />} />
      <Route path="/admin/bookinghistory/all" element={<AllBookingsPage />} />
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/rooms" element={<RoomPage />} />
      <Route path="/roombookings/add" element={<BookingFormPage />} />
      <Route path="/roombookings/detail" element={<BookingDetailPage />} />
      <Route path="/bookinghistory" element={<BookingHistory />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default AppRoutes;