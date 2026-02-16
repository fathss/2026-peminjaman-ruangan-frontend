import type { StatCardProps } from "../types";

function StatCard({ label, value, icon, color }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5">
      <div className={`${color} w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-inner`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

export default StatCard;
