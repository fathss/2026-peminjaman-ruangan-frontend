import { useNavigate } from "react-router-dom";
import Navbar from "../../layouts/Navbar";
import FormField from "../../components/FormField";
import FormTextArea from "../../components/FormTextArea";
import BookingSummary from "../../components/BookingSummary";
import { ArrowLeft, Send, Calendar, FileText, User } from "lucide-react";

function BookingFormPage() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Data dikirim");
    navigate("/history");
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />

      <main className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Tombol Kembali */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Kembali ke Daftar Ruangan
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Utama */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="mb-8">
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">Form Pengajuan Ruangan</h2>
                <p className="text-gray-500 text-sm mt-1 font-medium italic">
                  Pastikan data yang Anda masukkan sesuai dengan KTM berlaku.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Input Nama */}
                <FormField
                  label="Nama Lengkap / Penanggung Jawab"
                  type="text"
                  placeholder="Masukkan nama lengkap Anda..."
                  icon={<User size={18} />}
                  required
                />

                {/* Input Tujuan */}
                <FormTextArea
                  label="Tujuan Peminjaman"
                  placeholder="Contoh: Rapat Koordinasi UKM Seni..."
                  rows={3}
                  icon={<FileText size={18} />}
                  required
                />

                {/* Input Tanggal */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Tanggal Mulai"
                    type="datetime-local"
                    icon={<Calendar size={18} />}
                    required
                  />
                  <FormField
                    label="Tanggal Selesai"
                    type="datetime-local"
                    icon={<Calendar size={18} />}
                    required
                  />
                </div>

                {/* Tombol Submit */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95 mt-4"
                >
                  Kirim Pengajuan <Send size={16} />
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar Ringkasan (Kanan) */}
          <div className="lg:col-span-1">
            <BookingSummary
              roomName="Lab Jaringan Komputer"
              building="Gedung C (Teknik)"
              floor="Lantai 3"
              capacity={30}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default BookingFormPage;