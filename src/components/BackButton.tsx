import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import type { BackButtonProps } from "../types";

const BackButton = ({ to, label, mb = "mb-6", className, arrowIcon }: BackButtonProps) => {
  const navigate = useNavigate();

  const defaultClass = "inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-blue-600 transition-colors group";
  const finalClass = className || defaultClass;

  if (to) {
    return (
      <div className={mb}>
        <Link
          to={to}
          className={finalClass}
        >
          {arrowIcon !== false && <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />}
          {label}
        </Link>
      </div>
    );
  }

  return (
    <div className={mb}>
      <button
        onClick={() => navigate(-1)}
        className={finalClass}
      >
        {arrowIcon !== false && <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />}
        {label}
      </button>
    </div>
  );
};

export default BackButton;