import Navbar from "../../layouts/Navbar";
import BackButton from "../../components/BackButton";
import { 
  CalendarDays, 
  ChevronRight,
  Clock, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  Timer, 
  Filter,
  Search,
  ArrowLeft
} from "lucide-react";
import { Link } from "react-router-dom";

function BookingHistory() {
  const history = [
    { id: 1, room: "Ruang Meeting Utama", date: "22 Feb 2026", time: "09:00 - 11:00", purpose: "Presentasi Klien", status: "Approved" },
    { id: 2, room: "Lab Inovasi", date: "25 Feb 2026", time: "14:00 - 16:00", purpose: "Workshop Internal", status: "Pending" },
    { id: 3, room: "Aula Serbaguna", date: "10 Feb 2026", time: "08:00 - 17:00", status: "Rejected" },
    { id: 4, room: "Ruang Diskusi 1", date: "05 Feb 2026", time: "10:00 - 11:00", purpose: "Brainstorming", status: "Approved" },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-700 border-green-200';
      case 'Pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Rejected': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved': return <CheckCircle2 size={16} />;
      case 'Pending': return <Timer size={16} />;
      case 'Rejected': return <XCircle size={16} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 text-gray-900">
      <Navbar />

      <main className="max-w-5xl mx-auto p-6 space-y-6">
        {/* Header & Back Button */}
        <div className="flex flex-col gap-4">
          <BackButton to="/dashboard" label="Kembali ke Dashboard" mb=""/>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-3xl font-bold tracking-tight">Riwayat Peminjaman</h2>
            
            {/* Search/Filter Bar Statis */}
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-gray-200 shadow-sm">
              <Search size={18} className="text-gray-400" />
              <input 
                type="text" 
                placeholder="Cari ruangan..." 
                className="bg-transparent border-none outline-none text-sm w-full md:w-48"
              />
              <div className="h-4 w-[1px] bg-gray-200 mx-2"></div>
              <Filter size={18} className="text-gray-400 cursor-pointer hover:text-blue-600" />
            </div>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Informasi Ruangan</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Waktu & Tujuan</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {history.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <MapPin size={20} />
                      </div>
                      <span className="font-bold text-gray-800">{item.room}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-gray-700 font-medium">
                        <CalendarDays size={14} className="text-blue-500" /> {item.date}
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <Clock size={14} /> {item.time}
                      </div>
                      {item.purpose && (
                        <p className="text-xs italic text-gray-400 mt-1">"{item.purpose}"</p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`flex items-center gap-1.5 w-fit px-3 py-1 rounded-full text-[10px] font-black uppercase border ${getStatusStyle(item.status)}`}>
                      {getStatusIcon(item.status)}
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <Link 
                        to={`/roombookings/detail`} 
                        className="text-sm font-bold text-blue-600 hover:underline inline-flex items-center gap-1 group"
                    >
                        Detail
                        <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                   </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State Mockup */}
        {history.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
            <CalendarDays size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-bold text-gray-800">Belum ada riwayat</h3>
            <p className="text-gray-500">Peminjaman yang kamu lakukan akan muncul di sini.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default BookingHistory;