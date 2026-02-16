import { Link } from "react-router-dom";
import type { RoomCardProps } from "../types";
import { Building2, Users, MapPin, Wifi, Wind } from "lucide-react";

function RoomCard({ room, onSelectRoom }: RoomCardProps) {
  const handleClick = () => {
    if (onSelectRoom) {
      onSelectRoom(room.id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md hover:border-blue-100 transition-all group cursor-pointer"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 flex-grow">
          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider
                ${room.isAvailable ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'}`}
            >
              {room.isAvailable ? 'Tersedia' : 'Tidak Tersedia'}
            </span>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{room.type}</span>
          </div>

          <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
            {room.name}
          </h3>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <MapPin size={16} className="text-gray-400" /> {room.gedung}
            </span>
            <span className="flex items-center gap-2">
              <Users size={16} className="text-gray-400" /> {room.capacity} Orang
            </span>
          </div>
        </div>

        {/* Button Aksi */}
        <div className="flex items-center gap-3">
          <Link
            to={`/roombookings/add`}
            onClick={(e) => e.stopPropagation()}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition-all active:scale-95 whitespace-nowrap"
          >
            Pesan Ruangan
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RoomCard;
