import { Link } from "react-router-dom";
import Navbar from "../../layouts/Navbar";
import PageHeader from "../../components/PageHeader";
import StatCard from "../../components/StatCard";
import StatusBadge from "../../components/StatusBadge";
import { ChevronRight, Loader2 } from "lucide-react";
import { useAdminDashboard } from "../../hooks/admin/useAdminDashboard";
import { formatFullDateTime } from "../../utils/dateFormatter";

function AdminDashboard() {
  const { stats, recentBookings, isLoading } = useAdminDashboard();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto p-6 space-y-8">
        <PageHeader
          title="Dashboard Admin"
          subtitle="Selamat datang kembali, berikut ringkasan data hari ini."
          action={{ label: "+ Tambah Ruangan", href: "/admin/rooms/add" }}
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Recent Activity Table Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-800">Peminjaman Terbaru</h3>
            <Link to="/admin/bookinghistory/all" className="text-sm text-blue-600 font-medium hover:underline">
              Lihat Semua
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50 text-gray-400 text-xs uppercase font-semibold">
                <tr>
                  <th className="px-6 py-4">Peminjam</th>
                  <th className="px-6 py-4">Ruangan</th>
                  <th className="px-6 py-4">Tanggal</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Aksi</th> 
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentBookings.length > 0 ? (
                  recentBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-800">{booking.userName}</div>
                        <div className="text-[10px] text-gray-400 font-mono tracking-tighter">ID: BRK-{booking.id}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-sm font-semibold">{booking.roomName}</td>
                      <td className="px-6 py-4 text-gray-500 text-sm">
                        {formatFullDateTime(booking.startTime).split(',')[0]} 
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={booking.status} />
                      </td>
                      {/* Tombol Aksi Detail */}
                      <td className="px-6 py-4 text-right">
                        <Link 
                          to={`/admin/roombookings/detail/${booking.id}`} 
                          className="text-sm font-black text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 group/link"
                        >
                          Detail 
                          <ChevronRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400 italic">
                      Belum ada data peminjaman yang masuk.
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

export default AdminDashboard;