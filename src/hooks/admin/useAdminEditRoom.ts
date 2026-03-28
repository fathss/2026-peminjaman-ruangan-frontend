import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as roomService from "../../services/roomService";
import { useToast } from "../../context/ToastContext";

export function useEditRoom(id: string | undefined) {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    capacity: "",
    description: "",
    isActive: true
  });

  const [errors, setErrors] = useState({
    name: "",
    location: "",
    capacity: "",
    description: ""
  })

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
        showToast({
          type: "danger",
          message: "Gagal Mengambil Data",
          description: "Ruangan tidak ditemukan atau terjadi kesalahan."
        });
        navigate("/rooms");
      } finally {
        setLoading(false);
      }
    };
    fetchRoomData();
  }, [id, navigate, showToast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleStatus = () => {
    setFormData(prev => ({ ...prev, isActive: !prev.isActive }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({ name: "", location: "", capacity: "", description: "" });

    if (!id) return;

    try {
      setSubmitting(true);
      const payload = {
        ...formData,
        capacity: parseInt(formData.capacity)
      };
      await roomService.updateRoom(id, payload);
      showToast({
        type: "success",
        message: "Berhasil!",
        description: "Perubahan data ruangan telah disimpan."
      });
      navigate("/rooms");
    } catch (err: any) {
      const newErrors: any = {};

      const validationErrors = err.response?.data?.errors;
      if (validationErrors) {
        Object.keys(validationErrors).forEach((key) => {
          const fieldName = key.charAt(0).toLowerCase() + key.slice(1);
          let message = validationErrors[key][0];
          newErrors[fieldName] = message;
        })
      } else {
        showToast({
          type: "danger",
          message: "Gagal Menyimpan",
          description: err.response?.data?.message || "Terjadi kesalahan saat menyimpan data."
        });
      }

      setErrors(newErrors);
    } finally {
      setSubmitting(false);
    }
  };

  return { formData, loading, submitting, handleChange, toggleStatus, handleSubmit, errors };
}