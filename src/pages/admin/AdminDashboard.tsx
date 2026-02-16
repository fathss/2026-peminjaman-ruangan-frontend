import { Link } from "react-router-dom";
import Navbar from "../../layouts/Navbar";
import PageHeader from "../../components/PageHeader";
import StatCard from "../../components/StatCard";
import { ChevronRight } from "lucide-react";
import type { Stat } from "../../types";

function AdminDashboard() {
  // Data statis untuk statistik
  const stats: Stat[] = [
    { label: "Total Peminjaman", value: "124", icon: "📅", color: "bg-blue-500" },
    { label: "Menunggu Persetujuan", value: "12", icon: "⏳", color: "bg-yellow-500" },
    { label: "Ruangan Tersedia", value: "8", icon: "🏢", color: "bg-green-500" },
    { label: "Peminjaman Ditolak", value: "3", icon: "❌", color: "bg-red-500" },
  ];

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
            <Link to="/admin/bookinghistory/all" className="text-sm text-blue-600 font-medium cursor-pointer hover:underline">
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
                  <th className="px-6 py-4">Aksi</th> 
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {/* Contoh Baris Statis */}
                {[1, 2, 3].map((_, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4 font-medium text-gray-800">User Contoh {i + 1}</td>
                    <td className="px-6 py-4 text-gray-600 text-sm">Ruang Meeting {i === 0 ? 'A' : 'B'}</td>
                    <td className="px-6 py-4 text-gray-500 text-sm">15 Feb 2026</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-yellow-100 text-yellow-700 uppercase">
                        Pending
                      </span>
                    </td>
                    {/* Tombol Aksi Detail */}
                    <td className="px-6 py-4 text-right">
                      <Link 
                        to={`/admin/roombookings/detail`} 
                        className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 group/link"
                      >
                        Detail 
                        <ChevronRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;