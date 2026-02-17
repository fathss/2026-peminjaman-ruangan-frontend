import { 
  CalendarDays, ChevronRight, Clock, MapPin, Search, Loader2 
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../../layouts/Navbar";
import BackButton from "../../components/BackButton";
import { useBookingHistory } from "../../hooks/user/useBookingHistory";
import { getStatusStyle, getStatusIcon } from "../../utils/statusHelpers";

function BookingHistory() {
  const { filteredHistory, loading, searchTerm, setSearchTerm } = useBookingHistory();

  return (
    <div className="min-h-screen bg-gray-50/50 text-gray-900">
      <Navbar />

      <main className="max-w-6xl mx-auto p-6 space-y-6">
        <header className="space-y-4">
          <BackButton label="Kembali ke Dashboard" mb="" />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-3xl font-black tracking-tight text-gray-900">Riwayat Peminjaman</h2>
            
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Cari ruangan atau tujuan..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all w-full md:w-80 text-sm font-medium"
              />
            </div>
          </div>
        </header>

        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <LoadingState />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Informasi Ruangan</th>
                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Waktu & Tujuan</th>
                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredHistory.map((item) => (
                    <BookingRow key={item.id} item={item} />
                  ))}
                </tbody>
              </table>
              {!filteredHistory.length && <EmptyState />}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// Sub-Komponen untuk Baris Tabel
const BookingRow = ({ item }: { item: any }) => {
  const dateStr = new Date(item.startTime).toLocaleDateString("id-ID", {
    day: "numeric", month: "short", year: "numeric",
  });
  const timeStr = `${new Date(item.startTime).toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' })} - ${new Date(item.endTime).toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' })}`;

  return (
    <tr className="hover:bg-blue-50/30 transition-colors group">
      <td className="px-8 py-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gray-50 text-gray-400 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
            <MapPin size={20} />
          </div>
          <span className="font-bold text-gray-800 tracking-tight">{item.roomName}</span>
        </div>
      </td>
      <td className="px-8 py-6 text-sm">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-gray-700 font-bold">
            <CalendarDays size={14} className="text-blue-500" /> {dateStr}
          </div>
          <div className="flex items-center gap-2 text-gray-400 font-medium text-xs">
            <Clock size={14} /> {timeStr}
          </div>
          <p className="text-xs italic text-gray-400 truncate max-w-[180px]">"{item.purpose}"</p>
        </div>
      </td>
      <td className="px-8 py-6">
        <span className={`flex items-center gap-1.5 w-fit px-3 py-1.5 rounded-xl text-[10px] font-black uppercase border shadow-sm ${getStatusStyle(item.status)}`}>
          {getStatusIcon(item.status)}
          {item.status}
        </span>
      </td>
      <td className="px-8 py-6 text-right">
        <Link 
          to={`/roombookings/detail/${item.id}`} 
          className="p-2.5 bg-gray-50 text-gray-400 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all inline-flex items-center group/btn"
        >
          <span className="sr-only">Detail</span>
          <ChevronRight size={18} className="group-hover/btn:translate-x-0.5 transition-transform" />
        </Link>
      </td>
    </tr>
  );
};

const LoadingState = () => (
  <div className="flex flex-col items-center py-24 text-gray-400">
    <Loader2 className="animate-spin mb-4 text-blue-600" size={40} />
    <p className="font-black text-xs uppercase tracking-widest">Sinkronisasi Data...</p>
  </div>
);

const EmptyState = () => (
  <div className="text-center py-24">
    <CalendarDays size={64} className="mx-auto text-gray-100 mb-4" />
    <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight">Riwayat Kosong</h3>
    <p className="text-gray-400 text-sm mt-1">Belum ada aktivitas peminjaman yang ditemukan.</p>
  </div>
);

export default BookingHistory;