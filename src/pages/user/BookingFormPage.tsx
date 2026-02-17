import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Calendar, FileText, Loader2 } from "lucide-react";
import Navbar from "../../layouts/Navbar";
import FormField from "../../components/FormField";
import FormTextArea from "../../components/FormTextArea";
import BookingSummary from "../../components/BookingSummary";
import { useCreateBooking } from "../../hooks/user/useCreateBooking";
import { parseLocation } from "../../utils/locationParser";

function BookingFormPage() {
  const navigate = useNavigate();
  const { 
    formData, 
    roomData, 
    isLoading, 
    isRoomLoading, 
    handleChange, 
    handleSubmit 
  } = useCreateBooking();

  const { building, floor } = parseLocation(roomData?.location);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />

      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Kembali ke Daftar Ruangan
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
              <div className="mb-8">
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">Form Pengajuan Ruangan</h2>
                <p className="text-gray-500 font-medium text-sm mt-1">Isi detail agenda penggunaan ruangan di bawah ini.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <FormTextArea
                  label="Tujuan Peminjaman"
                  name="purpose"
                  placeholder="Contoh: Rapat Koordinasi UKM Seni..."
                  rows={3}
                  value={formData.purpose}
                  onChange={handleChange}
                  icon={<FileText size={18} />}
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Tanggal Mulai"
                    name="startTime"
                    type="datetime-local"
                    value={formData.startTime}
                    onChange={handleChange}
                    icon={<Calendar size={18} />}
                    required
                  />
                  <FormField
                    label="Tanggal Selesai"
                    name="endTime"
                    type="datetime-local"
                    value={formData.endTime}
                    onChange={handleChange}
                    icon={<Calendar size={18} />}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg transition-all active:scale-95 mt-4 text-white
                    ${isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 shadow-blue-100"}`}
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <>Kirim Pengajuan <Send size={16} /></>
                  )}
                </button>
              </form>
            </div>
          </div>

          <aside className="lg:col-span-1">
            {isRoomLoading ? (
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                </div>
              </div>
            ) : roomData ? (
              <BookingSummary
                roomName={roomData.name}
                building={building}
                floor={floor}      
                capacity={roomData.capacity}
              />
            ) : (
              <div className="bg-red-50 text-red-500 p-4 rounded-2xl text-sm font-bold border border-red-100">
                Data ruangan tidak ditemukan.
              </div>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}

export default BookingFormPage;