import { useState, useEffect, useCallback } from "react";
import * as bookingService from "../../services/bookingService";
import type { Booking, StatusHistory } from "../../types";

export function useAdminBooking(id: string | undefined) {
  const [booking, setBooking] = useState<Booking>();
  const [history, setHistory] = useState<StatusHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const fetchData = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      const [detailRes, historyRes] = await Promise.all([
        bookingService.getBookingById(id),
        bookingService.getBookingHistory(id)
      ]);
      setBooking(detailRes.data);
      setHistory(historyRes.data);
    } catch (err) {
      console.error("Gagal mengambil data:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const handleUpdateStatus = async (action: "Approve" | "Reject") => {
    if (!id) return;
    const confirmMsg = action === "Approve" ? "Setujui peminjaman ini?" : "Tolak peminjaman ini?";
    if (!window.confirm(confirmMsg)) return;

    try {
      setIsProcessing(true);
      if (action === "Approve") await bookingService.approveBooking(id);
      else await bookingService.rejectBooking(id);
      
      alert(`Berhasil melakukan ${action}`);
      await fetchData();
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal memperbarui status");
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => { fetchData(); }, [fetchData]);

  return { booking, history, loading, isProcessing, handleUpdateStatus };
}