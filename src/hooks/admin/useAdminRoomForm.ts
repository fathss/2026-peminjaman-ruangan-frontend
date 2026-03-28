import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as roomService from "../../services/roomService";
import { useToast } from "../../context/ToastContext";

export function useRoomForm() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [loading, setLoading] = useState(false);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({ name: "", location: "", capacity: "", description: "" });

    setLoading(true);

    try {
      const payload = {
        ...formData,
        capacity: parseInt(formData.capacity)
      };

      await roomService.createRoom(payload);
      showToast({
        type: "success",
        message: "Ruangan Terdaftar",
        description: `Ruangan "${formData.name}" berhasil ditambahkan ke sistem.`
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
          message: "Gagal Mendaftarkan",
          description: err.response?.data?.message || "Terjadi kesalahan saat menyimpan data."
        });
      }

      setErrors(newErrors);
    } finally {
      setLoading(false);
    }
  };

  return { formData, loading, handleChange, handleSubmit, errors };
}
