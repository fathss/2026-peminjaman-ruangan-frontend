import { useNavigate } from "react-router-dom";
import Navbar from "../../layouts/Navbar";
import BackButton from "../../components/BackButton";
import FilterPanel from "../../components/FilterPanel";
import RoomCard from "../../components/RoomCard";
import { School, Plus, LayoutDashboard, SearchX } from "lucide-react";
import { useRooms } from "../../hooks/shared/useRooms";

function RoomPage() {
  const navigate = useNavigate();
  const { 
    rooms, 
    filteredRooms, 
    loading, 
    setSearchQuery, 
    setBuildingFilter 
  } = useRooms();

  const isAdmin = localStorage.getItem("role") === "Admin";

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto p-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <BackButton 
              to={isAdmin ? "/admin/dashboard" : "/dashboard"} 
              label="Kembali ke Dashboard" 
            />
            <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3 mt-4">
              <School className="text-blue-600" size={32} /> 
              {isAdmin ? "Manajemen Ruangan" : "Jelajahi Ruangan Kampus"}
            </h2>
            <p className="text-gray-500 font-medium text-sm mt-1">
              {isAdmin 
                ? "Tambahkan, edit, atau nonaktifkan ruangan yang tersedia di sistem." 
                : "Pilih ruangan yang sesuai dengan kebutuhan kegiatan Anda."}
            </p>
          </div>

          {isAdmin && (
            <button 
              onClick={() => navigate("/admin/rooms/add")}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-blue-100 transition-all active:scale-95"
            >
              <Plus size={20} /> Tambah Ruangan Baru
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar: Filters & Stats */}
          <aside className="lg:col-span-1 space-y-6">
            <FilterPanel 
              onSearch={setSearchQuery} 
              onFilterBuilding={setBuildingFilter} 
            />
            
            {isAdmin && <AdminQuickStats count={rooms.length} />}
          </aside>

          {/* Main Content: Room List */}
          <div className="lg:col-span-3">
            {loading ? (
              <LoadingState />
            ) : filteredRooms.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {filteredRooms.map((room) => (
                  <RoomCard 
                    key={room.id} 
                    room={room} 
                    isAdmin={isAdmin} 
                  />
                ))}
              </div>
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function AdminQuickStats({ count }: { count: number }) {
  return (
    <div className="p-6 bg-blue-900 rounded-[2rem] text-white shadow-xl shadow-blue-900/10">
      <div className="flex items-center gap-3 mb-4 opacity-70">
        <LayoutDashboard size={18} />
        <span className="text-[10px] font-black uppercase tracking-widest">Status Inventaris</span>
      </div>
      <div className="space-y-1">
        <p className="text-3xl font-black">{count}</p>
        <p className="text-xs opacity-60 font-medium font-mono uppercase">Ruangan Terdaftar</p>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="font-bold text-gray-400 animate-pulse">Sinkronisasi data...</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100 py-24 text-center">
      <SearchX size={48} className="mx-auto mb-4 text-gray-200" />
      <p className="font-bold text-gray-400 text-lg">Ruangan tidak ditemukan</p>
      <p className="text-gray-300 text-sm">Coba ubah kata kunci pencarian atau filter gedung Anda.</p>
    </div>
  );
}

export default RoomPage;