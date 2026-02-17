import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as roomService from "../../services/roomService";

export function useRoomForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    capacity: "",
    description: "",
    isActive: true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        capacity: parseInt(formData.capacity)
      };

      await roomService.createRoom(payload);
      alert("Ruangan berhasil didaftarkan!");
      navigate("/rooms");
    } catch (error: any) {
      console.error("Gagal menambah ruangan:", error);
      alert(error.response?.data?.message || "Terjadi kesalahan saat menyimpan data.");
    } finally {
      setLoading(false);
    }
  };

  return { formData, loading, handleChange, handleSubmit };
}