import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as bookingService from "../../services/bookingService";
import { getRoomById } from "../../services/roomService";

export function useEditBooking(id: string | undefined) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    purpose: "",
    startTime: "",
    endTime: "",
    roomName: "",
  });

  const [roomDetails, setRoomDetails] = useState({
    location: "",
    capacity: 0
  });

  const [errors, setErrors] = useState({ startTime: "", endTime: "", purpose: "" })

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await bookingService.getBookingById(id);

        const roomBooking = res.data.booking;

        if (roomBooking.status !== "Pending") {
          alert("Booking yang sudah diproses tidak dapat diubah");
          navigate(-1);
          return;
        }

        setFormData({
          purpose: roomBooking.purpose,
          startTime: roomBooking.startTime.slice(0, 16),
          endTime: roomBooking.endTime.slice(0, 16),
          roomName: roomBooking.roomName,
        });

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
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({ startTime: "", endTime: "", purpose: "" });

    if (!id) return;

    try {
      setSubmitting(true);
      const payload = {
        purpose: formData.purpose,
        startTime: new Date(formData.startTime).toISOString(),
        endTime: new Date(formData.endTime).toISOString()
      };

      await bookingService.updateBooking(id, payload);
      alert("Booking berhasil diperbarui");
      navigate("/bookinghistory");
    } catch (err: any) {
      const newErrors: any = {};

      const validationErrors = err.response.data.errors;
      if (validationErrors) {
        Object.keys(validationErrors).forEach((key) => {
          const fieldName = key.charAt(0).toLowerCase() + key.slice(1);

          let message = validationErrors[key][0];

          newErrors[fieldName] = message;
        })
      }

      const errorMessage = err.response.data.message
      if (errorMessage) {
        if (errorMessage.toLowerCase().includes("waktu mulai")) {
          newErrors["startTime"] = errorMessage;
        } else if (errorMessage.toLowerCase().includes("waktu selesai")) {
          newErrors["endTime"] = errorMessage;
        }
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

  return { formData, roomDetails, loading, submitting, handleChange, handleSubmit, errors };
}