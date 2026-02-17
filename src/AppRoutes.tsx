import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddRoomPage from "./pages/admin/AddRoomPage";
import EditRoomPage from "./pages/admin/EditRoomPage";
import AdminBookingDetailPage from "./pages/admin/AdminBookingDetailPage";
import AllBookingsPage from "./pages/admin/AllBookingsPage";
import LoginPage from "./pages/shared/LoginPage";
import RegisterPage from "./pages/shared/RegisterPage";
import UserDashboard from "./pages/user/UserDashboard";
import RoomPage from "./pages/shared/RoomPage";
import BookingHistory from "./pages/user/BookingHistory";
import BookingFormPage from "./pages/user/BookingFormPage";
import BookingDetailPage from "./pages/user/BookingDetailPage";
import BookingEditPage from "./pages/user/BookingEditPage";

function AppRoutes() {
  return (
    <Routes>
      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/rooms/add" element={<AddRoomPage />} />
      <Route path="/admin/rooms/edit/:id" element={<EditRoomPage />} />
      <Route path="/admin/roombookings/detail/:id" element={<AdminBookingDetailPage />} />
      <Route path="/admin/bookinghistory/all" element={<AllBookingsPage />} />

      {/* User Routes */}
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/roombookings/add" element={<BookingFormPage />} />
      <Route path="/roombookings/detail/:id" element={<BookingDetailPage />} />
      <Route path="/roombookings/edit/:id" element={<BookingEditPage />} />
      <Route path="/bookinghistory" element={<BookingHistory />} />

      {/* Shared Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/rooms" element={<RoomPage />} />
    </Routes>
  );
}

export default AppRoutes;