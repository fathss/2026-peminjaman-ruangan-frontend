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

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: booking } = await bookingService.getBookingById(id);
        
        if (booking.status !== "Pending") {
          alert("Booking yang sudah diproses tidak dapat diubah");
          navigate(-1);
          return;
        }

        setFormData({
          purpose: booking.purpose,
          startTime: booking.startTime.slice(0, 16),
          endTime: booking.endTime.slice(0, 16),
          roomName: booking.roomName,
        });

        if (booking.roomId) {
          const { data: room } = await getRoomById(booking.roomId);
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
      alert(err.response?.data?.message || "Gagal memperbarui booking");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return { formData, roomDetails, loading, submitting, handleChange, handleSubmit };
}