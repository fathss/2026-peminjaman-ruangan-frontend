import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as bookingService from "../../services/bookingService";

export function useBookingActions(id: string | undefined) {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleCancel = async () => {
    if (!window.confirm("Apakah Anda yakin ingin membatalkan peminjaman ini?")) return;
    try {
      setIsProcessing(true);
      await bookingService.cancelBooking(id!);
      alert("Booking berhasil dibatalkan");
      navigate("/bookinghistory");
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal membatalkan");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleComplete = async () => {
    if (!window.confirm("Apakah Anda yakin ingin menyelesaikan peminjaman ini?")) return;
    try {
      setIsProcessing(true);
      await bookingService.completeBooking(id!);
      alert("Booking berhasil diselesaikan");
      navigate("/bookinghistory");
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal menyelesaikan");
    } finally {
      setIsProcessing(false);
    }
  };

  return { handleCancel, handleComplete, isProcessing };
}