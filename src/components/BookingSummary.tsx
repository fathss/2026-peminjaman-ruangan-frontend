import type { BookingSummaryProps } from "../types";
import { Info } from "lucide-react";

function BookingSummary({ roomName, building, floor, capacity }: BookingSummaryProps) {
  return (
    <div className="bg-gray-900 rounded-3xl p-6 text-white sticky top-24">
      <h3 className="text-xs font-black text-blue-400 uppercase tracking-[0.2em] mb-4">Ringkasan Ruangan</h3>
      <div className="space-y-4">
        <div>
          <h4 className="text-xl font-bold leading-tight">{roomName}</h4>
          <p className="text-gray-400 text-sm mt-1">
            {building} • {floor}
          </p>
        </div>

        <div className="pt-4 border-t border-gray-800 space-y-3">
          <div className="flex justify-between text-xs">
            <span className="text-gray-500 font-bold uppercase">Kapasitas</span>
            <span className="font-medium text-gray-200">{capacity} Mahasiswa</span>
          </div>
        </div>

        <div className="p-4 bg-gray-800 rounded-2xl mt-4 border border-gray-700 flex gap-2">
          <Info size={16} className="flex-shrink-0 text-blue-400 mt-0.5" />
          <p className="text-[10px] leading-relaxed text-gray-400">
            Pengajuan ini bersifat permohonan. Persetujuan akhir akan diberikan oleh Admin dalam waktu 24 jam.
          </p>
        </div>
      </div>
    </div>
  );
}

export default BookingSummary;
