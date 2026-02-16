import Navbar from "../../layouts/Navbar";
import BackButton from "../../components/BackButton";
import { 
  Building2, 
  MapPin, 
  Users, 
  AlignLeft, 
  PlusCircle,
  Check
} from "lucide-react";

function AddRoomPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Ruangan baru disimpan");
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />

      <main className="max-w-3xl mx-auto p-6">
        {/* Navigasi Kembali */}
        <BackButton to="/admin/dashboard" label="Kembali ke Dashboard Admin" mb="mb-4"/>

        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
          {/* Header Visual */}
          <div className="bg-blue-600 p-9 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl font-black tracking-tight">Tambah Ruangan</h2>
              <p className="text-blue-100 font-medium mt-1">Lengkapi detail informasi untuk mendaftarkan ruangan baru.</p>
            </div>

            <PlusCircle size={140} className="absolute -right-10 -bottom-10 text-white/10 rotate-12" />
          </div>

          <form onSubmit={handleSubmit} className="p-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Input: Nama Ruangan */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Building2 size={14} className="text-blue-600" /> Nama Ruangan
                </label>
                <input 
                  required
                  type="text" 
                  placeholder="Contoh: Gedung Serbaguna (GSG)"
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all font-semibold"
                />
              </div>

              {/* Input: Lokasi */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <MapPin size={14} className="text-blue-600" /> Lokasi / Gedung
                </label>
                <input 
                  required
                  type="text" 
                  placeholder="Contoh: Gedung D4, Lantai 2"
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all font-semibold"
                />
              </div>

              {/* Input: Kapasitas */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Users size={14} className="text-blue-600" /> Kapasitas Maksimal
                </label>
                <div className="relative">
                  <input 
                    required
                    type="number" 
                    placeholder="100"
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all font-semibold"
                  />
                  <span className="absolute right-5 top-4 text-xs font-bold text-gray-400 uppercase">Orang</span>
                </div>
              </div>

              {/* Input: Deskripsi */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <AlignLeft size={14} className="text-blue-600" /> Deskripsi Ruangan
                </label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Jelaskan fasilitas yang ada (AC, Wifi, Sound System, dll) atau aturan khusus ruangan ini..."
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all font-semibold"
                ></textarea>
              </div>
            </div>

            {/* Tombol Aksi */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                type="submit"
                className="flex-grow flex items-center justify-center gap-3 bg-blue-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95"
              >
                Simpan Ruangan <Check size={18} />
              </button>
              <button 
                type="button"
                onClick={() => window.history.back()}
                className="px-10 py-4 bg-white border border-gray-200 text-gray-400 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-gray-50 transition-all"
              >
                Batal
              </button>
            </div>
          </form>
        </div>

        {/* Info Tip */}
        <p className="mt-8 text-center text-xs text-gray-400 font-medium italic">
          * Ruangan yang Anda tambahkan akan langsung tersedia di daftar jelajah mahasiswa.
        </p>
      </main>
    </div>
  );
}

export default AddRoomPage;