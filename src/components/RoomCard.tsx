import { Link } from "react-router-dom";
import { Users, MapPin, Settings2, Trash2 } from "lucide-react";
import axios from "../api/axios";
import type { RoomCardProps } from "../types";

function RoomCard({ room, isAdmin }: RoomCardProps) {
  
  const handleDelete = async () => {
    const confirmDelete = window.confirm(`Apakah Anda yakin ingin menghapus ruangan "${room.name}"?`);
    if (!confirmDelete) return;

    try {
      await axios.delete(`/rooms/${room.id}`);
      alert("Ruangan berhasil dihapus");
      
      window.location.reload(); 
      
    } catch (error: any) {
      console.error("Gagal menghapus ruangan:", error);
      alert(error.response?.data?.message || "Gagal menghapus ruangan");
    }
  };

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 p-7 shadow-sm hover:shadow-md transition-all group">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 flex-grow">
          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border
                ${room.isActive 
                  ? 'bg-green-50 text-green-600 border-green-100' 
                  : 'bg-red-50 text-red-600 border-red-100'}`}
            >
              {room.isActive ? 'Tersedia' : 'Non-Aktif'}
            </span>
            
            {isAdmin && (
               <span className="bg-blue-50 text-blue-600 border border-blue-100 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                 Admin View
               </span>
            )}
          </div>

          <h3 className="text-xl font-black text-gray-800 group-hover:text-blue-600 transition-colors">
            {room.name}
          </h3>

          <div className="flex flex-wrap gap-6 text-sm text-gray-500 font-medium">
            <span className="flex items-center gap-2">
              <MapPin size={18} className="text-blue-500" /> {room.location}
            </span>
            <span className="flex items-center gap-2">
              <Users size={18} className="text-blue-500" /> Kapasitas {room.capacity} Orang
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isAdmin ? (
            <div className="flex gap-2">
              {/* Tombol Edit */}
              <Link
                to={`/admin/rooms/edit/${room.id}`}
                className="flex items-center gap-2 px-5 py-3 bg-gray-900 text-white rounded-2xl font-bold text-sm hover:bg-gray-800 transition-all active:scale-95"
              >
                <Settings2 size={16} /> Edit
              </Link>
              
              {/* Tombol Hapus */}
              <button
                onClick={handleDelete}
                className="flex items-center justify-center p-3 bg-red-50 text-red-600 border border-red-100 rounded-2xl hover:bg-red-600 hover:text-white transition-all active:scale-95 shadow-sm shadow-red-50"
                title="Hapus Ruangan"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ) : (
            /* Tampilan Tombol User Biasa */
            <Link
              to={`/roombookings/add?roomId=${room.id}`}
              className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 whitespace-nowrap shadow-lg
                ${room.isActive 
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none shadow-none'}`}
            >
              {room.isActive ? 'Pesan Sekarang' : 'Tidak Tersedia'}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default RoomCard;