import Navbar from "../../layouts/Navbar";
import BackButton from "../../components/BackButton";
import StatusBadge from "../../components/StatusBadge";
import PageHeader from "../../components/PageHeader";
import { Search, Filter, ExternalLink, Loader2, Inbox, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useAllBookings } from "../../hooks/admin/useAdminAllBookings";
import { formatFullDateTime } from "../../utils/dateFormatter";

function AllBookingsPage() {
  const { 
    filteredBookings, loading, searchTerm, 
    setSearchTerm, statusFilter, setStatusFilter, refresh 
  } = useAllBookings();

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />

      <main className="max-w-7xl mx-auto p-6 space-y-6">
        <BackButton label="Kembali" />

        <PageHeader 
          title="Semua Peminjaman" 
          subtitle="Kelola dan tinjau seluruh riwayat pengajuan ruangan oleh user." 
        />

        {/* Search, Filter, & Refresh */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Cari Peminjam atau Ruangan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none shadow-sm transition-all font-medium"
            />
          </div>

          <div className="relative w-full md:w-64">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600" size={16} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-12 pr-10 py-3 bg-white border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none shadow-sm transition-all appearance-none font-bold text-gray-700 cursor-pointer"
            >
              {["All", "Pending", "Approved", "Rejected", "OnGoing", "Completed"].map(status => (
                <option key={status} value={status}>{status === "All" ? "Semua Status" : status}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>

          <button onClick={refresh} className="p-3.5 bg-white border border-gray-200 rounded-2xl text-gray-600 hover:bg-gray-50 shadow-sm active:scale-95">
            <Loader2 className={loading ? 'animate-spin' : ''} size={20} />
          </button>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                  <th className="px-8 py-5">ID & Peminjam</th>
                  <th className="px-8 py-5">Ruangan</th>
                  <th className="px-8 py-5">Waktu Penggunaan</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                   <tr><td colSpan={5} className="px-8 py-20 text-center"><Loader2 className="animate-spin mx-auto text-blue-600" size={32} /></td></tr>
                ) : filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => {
                    const [date, time] = formatFullDateTime(booking.startTime).split(', ');
                    return (
                      <tr key={booking.id} className="hover:bg-blue-50/30 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex flex-col">
                            <span className="text-[10px] font-mono font-bold text-blue-600">BRK-{booking.id}</span>
                            <span className="font-bold text-gray-800">{booking.userName}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex flex-col">
                            <span className="font-bold text-gray-700 text-sm">{booking.roomName}</span>
                            <span className="text-[10px] text-gray-400 uppercase font-black">{booking.roomDescription || 'No Description'}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex flex-col text-xs font-medium text-gray-500">
                            <span>{date}</span>
                            <span className="text-[10px] text-gray-400 font-bold">{time}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <StatusBadge status={booking.status} variant="label" />
                        </td>
                        <td className="px-8 py-6 text-right">
                          <Link to={`/admin/roombookings/detail/${booking.id}`} className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-600 hover:text-white transition-all">
                            <ExternalLink size={14} /> Kelola
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center text-gray-400">
                      <Inbox size={48} className="mx-auto mb-2 opacity-20" />
                      <p className="font-bold">Data tidak ditemukan</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AllBookingsPage;