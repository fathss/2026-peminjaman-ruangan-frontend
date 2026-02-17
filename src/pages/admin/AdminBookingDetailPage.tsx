import { useParams } from "react-router-dom";
import Navbar from "../../layouts/Navbar";
import BackButton from "../../components/BackButton";
import { 
  CheckCircle2, XCircle, Calendar, Clock, MapPin, 
  FileText, ShieldCheck, Mail, Loader2, Activity, ChevronRight 
} from "lucide-react";
import { useAdminBooking } from "../../hooks/admin/useAdminBooking";
import { formatFullDateTime } from "../../utils/dateFormatter";

const LABEL_CLASS = "text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2";
const INFO_VALUE = "text-sm font-bold text-gray-800";

function AdminBookingDetailPage() {
  const { id } = useParams();
  const { booking, history, loading, isProcessing, handleUpdateStatus } = useAdminBooking(id);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Loader2 className="animate-spin text-blue-600" size={40} />
    </div>
  );

  if (!booking) return <div className="p-10 text-center">Data booking tidak ditemukan</div>;

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />
      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <BackButton label="Kembali" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Detail Utama */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8 space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl"><MapPin size={28} /></div>
                <div>
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Detail Ruangan</p>
                  <h3 className="text-2xl font-black text-gray-900">{booking.roomName}</h3>
                  <p className="text-gray-500 font-medium">{booking.roomDescription || "Lokasi tidak dideskripsikan"}</p>
                </div>
              </div>

              <hr className="border-gray-50" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-1">
                  <label className={LABEL_CLASS}><Calendar size={12} /> Waktu Mulai</label>
                  <p className={INFO_VALUE}>{formatFullDateTime(booking.startTime)}</p>
                </div>
                <div className="space-y-1">
                  <label className={LABEL_CLASS}><Clock size={12} /> Waktu Selesai</label>
                  <p className={INFO_VALUE}>{formatFullDateTime(booking.endTime)}</p>
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className={LABEL_CLASS}><FileText size={12} /> Tujuan Kegiatan</label>
                  <p className="text-sm font-medium text-gray-700 italic bg-gray-50 p-4 rounded-xl border border-gray-100">
                    "{booking.purpose}"
                  </p>
                </div>
              </div>
            </div>

            {/* Riwayat Status */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8 space-y-6">
              <h4 className={LABEL_CLASS}><Activity size={16} /> Riwayat Perubahan Status</h4>
              <div className="space-y-4">
                {history.map((log, idx) => (
                  <div key={idx} className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 line-through">{log.oldStatus}</span>
                        <ChevronRight size={12} className="text-gray-400" />
                        <span className={`font-bold ${log.newStatus === 'Approved' ? 'text-green-600' : 'text-blue-600'}`}>
                          {log.newStatus}
                        </span>
                      </div>
                      <span className="text-gray-400 font-mono">{formatFullDateTime(log.changedAt)}</span>
                    </div>
                    <div className="flex items-center gap-2 pt-2 border-t border-gray-200/50">
                      <ShieldCheck size={12} className="text-blue-500" />
                      <p className="text-[10px] text-gray-500 italic">Oleh: <span className="font-bold text-gray-700">{log.changedBy || "System"}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar: Profil & Aksi */}
          <div className="space-y-6">
            <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 space-y-6">
              <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 border-b pb-4">Profil Peminjam</h4>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-black">
                  {booking.userName?.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">{booking.userName}</p>
                  <div className="flex items-center gap-2 text-gray-500 mt-1">
                    <Mail size={12} /> <span className="text-[10px]">{booking.userEmail}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 space-y-4">
              <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Keputusan Admin</h4>
              {booking.status === "Pending" ? (
                <div className="space-y-3">
                  <button 
                    disabled={isProcessing} 
                    onClick={() => handleUpdateStatus("Approve")}
                    className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-green-700 transition-all disabled:opacity-50"
                  >
                    {isProcessing ? <Loader2 className="animate-spin" size={16} /> : <CheckCircle2 size={16} />} Setujui
                  </button>
                  <button 
                    disabled={isProcessing} 
                    onClick={() => handleUpdateStatus("Reject")}
                    className="w-full flex items-center justify-center gap-2 bg-white text-red-600 border border-red-100 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-50 transition-all disabled:opacity-50"
                  >
                    {isProcessing ? <Loader2 className="animate-spin" size={16} /> : <XCircle size={16} />} Tolak
                  </button>
                </div>
              ) : (
                <div className="p-6 rounded-2xl text-center border-2 border-dashed bg-gray-50 border-gray-200">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Status</p>
                  <p className="font-black text-lg text-gray-700">{booking.status}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminBookingDetailPage;