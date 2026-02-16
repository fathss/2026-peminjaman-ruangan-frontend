import type { StatusBadgeProps } from "../types";

function StatusBadge({ status, variant = 'badge' }: StatusBadgeProps) {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-700 border-green-100';
      case 'Pending':
        return 'bg-orange-100 text-orange-700 border-orange-100';
      case 'Rejected':
        return 'bg-red-100 text-red-700 border-red-100';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-100';
    }
  };

  const styleClass = getStatusStyle(status);

  if (variant === 'label') {
    return (
      <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider border ${styleClass}`}>
        {status}
      </span>
    );
  }

  return (
    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${styleClass}`}>
      {status}
    </span>
  );
}

export default StatusBadge;
