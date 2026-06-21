import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../layouts/Navbar";
import Modal from "../../components/Modal";
import {
  ArrowLeft,
  Edit3,
  Calendar,
  Clock,
  User,
  FileText,
  Activity,
  Info,
  Loader2,
  XCircle,
  ChevronRight,
  AlertTriangle,
  CheckCircle2
} from "lucide-react";
import InfoItem from "../../components/InfoItem";
import { STATUS_CONFIG } from "../../constants/bookingDetailStatus";
import { formatFullDateTime } from "../../utils/dateFormatter";
import { useBookingDetail } from "../../hooks/user/useBookingDetail";
import { useBookingActions } from "../../hooks/user/useBookingActions";

function BookingDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");
  const { booking, history, loading, progress } = useBookingDetail(id);
  const { handleCancel, handleComplete, isProcessing } = useBookingActions(id);

  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    action: "Cancel" | "Complete" | null;
  }>({
    isOpen: false,
    action: null
  });

  const openModal = (action: "Cancel" | "Complete") => {
    setModalConfig({ isOpen: true, action });
  };

  const closeModal = () => {
    if (!isProcessing) {
      setModalConfig({ ...modalConfig, isOpen: false });
    }
  };

  const handleConfirmAction = async () => {
    if (!modalConfig.action) return;

    let success = false;
    if (modalConfig.action === "Cancel") {
      success = await handleCancel();
    } else {
      success = await handleComplete();
    }

    if (success) {
      setModalConfig({ isOpen: false, action: null });
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Loader2 className="animate-spin text-blue-600" size={40} />
    </div>
  );

  if (!booking) return <div className="p-10 text-center">Data tidak ditemukan</div>;

  const currentStatus = STATUS_CONFIG[booking.status] || STATUS_CONFIG.Pending;
  const StatusIcon = currentStatus.icon;
  const isCancelAction = modalConfig.action === "Cancel";

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />

      <main className="max-w-3xl mx-auto p-6 space-y-6">
        {/* Navigasi Atas */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft size={18} /> Kembali
            </button>

            {booking.status === "Pending" && userRole === "User" && (
              <button
                onClick={() => navigate(`/roombookings/edit/${id}`)}
                className="flex items-center gap-2 text-sm font-bold text-amber-600 hover:text-amber-700 transition-colors bg-amber-50 px-3 py-1 rounded-lg border border-amber-100"
              >
                <Edit3 size={16} /> Edit Booking
              </button>
            )}
          </div>

          <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${currentStatus.color}`}>
            <span className="relative flex h-2.5 w-2.5">
              {booking.status === "OnGoing" && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              )}
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${currentStatus.dot}`}></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest">{currentStatus.label}</span>
          </div>
        </div>

        {/* Kartu Detail Utama */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
          {booking.status === "OnGoing" && (
            <div className="w-full bg-gray-100 h-2">
              <div className="bg-blue-600 h-2 transition-all duration-1000" style={{ width: `${progress}%` }}></div>
            </div>
          )}

          <div className="p-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className={`p-4 rounded-2xl shadow-lg ${booking.status === 'OnGoing' ? 'bg-blue-600 shadow-blue-100 text-white' : 'bg-gray-100 text-gray-400 shadow-none'}`}>
                  <StatusIcon size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-gray-900">{booking.roomName}</h3>
                  <p className="text-gray-500 font-medium">{booking.roomDescription || "Lokasi Ruangan"}</p>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3 rounded-2xl border border-gray-100 text-right">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">ID Booking</p>
                <p className="font-mono font-bold text-gray-700">BRK-{booking.id}</p>
              </div>
            </div>

            <hr className="border-gray-50" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <InfoItem icon={<User size={12} />} label="Peminjam" value={booking.userName} />
              <InfoItem icon={<FileText size={12} />} label="Tujuan Kegiatan" value={booking.purpose} />
              <InfoItem icon={<Calendar size={12} />} label="Waktu Mulai" value={formatFullDateTime(booking.startTime)} />
              <InfoItem icon={<Clock size={12} />} label="Waktu Selesai" value={formatFullDateTime(booking.endTime)} />
            </div>

            {booking.status === "OnGoing" && (
              <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 flex gap-4">
                <Info size={24} className="text-amber-600 shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm font-bold text-amber-900">Informasi Penggunaan</p>
                  <p className="text-xs text-amber-700 leading-relaxed font-medium">Pastikan untuk menjaga kebersihan dan mematikan perangkat elektronik sebelum waktu peminjaman berakhir.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Riwayat Status */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8 space-y-6">
          <h4 className="text-lg font-black text-gray-900 flex items-center gap-2">
            <Activity size={20} className="text-blue-600" />
            Riwayat Status
          </h4>

          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gray-100">
            {history.length > 0 ? (
              history.map((log: any, index: number) => (
                <div key={index} className="relative flex items-start gap-4 pl-10">
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-400 line-through uppercase tracking-widest">
                          {log.oldStatus}
                        </span>
                        <ChevronRight size={12} className="text-black-300" />
                        <span className={`text-xs font-black uppercase tracking-widest ${index === 0 ? 'text-blue-600' : 'text-gray-600'}`}>
                          {log.newStatus}
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-400 font-bold">
                        {formatFullDateTime(log.changedAt)}
                      </span>
                    </div>
                    <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-50">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600 font-medium">
                          Status diubah menjadi <span className="font-bold">{log.newStatus}</span>
                        </p>
                        {log.changedBy && (
                          <div className="flex items-center gap-2 px-3 py-1 bg-white rounded-lg border border-gray-100 shadow-sm">
                            <User size={10} className="text-gray-400" />
                            <span className="text-[10px] font-bold text-gray-500">{log.changedBy}</span>
                          </div>
                        )}
                      </div>
                      {log.newStatus === "Rejected" && log.reason && (
                        <div className="mt-3 bg-red-50 rounded-xl p-3 border border-red-100">
                          <p className="text-[10px] font-black text-red-600 uppercase tracking-widest">Alasan Penolakan</p>
                          <p className="text-xs font-medium text-red-800 mt-1 italic">"{log.reason}"</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400 pl-10">Belum ada riwayat perubahan status.</p>
            )}
          </div>
        </div>

        {/* Footer Action */}
        <div className="flex flex-col items-center gap-6 py-8 border-t border-gray-100 mt-8">
          {(booking.status === "Pending" || booking.status === "Approved") && (
            <button
              onClick={() => openModal("Cancel")}
              disabled={isProcessing}
              className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
            >
              <XCircle size={14} />
              Batalkan Peminjaman
            </button>
          )}

          {booking.status === "OnGoing" && (
            <button
              onClick={() => openModal("Complete")}
              disabled={isProcessing}
              className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-blue-600 hover:text-blue-700 transition-colors disabled:opacity-50"
            >
              <CheckCircle2 size={14} />
              Selesaikan Peminjaman Lebih Awal
            </button>
          )}
        </div>
      </main>

      {/* Modal Konfirmasi */}
      <Modal
        isOpen={modalConfig.isOpen}
        onClose={closeModal}
        title={isCancelAction ? "Batalkan Peminjaman" : "Selesaikan Peminjaman"}
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
              disabled={isProcessing}
              onClick={handleConfirmAction}
              className={`px-6 py-3 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg flex items-center gap-2 disabled:opacity-50
                ${isCancelAction ? 'bg-red-600 hover:bg-red-700 shadow-red-100' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-100'}`}
            >
              {isProcessing ? (
                <>Memproses... <Loader2 className="animate-spin" size={16} /></>
              ) : (
                <>Konfirmasi {isCancelAction ? 'Batalkan' : 'Selesaikan'}</>
              )}
            </button>
          </div>
        }
      >
        <div className="flex items-center gap-4 text-gray-600">
          <div className={`p-4 rounded-2xl ${isCancelAction ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
            {isCancelAction ? <AlertTriangle size={32} /> : <CheckCircle2 size={32} />}
          </div>
          <div>
            <p className="font-bold text-gray-900">
              Apakah Anda yakin ingin {isCancelAction ? 'membatalkan' : 'menyelesaikan'} peminjaman ini?
            </p>
            <p className="text-sm">
              Tindakan ini akan mengubah status peminjaman untuk ruangan <span className="font-bold text-gray-800">{booking.roomName}</span>.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default BookingDetailPage;