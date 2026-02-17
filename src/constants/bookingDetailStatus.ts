import { 
  Timer, 
  CheckCircle2, 
  XCircle, 
  Ban, 
  Activity, 
  Archive,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface StatusConfigItem {
  label: string;
  color: string;
  icon: LucideIcon;
  dot: string;
}

export const STATUS_CONFIG: Record<string, StatusConfigItem> = {
  Pending: { 
    label: "Menunggu", 
    color: "bg-amber-50 text-amber-700 border-amber-100", 
    icon: Timer, 
    dot: "bg-amber-500" 
  },
  Approved: { 
    label: "Disetujui", 
    color: "bg-green-50 text-green-700 border-green-100", 
    icon: CheckCircle2, 
    dot: "bg-green-500" 
  },
  Rejected: { 
    label: "Ditolak", 
    color: "bg-red-50 text-red-700 border-red-100", 
    icon: XCircle, 
    dot: "bg-red-500" 
  },
  Cancelled: { 
    label: "Dibatalkan", 
    color: "bg-gray-50 text-gray-500 border-gray-100", 
    icon: Ban, 
    dot: "bg-gray-400" 
  },
  OnGoing: { 
    label: "Sedang Berlangsung", 
    color: "bg-blue-50 text-blue-700 border-blue-100", 
    icon: Activity, 
    dot: "bg-blue-600" 
  },
  Completed: { 
    label: "Selesai", 
    color: "bg-indigo-50 text-indigo-700 border-indigo-100", 
    icon: Archive, 
    dot: "bg-indigo-500" 
  },
};