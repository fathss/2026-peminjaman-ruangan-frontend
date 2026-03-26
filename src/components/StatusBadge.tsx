import { getStatusStyle, getStatusIcon } from "../utils/statusHelpers";
import type { StatusBadgeProps, BookingStatus } from "../types";

function StatusBadge({ status, variant = 'badge' }: StatusBadgeProps) {
  const styleClass = getStatusStyle(status as BookingStatus);
  const icon = getStatusIcon(status as BookingStatus);

  if (variant === 'label') {
    return (
      <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider border inline-flex items-center gap-1.5 ${styleClass}`}>
        {icon}
        {status}
      </span>
    );
  }

  return (
    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border inline-flex items-center gap-2 ${styleClass}`}>
      {icon}
      {status}
    </span>
  );
}

export default StatusBadge;
