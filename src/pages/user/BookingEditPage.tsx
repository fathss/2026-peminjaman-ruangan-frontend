import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Loader2, Calendar, FileText } from "lucide-react";
import Navbar from "../../layouts/Navbar";
import FormField from "../../components/FormField";
import FormTextArea from "../../components/FormTextArea";
import BookingSummary from "../../components/BookingSummary";
import { useEditBooking } from "../../hooks/user/useEditBooking";

function BookingEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { formData, roomDetails, loading, submitting, handleChange, handleSubmit } = useEditBooking(id);

  const parseLocation = (location: string) => {
    if (!location) return { building: "-", floor: "-" };
    const parts = location.split(",");
    return {
      building: parts[0]?.trim() || location,
      floor: parts[1]?.trim() || "Lantai tidak spesifik"
    };
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Loader2 className="animate-spin text-blue-600" size={40} />
    </div>
  );

  const locationInfo = parseLocation(roomDetails.location || "");

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />

      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Batalkan Perubahan
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
              <div className="mb-8">
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">Edit Detail Booking</h2>
                <p className="text-gray-500 font-medium text-sm mt-1">
                  Ubah informasi agenda atau jadwal peminjaman Anda.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <FormTextArea
                  label="Tujuan Peminjaman"
                  name="purpose"
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
                  disabled={submitting}
                  className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg transition-all active:scale-95 mt-4 text-white
                    ${submitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 shadow-blue-100"}`}
                >
                  {submitting ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <>Simpan Perubahan <Save size={16} /></>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar Section */}
          <div className="lg:col-span-1">
            <BookingSummary
              roomName={formData.roomName}
              building={locationInfo.building}
              floor={locationInfo.floor}
              capacity={roomDetails.capacity || 0}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default BookingEditPage;