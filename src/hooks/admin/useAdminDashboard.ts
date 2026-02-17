import { useState, useEffect, useMemo } from "react";
import * as bookingService from "../../services/bookingService";
import * as roomService from "../../services/roomService";
import type { Booking, Room } from "../../types";
import { CalendarDays, Timer, Building2, XCircle } from "lucide-react";

export function useAdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [bookingsRes, roomsRes] = await Promise.all([
          bookingService.getAllBookings(),
          roomService.getAllRooms()
        ]);
        setBookings(bookingsRes.data);
        setRooms(roomsRes.data);
      } catch (err) {
        console.error("Dashboard Error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = useMemo(() => [
    { 
      label: "Total Peminjaman", 
      value: bookings.length.toString(), 
      icon: CalendarDays,
      color: "bg-blue-600" 
    },
    { 
      label: "Menunggu Persetujuan", 
      value: bookings.filter(b => b.status === "Pending").length.toString(), 
      icon: Timer, 
      color: "bg-amber-500" 
    },
    { 
      label: "Ruangan Tersedia", 
      value: rooms.filter(r => r.isActive).length.toString(), 
      icon: Building2, 
      color: "bg-emerald-500" 
    },
    { 
      label: "Peminjaman Ditolak", 
      value: bookings.filter(b => b.status === "Rejected").length.toString(), 
      icon: XCircle, 
      color: "bg-rose-500" 
    },
  ], [bookings, rooms]);

  const recentBookings = useMemo(() => 
    [...bookings].sort((a, b) => b.id - a.id).slice(0, 5)
  , [bookings]);

  return { stats, recentBookings, isLoading };
}