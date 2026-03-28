import Navbar from "../../layouts/Navbar";
import BackButton from "../../components/BackButton";
import FormField from "../../components/FormField";
import FormTextArea from "../../components/FormTextArea";
import {
  Building2, MapPin, Users, AlignLeft,
  PlusCircle, Loader2, Plus
} from "lucide-react";
import { useRoomForm } from "../../hooks/admin/useAdminRoomForm";

const BTN_PRIMARY = "flex-[2] flex items-center justify-center gap-3 bg-blue-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
const BTN_SECONDARY = "w-full flex items-center justify-center py-4 bg-white border border-gray-200 text-gray-400 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-gray-50 transition-all";

function AddRoomPage() {
  const { formData, loading, handleChange, handleSubmit, errors } = useRoomForm();

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />

      <main className="max-w-3xl mx-auto p-6">
        <BackButton label="Kembali" mb="mb-4" />

        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-blue-600 p-9 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl font-black tracking-tight">Tambah Ruangan</h2>
              <p className="text-blue-100 font-medium mt-1">Lengkapi detail informasi untuk mendaftarkan ruangan baru.</p>
            </div>
            <PlusCircle size={140} className="absolute -right-10 -bottom-10 text-white/10 rotate-12" />
          </div>

          <form onSubmit={handleSubmit} className="p-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              <div className="md:col-span-2">
                <FormField
                  label="Nama Ruangan"
                  icon={<Building2 size={18} />}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Contoh: HH-301 / SAW-01.01"
                  error={errors.name}
                  required
                />
              </div>

              <div>
                <FormField
                  label="Lokasi / Gedung"
                  icon={<MapPin size={18} />}
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Contoh: Gedung D4, Lt. 2"
                  error={errors.location}
                  required
                />
              </div>

              <div>
                <FormField
                  label="Kapasitas Maksimal"
                  icon={<Users size={18} />}
                  name="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={handleChange}
                  placeholder="100"
                  error={errors.capacity}
                  required
                />
              </div>

              <div className="md:col-span-2">
                <FormTextArea
                  label="Deskripsi Ruangan"
                  icon={<AlignLeft size={18} />}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Contoh: Ruang Kelas / Theater / Lab"
                  error={errors.description}
                  rows={3}
                  required
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit" disabled={loading}
                className={BTN_PRIMARY}
              >
                {loading ? (
                  <>Memproses... <Loader2 className="animate-spin" size={18} /></>
                ) : (
                  <>Buat Ruangan <Plus size={18} /></>
                )}
              </button>
              <BackButton label="Batal" className={BTN_SECONDARY} mb="mb-0 flex-1" arrowIcon={false} />
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default AddRoomPage;