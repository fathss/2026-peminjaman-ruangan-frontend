import { 
  CheckCircle2, 
  Timer, 
  XCircle, 
  Ban, 
  PlayCircle, 
  Archive 
} from "lucide-react";
import type { BookingStatus } from "../types";

export const getStatusStyle = (status: BookingStatus) => {
  switch (status) {
    case "Approved": 
      return "bg-green-50 text-green-700 border-green-100";
    case "Pending": 
      return "bg-amber-50 text-amber-700 border-amber-100";
    case "Rejected": 
      return "bg-red-50 text-red-700 border-red-100";
    case "Cancelled": 
      return "bg-gray-50 text-gray-500 border-gray-200 italic";
    case "OnGoing": 
      return "bg-blue-50 text-blue-700 border-blue-100 animate-pulse";
    case "Completed": 
      return "bg-indigo-50 text-indigo-700 border-indigo-100";
    default: 
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

export const getStatusIcon = (status: BookingStatus) => {
  const iconSize = 14;
  
  switch (status) {
    case "Approved": 
      return <CheckCircle2 size={iconSize} />;
    case "Pending": 
      return <Timer size={iconSize} />;
    case "Rejected": 
      return <XCircle size={iconSize} />;
    case "Cancelled": 
      return <Ban size={iconSize} />;
    case "OnGoing": 
      return <PlayCircle size={iconSize} />;
    case "Completed": 
      return <Archive size={iconSize} />;
    default: 
      return null;
  }
};