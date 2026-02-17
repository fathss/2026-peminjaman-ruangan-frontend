import { Link } from "react-router-dom";
import type { BookingCardProps } from "../types/index";
import { Building2, Calendar, Clock, ChevronRight } from "lucide-react";
import StatusBadge from "./StatusBadge";

function BookingCard({ booking }: BookingCardProps) {
  const formattedDate = new Date(booking.startTime).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const startTime = new Date(booking.startTime).toLocaleTimeString("id-ID", { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  const endTime = new Date(booking.endTime).toLocaleTimeString("id-ID", { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <Link
      to={`/roombookings/detail/${booking.id}`}
      className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:border-blue-200 hover:shadow-md transition-all group cursor-pointer"
    >
      <div className="flex gap-4 items-center">
        {/* Icon Container */}
        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center transition-colors group-hover:bg-blue-600 group-hover:text-white shrink-0">
          <Building2 size={24} />
        </div>

        <div>
          {/* Main Card */}
          <h4 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
            {booking.roomName}
          </h4>
          
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-gray-400" /> {formattedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-gray-400" /> {startTime} - {endTime}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* StatusBadge */}
        <StatusBadge status={booking.status} />
        <ChevronRight size={18} className="text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
      </div>
    </Link>
  );
}

export default BookingCard;