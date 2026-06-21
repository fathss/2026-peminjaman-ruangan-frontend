import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as bookingService from "../../services/bookingService";
import { getRoomById } from "../../services/roomService";
import { useToast } from "../../context/ToastContext";

function extractDate(isoString: string): string {
  const d = new Date(isoString);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function extractTime(isoString: string): string {
  const d = new Date(isoString);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export function useEditBooking(id: string | undefined) {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    purpose: "",
    roomName: "",
  });

  const [roomDetails, setRoomDetails] = useState({
    location: "",
    capacity: 0
  });

  const [roomId, setRoomId] = useState(0);

  const [errors, setErrors] = useState({ startTime: "", endTime: "", purpose: "" })

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await bookingService.getBookingById(id);

        const roomBooking = res.data.booking;

        if (roomBooking.status !== "Pending") {
          showToast({
            type: "warning",
            message: "Akses Terbatas",
            description: "Peminjaman yang sudah diproses (Disetujui/Ditolak) tidak dapat diubah kembali."
          });
          navigate(-1);
          return;
        }

        setFormData({
          date: extractDate(roomBooking.startTime),
          startTime: extractTime(roomBooking.startTime),
          endTime: extractTime(roomBooking.endTime),
          roomName: roomBooking.roomName,
          purpose: roomBooking.purpose,
        });

        setRoomId(roomBooking.roomId);

        if (roomBooking.roomId) {
          const { data: room } = await getRoomById(roomBooking.roomId);
          setRoomDetails({
            location: room.location || "",
            capacity: room.capacity || 0
          });
        }
      } catch (err) {
        console.error("Gagal mengambil data:", err);
        navigate("/bookinghistory");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate, showToast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({ startTime: "", endTime: "", purpose: "" });

    if (!id) return;

    if (!formData.date || !formData.startTime || !formData.endTime) {
      setErrors((prev) => ({
        ...prev,
        startTime: !formData.date || !formData.startTime ? "Pilih tanggal dan waktu mulai" : prev.startTime,
        endTime: !formData.endTime ? "Pilih waktu selesai" : prev.endTime,
      }));
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        purpose: formData.purpose,
        startTime: new Date(`${formData.date}T${formData.startTime}`).toISOString(),
        endTime: new Date(`${formData.date}T${formData.endTime}`).toISOString()
      };

      await bookingService.updateBooking(id, payload);
      showToast({
        type: "success",
        message: "Update Berhasil",
        description: "Perubahan pada peminjaman ruangan Anda telah berhasil disimpan."
      });
      navigate("/bookinghistory");
    } catch (err: any) {
      const newErrors: any = {};

      const validationErrors = err.response?.data?.errors;
      if (validationErrors) {
        Object.keys(validationErrors).forEach((key) => {
          const fieldName = key.charAt(0).toLowerCase() + key.slice(1);
          newErrors[fieldName] = validationErrors[key][0];
        });
      }

      const errorMessage = err.response?.data?.message;
      if (errorMessage) {
        showToast({
          type: "danger",
          message: "Gagal Menyimpan",
          description: errorMessage,
        });
      }

      setErrors(newErrors);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTimeSlotChange = (date: string, startTime: string, endTime: string) => {
    setFormData((prev) => ({ ...prev, date, startTime, endTime }));
  };

  return { formData, roomDetails, roomId, loading, submitting, handleChange, handleTimeSlotChange, handleSubmit, errors };
}
