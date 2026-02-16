import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../layouts/Navbar";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  FileText,
  Activity, // Ikon untuk ongoing
  Info
} from "lucide-react";

function BookingDetailPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  // Data statis dengan status 'Ongoing'
  const booking = {
    id: "BR-2026-001",
    room: "Lab Jaringan Komputer",
    gedung: "Gedung C (Teknik)",
    floor: "Lantai 3",
    requester: "Rizky Ramadhan (NIM: 220103044)",
    purpose: "Praktikum Mandiri & Persiapan Lomba Cyber Security",
    startDate: "16 Feb 2026, 10:00",
    endDate: "16 Feb 2026, 14:00",
    status: "Ongoing", 
    usageProgress: 65, // Contoh persentase waktu yang sudah terpakai
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />

      <main className="max-w-3xl mx-auto p-6 space-y-6">
        {/* Navigasi Atas */}
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft size={18} /> Kembali
          </button>
          
          {/* Badge Ongoing dengan Pulse Animation */}
          <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
            </span>
            <span className="text-xs font-black text-blue-700 uppercase tracking-widest">Sedang Berlangsung</span>
          </div>
        </div>

        {/* Kartu Detail Utama */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
          
          {/* Progress Bar Waktu Penggunaan */}
          <div className="w-full bg-gray-100 h-2">
            <div 
              className="bg-blue-600 h-2 transition-all duration-1000" 
              style={{ width: `${booking.usageProgress}%` }}
            ></div>
          </div>

          <div className="p-8 space-y-8">
            {/* Info Ruangan & Status Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="p-4 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-100">
                  <Activity size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-gray-900">{booking.room}</h3>
                  <p className="text-gray-500 font-medium">{booking.gedung} • {booking.floor}</p>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3 rounded-2xl border border-gray-100 text-right">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">ID Booking</p>
                <p className="font-mono font-bold text-gray-700">{booking.id}</p>
              </div>
            </div>

            <hr className="border-gray-50" />

            {/* Grid Informasi */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <User size={12} /> Peminjam
                </label>
                <p className="text-sm font-bold text-gray-800">{booking.requester}</p>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <FileText size={12} /> Tujuan Kegiatan
                </label>
                <p className="text-sm font-bold text-gray-800">{booking.purpose}</p>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Calendar size={12} /> Waktu Mulai
                </label>
                <p className="text-sm font-bold text-gray-800">{booking.startDate} WIB</p>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Clock size={12} /> Waktu Selesai
                </label>
                <p className="text-sm font-bold text-gray-800 text-blue-600">{booking.endDate} WIB</p>
              </div>
            </div>

            {/* Warning Box untuk Ongoing */}
            <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 flex gap-4">
              <div className="text-amber-600">
                <Info size={24} />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-amber-900">Informasi Penggunaan</p>
                <p className="text-xs text-amber-700 leading-relaxed font-medium">
                  Anda sedang menggunakan ruangan ini. Pastikan untuk menjaga kebersihan dan mematikan perangkat elektronik sebelum waktu peminjaman berakhir pada jam 14:00 WIB.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="flex justify-center">
           <button className="text-xs font-black uppercase tracking-[0.2em] text-red-500 hover:text-red-700 transition-colors">
              Selesaikan Peminjaman Lebih Awal
           </button>
        </div>
      </main>
    </div>
  );
}

export default BookingDetailPage;