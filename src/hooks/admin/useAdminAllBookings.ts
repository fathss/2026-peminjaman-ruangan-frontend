import { useState, useEffect, useMemo } from "react";
import * as bookingService from "../../services/bookingService";
import type { Booking } from "../../types";

export function useAllBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await bookingService.getAllBookings();
      const sortedData = response.data.sort((a: any, b: any) => b.id - a.id);
      setBookings(sortedData);
    } catch (error) {
      console.error("Gagal mengambil data peminjaman:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchesSearch = 
        booking.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.roomName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "All" || booking.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [bookings, searchTerm, statusFilter]);

  return {
    filteredBookings,
    loading,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    refresh: fetchBookings
  };
}