import { useState, useEffect } from "react";
import * as bookingService from "../../services/bookingService";
import type { Booking } from "../../types";

export function useUserDashboard() {
  const [myBookings, setMyBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const username = localStorage.getItem("username") || "Pengguna";

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const response = await bookingService.getAllBookings(); 

        const latest = response.data
          .sort((a: Booking, b: Booking) => b.id - a.id)
          .slice(0, 5);

        setMyBookings(latest);
      } catch (err) {
        console.error("Gagal memuat dashboard:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return { myBookings, isLoading, username };
}