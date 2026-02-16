import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../layouts/Navbar";
import BackButton from "../../components/BackButton";
import { 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  FileText,
  ShieldCheck,
  AlertTriangle,
  Mail,
  Phone
} from "lucide-react";

function AdminBookingDetailPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const booking = {
    id: "BR-2026-001",
    room: "Lab Jaringan Komputer",
    gedung: "Gedung C (Teknik)",
    floor: "Lantai 3",
    requester: "Rizky Ramadhan",
    email: "rizky.r@univ.ac.id",
    purpose: "Praktikum Mandiri & Persiapan Lomba Cyber Security",
    startDate: "16 Feb 2026, 10:00",
    endDate: "16 Feb 2026, 14:00",
    status: "Pending",
    submittedAt: "14 Feb 2026, 09:15"
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />

      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <BackButton label="Kembali" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Kolom Kiri: Detail Utama */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-8 space-y-8">
                {/* Header Ruangan */}
                <div className="flex items-start gap-4">
                  <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Detail Ruangan</p>
                    <h3 className="text-2xl font-black text-gray-900">{booking.room}</h3>
                    <p className="text-gray-500 font-medium">{booking.gedung} • {booking.floor}</p>
                  </div>
                </div>

                <hr className="border-gray-50" />

                {/* Grid Informasi Waktu & Tujuan */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                    <p className="text-sm font-bold text-gray-800">{booking.endDate} WIB</p>
                  </div>
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <FileText size={12} /> Tujuan Kegiatan
                    </label>
                    <p className="text-sm font-medium text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100 italic">
                      "{booking.purpose}"
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Log Aktivitas Singkat */}
            <div className="bg-blue-900 rounded-[2rem] p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-blue-400" />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Waktu Pengajuan</p>
                  <p className="text-sm font-bold">{booking.submittedAt}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">ID Booking</p>
                <p className="font-mono text-sm">{booking.id}</p>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Profil Peminjam & Aksi */}
          <div className="space-y-6">
            {/* Kartu Profil Peminjam */}
            <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 space-y-6">
              <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 border-b pb-4">Profil Peminjam</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 font-bold">
                    {booking.requester.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">{booking.requester}</p>
                    {/* <p className="text-[10px] text-gray-400 font-medium">NIM: {booking.nim}</p> */}
                  </div>
                </div>
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-3 text-gray-500 hover:text-blue-600 transition-colors cursor-pointer">
                    <Mail size={14} />
                    <span className="text-xs font-medium">{booking.email}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Kartu Aksi Admin */}
            <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 space-y-4">
              <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Keputusan Admin</h4>
              
              {booking.status === "Pending" ? (
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-green-700 transition-all shadow-lg shadow-green-100">
                    <CheckCircle2 size={16} /> Setujui Peminjaman
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 bg-white text-red-600 border border-red-100 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-50 transition-all">
                    <XCircle size={16} /> Tolak Pengajuan
                  </button>
                </div>
              ) : (
                <div className={`p-4 rounded-xl text-center border ${
                  booking.status === 'Approved' ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'
                }`}>
                  <p className="text-[10px] font-black uppercase tracking-widest">Status Saat Ini</p>
                  <p className="font-bold">{booking.status}</p>
                </div>
              )}

              <div className="pt-2">
                <textarea 
                  placeholder="Tambahkan catatan untuk mahasiswa (opsional)..."
                  className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500 h-24 transition-all"
                ></textarea>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default AdminBookingDetailPage;