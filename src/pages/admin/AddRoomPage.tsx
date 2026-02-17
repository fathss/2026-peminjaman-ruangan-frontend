import { useNavigate } from "react-router-dom";
import Navbar from "../../layouts/Navbar";
import BackButton from "../../components/BackButton";
import { 
  Building2, MapPin, Users, AlignLeft, 
  PlusCircle, Check, Loader2 
} from "lucide-react";
import { useRoomForm } from "../../hooks/admin/useAdminRoomForm";

const INPUT_CLASS = "w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all font-semibold";
const BTN_PRIMARY = "flex-grow flex items-center justify-center gap-3 bg-blue-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
const BTN_SECONDARY = "px-10 py-4 bg-white border border-gray-200 text-gray-400 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-gray-50 transition-all";

function AddRoomPage() {
  const navigate = useNavigate();
  const { formData, loading, handleChange, handleSubmit } = useRoomForm();

  const FieldLabel = ({ icon: Icon, children }: any) => (
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
      <Icon size={14} className="text-blue-600" /> {children}
    </label>
  );

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />

      <main className="max-w-3xl mx-auto p-6">
        <BackButton label="Kembali" mb="mb-4"/>

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
              
              <div className="md:col-span-2 space-y-2">
                <FieldLabel icon={Building2}>Nama Ruangan</FieldLabel>
                <input 
                  required name="name" value={formData.name} onChange={handleChange}
                  type="text" placeholder="Contoh: HH-301 / SAW-01.01"
                  className={INPUT_CLASS}
                />
              </div>

              <div className="space-y-2">
                <FieldLabel icon={MapPin}>Lokasi / Gedung</FieldLabel>
                <input 
                  required name="location" value={formData.location} onChange={handleChange}
                  type="text" placeholder="Contoh: Gedung D4, Lt. 2"
                  className={INPUT_CLASS}
                />
              </div>

              <div className="space-y-2">
                <FieldLabel icon={Users}>Kapasitas Maksimal</FieldLabel>
                <div className="relative">
                  <input 
                    required name="capacity" value={formData.capacity} onChange={handleChange}
                    type="number" placeholder="100"
                    className={INPUT_CLASS}
                  />
                  <span className="absolute right-5 top-4 text-xs font-bold text-gray-400 uppercase">Orang</span>
                </div>
              </div>

              <div className="md:col-span-2 space-y-2">
                <FieldLabel icon={AlignLeft}>Deskripsi Ruangan</FieldLabel>
                <textarea 
                  required name="description" value={formData.description} onChange={handleChange}
                  rows={1} placeholder="Contoh: Ruang Kelas / Theater / Lab"
                  className={INPUT_CLASS}
                ></textarea>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                type="submit" disabled={loading}
                className={BTN_PRIMARY}
              >
                {loading ? (
                  <>Memproses... <Loader2 className="animate-spin" size={18} /></>
                ) : (
                  <>Simpan Ruangan <Check size={18} /></>
                )}
              </button>
              <button 
                type="button" onClick={() => navigate("/rooms")}
                className={BTN_SECONDARY}
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

export default AddRoomPage;