import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../layouts/Navbar";
import BackButton from "../../components/BackButton";
import Modal from "../../components/Modal";
import {
  CheckCircle2, XCircle, Calendar, Clock, MapPin,
  FileText, ShieldCheck, Mail, Loader2, Activity, ChevronRight,
  AlertCircle
} from "lucide-react";
import { useAdminBooking } from "../../hooks/admin/useAdminBookingDetail";
import { formatFullDateTime } from "../../utils/dateFormatter";

const LABEL_CLASS = "text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2";
const INFO_VALUE = "text-sm font-bold text-gray-800";

function AdminBookingDetailPage() {
  const { id } = useParams();
  const { booking, history, loading, isProcessing, handleUpdateStatus } = useAdminBooking(id);
  const [modalConfig, setModalConfig] = useState<{ isOpen: boolean; action: "Approve" | "Reject" | null }>({
    isOpen: false,
    action: null
  });
  const [rejectReason, setRejectReason] = useState("");

  const openModal = (action: "Approve" | "Reject") => {
    setRejectReason("");
    setModalConfig({ isOpen: true, action });
  };

  const closeModal = () => {
    if (!isProcessing) {
      setModalConfig({ ...modalConfig, isOpen: false });
    }
  };

  const handleConfirmAction = async () => {
    if (!modalConfig.action) return;
    const success = await handleUpdateStatus(modalConfig.action, rejectReason || undefined);
    if (success) {
      setModalConfig({ isOpen: false, action: null });
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Loader2 className="animate-spin text-blue-600" size={40} />
    </div>
  );

  if (!booking) return <div className="p-10 text-center">Data booking tidak ditemukan</div>;

  const isApprove = modalConfig.action === "Approve";

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
                {history.length > 0 ? (
                  history.map((log, idx) => (
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
                      {log.newStatus === "Rejected" && log.reason && (
                        <div className="mt-2 bg-red-50 rounded-xl p-3 border border-red-100">
                          <p className="text-[10px] font-black text-red-600 uppercase tracking-widest">Alasan Penolakan</p>
                          <p className="text-xs font-medium text-red-800 mt-1 italic">"{log.reason}"</p>
                        </div>
                      )}
                      <div className="flex items-center gap-2 pt-2 border-t border-gray-200/50">
                        <ShieldCheck size={12} className="text-blue-500" />
                        <p className="text-[10px] text-gray-500 italic">Oleh: <span className="font-bold text-gray-700">{log.changedBy || "System"}</span></p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-400 pl-6">Belum ada riwayat perubahan status.</p>
                )}
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
                    onClick={() => openModal("Approve")}
                    className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-green-700 transition-all disabled:opacity-50"
                  >
                    <CheckCircle2 size={16} /> Setujui
                  </button>
                  <button
                    disabled={isProcessing}
                    onClick={() => openModal("Reject")}
                    className="w-full flex items-center justify-center gap-2 bg-white text-red-600 border border-red-100 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-50 transition-all disabled:opacity-50"
                  >
                    <XCircle size={16} /> Tolak
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

      <Modal
        isOpen={modalConfig.isOpen}
        onClose={closeModal}
        title={isApprove ? "Setujui Peminjaman" : "Tolak Peminjaman"}
        footer={
          <div className="flex gap-3">
            <button
              disabled={isProcessing}
              onClick={closeModal}
              className="px-6 py-3 bg-white border border-gray-200 text-gray-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-50 transition-all disabled:opacity-50"
            >
              Batal
            </button>
            <button
              disabled={isProcessing || (modalConfig.action === "Reject" && !rejectReason.trim())}
              onClick={handleConfirmAction}
              className={`px-6 py-3 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg flex items-center gap-2 disabled:opacity-50
                ${isApprove ? 'bg-green-600 hover:bg-green-700 shadow-green-100' : 'bg-red-600 hover:bg-red-700 shadow-red-100'}`}
            >
              {isProcessing ? (
                <>Memproses... <Loader2 className="animate-spin" size={16} /></>
              ) : (
                <>{isApprove ? 'Setujui' : 'Tolak'}</>
              )}
            </button>
          </div>
        }
      >
        <div className="flex items-center gap-4 text-gray-600">
          <div className={`p-4 rounded-2xl ${isApprove ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
            <AlertCircle size={32} />
          </div>
          <div className="flex-1">
            <p className="font-bold text-gray-900">
              Apakah Anda yakin ingin {isApprove ? 'menyetujui' : 'menolak'} peminjaman ini?
            </p>
            <p className="text-sm">
              Tindakan ini akan memperbarui status peminjaman untuk ruangan <span className="font-bold text-gray-800">{booking.roomName}</span>.
            </p>
            {modalConfig.action === "Reject" && (
              <div className="mt-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Alasan Penolakan <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Masukkan alasan mengapa peminjaman ini ditolak..."
                  className="w-full mt-2 p-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium resize-none focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-300"
                  rows={3}
                  maxLength={500}
                />
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default AdminBookingDetailPage;