import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as bookingService from "../../services/bookingService";
import { getRoomById } from "../../services/roomService";
import type { Room } from "../../types/index";

export function useCreateBooking() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId");

  const [isLoading, setIsLoading] = useState(false);
  const [isRoomLoading, setIsRoomLoading] = useState(true);
  const [roomData, setRoomData] = useState<Room>();

  const [formData, setFormData] = useState({
    startTime: "",
    endTime: "",
    purpose: "",
  });

  useEffect(() => {
    const fetchRoomDetail = async () => {
      if (!roomId) return;
      try {
        setIsRoomLoading(true);
        const response = await getRoomById(roomId);
        setRoomData(response.data);
      } catch (err) {
        console.error("Gagal mengambil detail ruangan:", err);
      } finally {
        setIsRoomLoading(false);
      }
    };
    fetchRoomDetail();
  }, [roomId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomId || roomId === "0") {
      alert("Ruangan tidak valid!");
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        roomId: parseInt(roomId),
        startTime: new Date(formData.startTime).toISOString(),
        endTime: new Date(formData.endTime).toISOString(),
        purpose: formData.purpose,
      };

      await bookingService.createBooking(payload);
      alert("Pengajuan berhasil dikirim!");
      navigate("/bookinghistory");
    } catch (err: any) {
      alert(err.response?.data?.message || "Terjadi kesalahan saat memesan.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    roomData,
    isLoading,
    isRoomLoading,
    handleChange,
    handleSubmit,
    roomId
  };
}