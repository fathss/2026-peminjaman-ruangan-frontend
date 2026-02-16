import Navbar from "../../layouts/Navbar";
import BackButton from "../../components/BackButton";
import StatusBadge from "../../components/StatusBadge";
import PageHeader from "../../components/PageHeader";
import { Search, Filter, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import type { Booking } from "../../types";

function AllBookingsPage() {
  // Mock data peminjaman yang lebih lengkap
  const allBookings = [
    { id: "BR-001", user: "Rizky Ramadhan", room: "Lab Jaringan", date: "16 Feb 2026", status: "Pending", nim: "220103044" },
    { id: "BR-002", user: "Siti Aminah", room: "Aula Syahdan", date: "17 Feb 2026", status: "Approved", nim: "220103012" },
    { id: "BR-003", user: "Budi Santoso", room: "Kelas 402", date: "15 Feb 2026", status: "Rejected", nim: "220103055" },
    { id: "BR-004", user: "Andini Putri", room: "Theater Room", date: "18 Feb 2026", status: "Pending", nim: "220103099" },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />

      <main className="max-w-7xl mx-auto p-6 space-y-6">
        <BackButton to="/admin/dashboard" label="Kembali ke Dashboard" />

        <PageHeader title="Semua Peminjaman" subtitle="Kelola dan tinjau seluruh riwayat pengajuan ruangan." />

        {/* Search & Quick Filter */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Cari Peminjam / ID..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
            />
          </div>
          <button className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50">
            <Filter size={20} />
          </button>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left table-fixed">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                  <th className="px-8 py-5 w-1/4">Informasi Peminjam</th>
                  <th className="px-8 py-5 w-1/4">Ruangan & Waktu</th>
                  <th className="px-8 py-5 w-1/6">Status</th>
                  <th className="px-8 py-5 w-1/6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {allBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-800">{booking.user}</span>
                        <span className="text-xs text-gray-400 font-medium">NIM: {booking.nim}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-700 text-sm">{booking.room}</span>
                        <span className="text-xs text-gray-400">{booking.date}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <StatusBadge status={booking.status} variant="label" />
                    </td>
                    <td className="px-8 py-6 text-right">
                      <Link
                        to={`/admin/roombookings/detail`}
                        className="inline-flex items-center gap-2 bg-gray-50 text-gray-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                      >
                        <ExternalLink size={14} /> Detail
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Placeholder */}
          <div className="p-6 border-t border-gray-50 flex justify-between items-center bg-gray-50/30">
            <p className="text-xs text-gray-400 font-medium">Menampilkan 4 dari 124 data peminjaman</p>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold disabled:opacity-50" disabled>
                Prev
              </button>
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold">
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AllBookingsPage;