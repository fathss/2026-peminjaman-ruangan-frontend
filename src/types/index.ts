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
  location: string;
  capacity: number;
  description?: string;
  isActive: boolean;
}

export interface Booking {
  id: number;
  roomId?: number;
  roomName: string;
  roomDescription: string;
  userName: string;
  userEmail: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt?: string;
  status: BookingStatus;
  purpose: string;
}

export interface StatusHistory {
  oldStatus: string;
  newStatus: string;
  changedAt: string;
  changedBy: string;
}

// ============================================
// Component Props Types
// ============================================

export interface BackButtonProps {
  to?: string;
  label: string;
  mb?: string;
  className?: string;
  arrowIcon?: boolean;
}

export interface StatCardProps {
  label: string;
  value: string;
  icon: string;
  color: string;
}

export interface RoomCardProps {
  room: Room;
  isAdmin: boolean;
  onRefresh?: () => void;
}

export interface BookingCardProps {
  booking: Booking;
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

export interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  info?: string;
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

export interface AuthProps {
  title: string;
  description: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export type ToastType = 'success' | 'warning' | 'danger';

export interface ToastProps {
  type: ToastType;
  message: string;
  description?: string;
  onClose: () => void;
  duration?: number;
}

export interface ToastItem extends Omit<ToastProps, 'onClose'> {
  id: string;
}

export interface ToastContextType {
  showToast: (toast: Omit<ToastItem, 'id'>) => void;
}
