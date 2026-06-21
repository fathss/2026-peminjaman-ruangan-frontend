import { useState, useMemo } from "react";
import { Calendar, Clock, RefreshCw } from "lucide-react";
import { useAvailability } from "../hooks/useAvailability";

interface TimeSlotPickerProps {
  roomId: number;
  selectedDate: string;
  startTime: string;
  endTime: string;
  onChange: (date: string, start: string, end: string) => void;
  errors?: { startTime?: string; endTime?: string };
  excludeBookingId?: number;
}

const HOURS = Array.from({ length: 13 }, (_, i) => i + 8);

function formatDateInput(date: string): string {
  return date || "";
}

function computeMinDate(): string {
  const d = new Date();
  d.setHours(d.getHours() + 12);
  return d.toISOString().slice(0, 10);
}

function computeMaxDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().slice(0, 10);
}

function TimeSlotPicker({ roomId, selectedDate, startTime, endTime, onChange, errors, excludeBookingId }: TimeSlotPickerProps) {
  const { slots, isLoading, error } = useAvailability(roomId, selectedDate, excludeBookingId);
  const [hoveredSlot, setHoveredSlot] = useState<string | null>(null);

  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  const slotStates = useMemo(() => {
    const map = new Map<string, "available" | "booked" | "selected-start" | "selected-end" | "in-range">();
    for (const slot of slots) {
      let state: "available" | "booked" | "selected-start" | "selected-end" | "in-range" = slot.available ? "available" : "booked";
      if (state === "available" && selectedDate === today) {
        const hour = parseInt(slot.time);
        const slotDate = new Date();
        slotDate.setHours(hour, 0, 0, 0);
        const minStart = new Date(Date.now() + 12 * 60 * 60 * 1000);
        if (slotDate < minStart) {
          state = "booked";
        }
      }
      map.set(slot.time, state);
    }
    if (startTime && endTime) {
      let inRange = false;
      for (const hour of HOURS) {
        const t = `${String(hour).padStart(2, "0")}:00`;
        if (t === startTime) {
          map.set(t, "selected-start");
          inRange = true;
        } else if (t === endTime) {
          map.set(t, "selected-end");
          inRange = false;
        } else if (inRange && map.get(t) === "available") {
          map.set(t, "in-range");
        }
      }
    } else if (startTime && !endTime) {
      map.set(startTime, "selected-start");
      if (hoveredSlot) {
        const startIdx = HOURS.indexOf(parseInt(startTime));
        const hoverIdx = HOURS.indexOf(parseInt(hoveredSlot));
        if (hoverIdx > startIdx) {
          for (let i = startIdx + 1; i <= hoverIdx; i++) {
            const t = `${String(HOURS[i]).padStart(2, "0")}:00`;
            if (map.get(t) === "available") map.set(t, "in-range");
          }
        }
      }
    }
    return map;
  }, [slots, startTime, endTime, hoveredSlot]);

  const handleSlotClick = (time: string) => {
    if (!startTime) {
      onChange(selectedDate, time, "");
    } else if (!endTime) {
      const startIdx = HOURS.indexOf(parseInt(startTime));
      const clickIdx = HOURS.indexOf(parseInt(time));
      if (clickIdx <= startIdx) {
        onChange(selectedDate, time, "");
      } else {
        onChange(selectedDate, startTime, time);
      }
    } else {
      if (time === startTime) {
        onChange(selectedDate, "", "");
      } else if (time === endTime) {
        onChange(selectedDate, startTime, "");
      } else {
        const clickIdx = HOURS.indexOf(parseInt(time));
        const startIdx = HOURS.indexOf(parseInt(startTime));
        if (clickIdx <= startIdx) {
          onChange(selectedDate, time, "");
        } else {
          onChange(selectedDate, startTime, time);
        }
      }
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value, "", "");
  };

  const renderSlots = () => {
    if (!selectedDate) {
      return (
        <div className="flex items-center justify-center h-24 text-sm text-gray-400 font-medium">
          <Clock size={16} className="mr-2" />
          Pilih tanggal untuk melihat ketersediaan slot
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="w-[72px] h-9 bg-gray-100 rounded-full animate-pulse" />
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center gap-3 py-4">
          <p className="text-sm text-red-500 font-medium">{error}</p>
          <button
            type="button"
            onClick={() => onChange(selectedDate, startTime, endTime)}
            className="flex items-center gap-2 text-xs font-bold text-red-600 hover:text-red-700 transition-colors"
          >
            <RefreshCw size={14} /> Coba Lagi
          </button>
        </div>
      );
    }

    if (slots.length === 0) {
      return (
        <div className="flex items-center justify-center h-24 text-sm text-gray-400 font-medium">
          Tidak ada slot tersedia pada tanggal ini.
        </div>
      );
    }

    const allBooked = slots.every((s) => !s.available);
    if (allBooked) {
      return (
        <div className="flex items-center justify-center h-24 text-sm text-amber-600 font-medium bg-amber-50 rounded-2xl">
          Semua slot pada tanggal ini sudah dipesan.
        </div>
      );
    }

    return (
      <div className="flex flex-wrap gap-2">
        {slots.map((slot) => {
          const state = slotStates.get(slot.time) || "booked";
          const isSelectable = state === "available" || state === "in-range";

          let btnClass = "w-[72px] h-9 rounded-full text-xs font-bold transition-all border ";
          if (state === "booked") {
            btnClass += "bg-gray-100 text-gray-300 border-gray-100 cursor-not-allowed";
          } else if (state === "selected-start" || state === "selected-end") {
            btnClass += "bg-blue-600 text-white border-blue-600 shadow-sm";
          } else if (state === "in-range") {
            btnClass += "bg-blue-100 text-blue-700 border-blue-200";
          } else if (hoveredSlot && state === "available" && startTime && !endTime) {
            const startIdx = HOURS.indexOf(parseInt(startTime));
            const hoverIdx = HOURS.indexOf(parseInt(hoveredSlot));
            const slotIdx = HOURS.indexOf(parseInt(slot.time));
            if (slotIdx > startIdx && slotIdx <= hoverIdx) {
              btnClass += "bg-blue-100 text-blue-700 border-blue-200";
            } else {
              btnClass += "bg-white text-blue-600 border-blue-200 hover:bg-blue-50 cursor-pointer";
            }
          } else {
            btnClass += "bg-white text-blue-600 border-blue-200 hover:bg-blue-50 cursor-pointer";
          }

          return (
            <button
              key={slot.time}
              type="button"
              disabled={!isSelectable}
              aria-disabled={!isSelectable}
              onClick={() => isSelectable && handleSlotClick(slot.time)}
              onMouseEnter={() => setHoveredSlot(slot.time)}
              onMouseLeave={() => setHoveredSlot(null)}
              className={btnClass}
            >
              {slot.time}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 text-xs text-blue-700 font-medium leading-relaxed">
        Pemesanan dapat dilakukan minimal 12 jam dan maksimal 30 hari dari sekarang.
      </div>

      <div>
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">
          Tanggal Peminjaman
        </label>
        <div className="relative">
          <div className="absolute left-4 top-3.5 text-gray-400">
            <Calendar size={18} />
          </div>
          <input
            type="date"
            value={formatDateInput(selectedDate)}
            onChange={handleDateChange}
            min={computeMinDate()}
            max={computeMaxDate()}
            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
            required
          />
        </div>
      </div>

      <div>
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">
          Pilih Waktu Mulai & Selesai
        </label>
        <div className="bg-white border border-gray-100 rounded-2xl p-4 space-y-3">
          {renderSlots()}

          <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-white border-2 border-blue-200" />
              <span className="text-[10px] text-gray-400 font-medium">Tersedia</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-blue-600" />
              <span className="text-[10px] text-gray-400 font-medium">Dipilih</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-gray-100 border border-gray-100" />
              <span className="text-[10px] text-gray-400 font-medium">Tidak Tersedia</span>
            </div>
          </div>
        </div>
      </div>

      {errors?.startTime && <p className="text-red-500 text-xs">{errors.startTime}</p>}
      {errors?.endTime && <p className="text-red-500 text-xs">{errors.endTime}</p>}
    </div>
  );
}

export default TimeSlotPicker;
