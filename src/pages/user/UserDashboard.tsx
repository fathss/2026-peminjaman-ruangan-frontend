import Navbar from "../../layouts/Navbar";
import { Link } from "react-router-dom";
import BookingCard from "../../components/BookingCard";
import { ClipboardList, Lightbulb, Search, Info } from "lucide-react";
import type { Booking } from "../../types";

function UserDashboard() {
  const myBookings: Booking[] = [
    { id: "1", room: "Ruang Kreatif", date: "16 Feb 2026", time: "10:00 - 12:00", status: "Approved" },
    { id: "2", room: "Lab Komputer", date: "18 Feb 2026", time: "13:00 - 15:00", status: "Pending" },
    { id: "3", room: "Aula Utama", date: "20 Feb 2026", time: "08:00 - 17:00", status: "Rejected" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2">Halo, Pengguna!</h2>
            <p className="text-blue-100 mb-6 max-w-md text-lg">
              Ingin mengadakan rapat atau acara? Cari ruangan yang tersedia dan ajukan peminjaman sekarang.
            </p>
            <Link
              to="/rooms"
              className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-blue-50 transition-all flex items-center gap-2 w-fit active:scale-95 text-sm"
            >
              <Search size={18} />
              Cari Ruangan
            </Link>
          </div>
          <div className="absolute top-[-20px] right-[-20px] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Riwayat Peminjaman */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <ClipboardList className="text-blue-600" size={24} />
              Riwayat Peminjaman Saya
            </h3>

            <div className="grid gap-4">
              {myBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          </div>

          {/* Informasi Sidebar */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Lightbulb className="text-amber-500" size={24} />
              Informasi
            </h3>
            <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl relative overflow-hidden">
              <Info size={40} className="absolute -right-2 -bottom-2 text-amber-200/50 -rotate-12" />
              <h4 className="font-bold text-amber-800 mb-4 flex items-center gap-2">
                Aturan Peminjaman
              </h4>
              <ul className="text-sm text-amber-700 space-y-4 relative z-10">
                <li className="flex gap-3">
                  <span className="bg-amber-200 w-5 h-5 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 font-bold">
                    1
                  </span>
                  <span>Pastikan booking dilakukan H-1 acara.</span>
                </li>
                <li className="flex gap-3">
                  <span className="bg-amber-200 w-5 h-5 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 font-bold">
                    2
                  </span>
                  <span>Jaga kebersihan ruangan yang dipinjam.</span>
                </li>
                <li className="flex gap-3">
                  <span className="bg-amber-200 w-5 h-5 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 font-bold">
                    3
                  </span>
                  <span>Batalkan peminjaman jika tidak jadi digunakan.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default UserDashboard;