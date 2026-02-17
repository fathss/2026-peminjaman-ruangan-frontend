import { Link } from "react-router-dom";
import { ClipboardList, CalendarDays, Lightbulb, Search, Info, Loader2 } from "lucide-react";
import Navbar from "../../layouts/Navbar";
import BookingCard from "../../components/BookingCard";
import { useUserDashboard } from "../../hooks/user/useUserDashboard";

function UserDashboard() {
  const { myBookings, isLoading, username } = useUserDashboard();

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />

      <main className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Welcome Section */}
        <section className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl shadow-blue-200/50 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl font-black mb-3 tracking-tight">Halo, {username}!</h2>
            <p className="text-blue-100 mb-8 text-lg font-medium leading-relaxed">
              Butuh ruang untuk kolaborasi? Cari ruangan yang tersedia dan ajukan peminjaman dengan mudah dalam hitungan detik.
            </p>
            <Link
              to="/rooms"
              className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-black shadow-xl hover:bg-blue-50 transition-all flex items-center gap-3 w-fit active:scale-95 text-xs uppercase tracking-widest"
            >
              <Search size={20} strokeWidth={3} />
              Cari Ruangan
            </Link>
          </div>
          <div className="absolute top-[-10%] right-[-5%] w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-20%] left-[-5%] w-64 h-64 bg-indigo-400/20 rounded-full blur-2xl"></div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Riwayat Peminjaman */}
          <div className="lg:col-span-2 space-y-6">
            <header className="flex items-center justify-between px-2">
              <h3 className="text-xl font-black text-gray-900 flex items-center gap-3 uppercase tracking-tight">
                <ClipboardList className="text-blue-600" size={24} />
                Booking Terbaru
              </h3>
              {myBookings.length > 0 && (
                <Link to="/bookinghistory" className="text-xs font-black text-blue-600 hover:text-blue-800 uppercase tracking-widest transition-colors">
                  Lihat Semua
                </Link>
              )}
            </header>

            <div className="space-y-4">
              {isLoading ? (
                <div className="bg-white p-20 rounded-[2.5rem] border border-gray-100 flex flex-col items-center justify-center space-y-4 shadow-sm">
                  <Loader2 className="animate-spin text-blue-600" size={40} />
                  <p className="text-gray-400 font-black text-[10px] uppercase tracking-[0.2em]">Menyelaraskan Data...</p>
                </div>
              ) : myBookings.length > 0 ? (
                myBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))
              ) : (
                <EmptyState />
              )}
            </div>
          </div>

          {/* Informasi Sidebar */}
          <aside className="space-y-6">
            <h3 className="text-xl font-black text-gray-900 flex items-center gap-3 uppercase tracking-tight px-2">
              <Lightbulb className="text-amber-500" size={24} />
              Informasi
            </h3>
            <InfoCard />
          </aside>
        </div>
      </main>
    </div>
  );
}

const EmptyState = () => (
  <div className="bg-white p-12 rounded-[2.5rem] border-2 border-dashed border-gray-100 flex flex-col items-center text-center space-y-6 shadow-sm">
    <div className="bg-gray-50 p-8 rounded-full">
      <CalendarDays className="text-gray-200" size={56} />
    </div>
    <div className="space-y-2">
      <h4 className="text-xl font-black text-gray-800 tracking-tight">Belum Ada Aktivitas</h4>
      <p className="text-gray-400 text-sm max-w-xs mx-auto font-medium">
        Riwayat peminjaman Anda akan muncul di sini setelah Anda melakukan pengajuan.
      </p>
    </div>
    <Link
      to="/rooms"
      className="inline-block px-6 py-3 bg-blue-50 text-blue-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-100 transition-colors"
    >
      Mulai Pinjam Sekarang
    </Link>
  </div>
);

const InfoCard = () => (
  <div className="bg-amber-50 border border-amber-100/50 p-8 rounded-[2rem] relative overflow-hidden group">
    <Info size={80} className="absolute -right-4 -bottom-4 text-amber-200/30 -rotate-12 group-hover:rotate-0 transition-transform duration-500" />
    <h4 className="font-black text-amber-800 text-xs uppercase tracking-widest mb-6 flex items-center gap-2">
      Aturan Peminjaman
    </h4>
    <ul className="space-y-5 relative z-10">
      {[
        "Jaga kebersihan dan fasilitas ruangan.",
        "Batalkan peminjaman jika tidak jadi digunakan.",
        "Segera akhiri sesi peminjaman jika penggunaan ruangan telah selesai"
      ].map((text, idx) => (
        <li key={idx} className="flex gap-4 items-start">
          <span className="bg-amber-200 text-amber-900 w-6 h-6 rounded-lg flex items-center justify-center text-[10px] flex-shrink-0 font-black shadow-sm">
            {idx + 1}
          </span>
          <span className="text-sm text-amber-800/80 font-bold leading-relaxed">{text}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default UserDashboard;