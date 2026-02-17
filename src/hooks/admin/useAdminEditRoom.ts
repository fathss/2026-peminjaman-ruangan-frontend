import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as roomService from "../../services/roomService";

export function useEditRoom(id: string | undefined) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    capacity: "",
    description: "",
    isActive: true
  });

  useEffect(() => {
    if (!id) return;
    const fetchRoomData = async () => {
      try {
        setLoading(true);
        const { data: room } = await roomService.getRoomById(id);
        setFormData({
          name: room.name,
          location: room.location,
          capacity: room.capacity.toString(),
          description: room.description,
          isActive: room.isActive
        });
      } catch (error) {
        alert("Ruangan tidak ditemukan atau terjadi kesalahan.");
        navigate("/rooms");
      } finally {
        setLoading(false);
      }
    };
    fetchRoomData();
  }, [id, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleStatus = () => {
    setFormData(prev => ({ ...prev, isActive: !prev.isActive }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    
    try {
      setSubmitting(true);
      const payload = {
        ...formData,
        capacity: parseInt(formData.capacity)
      };
      await roomService.updateRoom(id, payload);
      alert("Perubahan berhasil disimpan!");
      navigate("/rooms");
    } catch (error: any) {
      alert(error.response?.data?.message || "Gagal memperbarui data.");
    } finally {
      setSubmitting(false);
    }
  };

  return { formData, loading, submitting, handleChange, toggleStatus, handleSubmit };
}