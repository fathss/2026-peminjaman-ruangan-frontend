import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../layouts/Navbar";
import BackButton from "../../components/BackButton";
import { 
  Building2, MapPin, Users, AlignLeft, 
  Save, Loader2, Settings, ToggleLeft, ToggleRight 
} from "lucide-react";
import { useEditRoom } from "../../hooks/admin/useAdminEditRoom";

function EditRoomPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    formData, loading, submitting, 
    handleChange, toggleStatus, handleSubmit 
  } = useEditRoom(id);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <Loader2 className="animate-spin text-blue-600" size={40} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />

      <main className="max-w-3xl mx-auto p-6">
        <BackButton to="/rooms" label="Kembali ke Manajemen Ruangan" mb="mb-4"/>

        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
          {/* Header Visual */}
          <div className="bg-gray-900 p-9 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl font-black tracking-tight">Edit Ruangan</h2>
              <p className="text-gray-400 font-medium mt-1">Sesuaikan informasi atau status ketersediaan ruangan.</p>
            </div>
            <Settings size={140} className="absolute -right-10 -bottom-10 text-white/5 rotate-12" />
          </div>

          <form onSubmit={handleSubmit} className="p-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Toggle Status */}
              <div className="md:col-span-2 flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="space-y-1">
                  <p className="text-sm font-bold text-gray-800">Status Operasional</p>
                  <p className="text-xs text-gray-500">Nonaktifkan ruangan jika sedang dalam perbaikan.</p>
                </div>
                <button 
                  type="button" 
                  onClick={toggleStatus}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-bold text-xs uppercase tracking-widest
                    ${formData.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                >
                  {formData.isActive ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                  {formData.isActive ? "Aktif" : "Non-Aktif"}
                </button>
              </div>

              {/* Nama Ruangan */}
              <FormInput 
                label="Nama Ruangan" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                icon={<Building2 size={14} />} 
                fullWidth 
              />

              {/* Lokasi */}
              <FormInput 
                label="Lokasi / Gedung" 
                name="location" 
                value={formData.location} 
                onChange={handleChange} 
                icon={<MapPin size={14} />} 
              />

              {/* Kapasitas */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Users size={14} className="text-blue-600" /> Kapasitas Maksimal
                </label>
                <div className="relative">
                  <input 
                    required name="capacity" type="number" value={formData.capacity} onChange={handleChange}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all font-semibold"
                  />
                  <span className="absolute right-5 top-4 text-xs font-bold text-gray-400 uppercase">Orang</span>
                </div>
              </div>

              {/* Deskripsi */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <AlignLeft size={14} className="text-blue-600" /> Deskripsi Ruangan
                </label>
                <textarea 
                  required name="description" rows={1} value={formData.description} onChange={handleChange}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all font-semibold"
                />
              </div>
            </div>

            {/* Tombol Aksi */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                type="submit" disabled={submitting}
                className="flex-grow flex items-center justify-center gap-3 bg-gray-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-gray-200 hover:bg-black transition-all active:scale-95 disabled:opacity-50"
              >
                {submitting ? <Loader2 className="animate-spin" size={18} /> : <><Save size={18} /> Simpan Perubahan</>}
              </button>
              <button 
                type="button" onClick={() => navigate("/rooms")}
                className="px-10 py-4 bg-white border border-gray-200 text-gray-400 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-gray-50 transition-all"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

// Sub-component sederhana untuk Input agar kode di atas tidak repetitif
function FormInput({ label, name, value, onChange, icon, fullWidth = false, type = "text" }: any) {
  return (
    <div className={`${fullWidth ? "md:col-span-2" : ""} space-y-2`}>
      <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
        <span className="text-blue-600">{icon}</span> {label}
      </label>
      <input 
        required name={name} type={type} value={value} onChange={onChange}
        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all font-semibold"
      />
    </div>
  );
}

export default EditRoomPage;