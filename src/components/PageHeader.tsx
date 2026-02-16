import type { PageHeaderProps } from "../types";
import { Link } from "react-router-dom";

function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 tracking-tight">{title}</h2>
        {subtitle && <p className="text-gray-500 font-medium mt-1">{subtitle}</p>}
      </div>
      {action && (
        <Link
          to={action.href}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-200 transition-all active:scale-95 inline-flex items-center whitespace-nowrap"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}

export default PageHeader;
