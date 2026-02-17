import { useState, useEffect, useMemo } from "react";
import * as bookingService from "../../services/bookingService";
import type { Booking } from "../../types";

export function useBookingHistory() {
  const [history, setHistory] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const response = await bookingService.getAllBookings();
        const sortedData = response.data.sort((a: Booking, b: Booking) => b.id - a.id);
        setHistory(sortedData);
      } catch (error) {
        console.error("Gagal mengambil riwayat:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);
  
  const filteredHistory = useMemo(() => {
    return history.filter(item => 
      item.roomName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.purpose.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, history]);

  return { filteredHistory, loading, searchTerm, setSearchTerm };
}