import { useState, useEffect, useCallback } from "react";
import * as bookingService from "../../services/bookingService";
import type { Booking, StatusHistory } from "../../types";
import { useToast } from "../../context/ToastContext";

export function useAdminBooking(id: string | undefined) {
  const { showToast } = useToast();
  const [booking, setBooking] = useState<Booking>();
  const [history, setHistory] = useState<StatusHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const fetchData = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);

      const res = await bookingService.getBookingById(id);

      const roomDetailData = res.data.booking;
      const roomHistoryData = res.data.histories;

      setBooking(roomDetailData);
      setHistory(roomHistoryData);
    } catch (err) {
      console.error("Gagal mengambil data:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const handleUpdateStatus = async (action: "Approve" | "Reject") => {
    if (!id) return false;

    try {
      setIsProcessing(true);
      if (action === "Approve") await bookingService.approveBooking(id);
      else await bookingService.rejectBooking(id);

      showToast({
        type: "success",
        message: action === "Approve" ? "Peminjaman Disetujui" : "Peminjaman Ditolak",
        description: `Status peminjaman berhasil diperbarui menjadi ${action === "Approve" ? "Approved" : "Rejected"}.`
      });

      await fetchData();
      return true;
    } catch (err: any) {
      showToast({
        type: "danger",
        message: "Gagal Memperbarui",
        description: err.response?.data?.message || "Terjadi kesalahan saat memperbarui status."
      });
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => { fetchData(); }, [fetchData]);

  return { booking, history, loading, isProcessing, handleUpdateStatus };
}