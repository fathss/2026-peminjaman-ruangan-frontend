// ============================================
// Entity Types
// ============================================

export type BookingStatus = 'Approved' | 'Pending' | 'Rejected' | 'Cancelled' | 'OnGoing' | 'Completed';
export type RoomAvailability = 'Tersedia' | 'Tidak Tersedia';
export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  nim: string;
  role: UserRole;
  status: 'Online' | 'Offline';
}

export interface Room {
  id: number;
  name: string;
  type: string;
  gedung: string;
  capacity: number;
  floor: string;
  isAvailable: boolean;
  facilities: string[];
  description?: string;
  image?: string;
}

export interface Booking {
  id: string;
  room: string;
  roomId?: number;
  date: string;
  time: string;
  startDate?: string;
  endDate?: string;
  status: BookingStatus;
  user?: string;
  nim?: string;
  userId?: string;
  purpose?: string;
  responsiblePerson?: string;
}

export interface Stat {
  label: string;
  value: string;
  icon: string;
  color: string;
}

// ============================================
// Component Props Types
// ============================================

export interface StatCardProps {
  label: string;
  value: string;
  icon: string;
  color: string;
}

export interface RoomCardProps {
  room: Room;
  onSelectRoom?: (roomId: number) => void;
}

export interface BookingCardProps {
  booking: Booking;
  onDetail?: (bookingId: string) => void;
}

export interface StatusBadgeProps {
  status: BookingStatus | string;
  variant?: 'badge' | 'label';
}

export interface FilterPanelProps {
  onSearch?: (query: string) => void;
  onFilterBuilding?: (building: string) => void;
}

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: {
    label: string;
    href: string;
  };
}

export interface BookingSummaryProps {
  roomName: string;
  building: string;
  floor: string;
  capacity: number;
}

export interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  error?: string;
}

export interface FormTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  icon?: React.ReactNode;
  error?: string;
}
