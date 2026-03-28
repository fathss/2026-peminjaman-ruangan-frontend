import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as bookingService from "../../services/bookingService";
import { useToast } from "../../context/ToastContext";

export function useBookingActions(id: string | undefined) {
  const { showToast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleCancel = async () => {
    if (!id) return false;
    try {
      setIsProcessing(true);
      await bookingService.cancelBooking(id);
      showToast({
        type: "success",
        message: "Booking Dibatalkan",
        description: "Peminjaman ruangan Anda telah berhasil dibatalkan."
      });
      navigate("/bookinghistory");
      return true;
    } catch (err: any) {
      showToast({
        type: "danger",
        message: "Gagal Membatalkan",
        description: err.response?.data?.message || "Terjadi kesalahan saat membatalkan booking."
      });
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const handleComplete = async () => {
    if (!id) return false;
    try {
      setIsProcessing(true);
      await bookingService.completeBooking(id);
      showToast({
        type: "success",
        message: "Booking Selesai",
        description: "Peminjaman ruangan telah ditandai sebagai selesai."
      });
      navigate("/bookinghistory");
      return true;
    } catch (err: any) {
      showToast({
        type: "danger",
        message: "Gagal Menyelesaikan",
        description: err.response?.data?.message || "Terjadi kesalahan saat menyelesaikan booking."
      });
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return { handleCancel, handleComplete, isProcessing };
}