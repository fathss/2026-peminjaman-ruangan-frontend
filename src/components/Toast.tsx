import { useEffect, useState } from "react";
import { X, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import type { ToastProps } from "../types";

function Toast({ type, message, description, onClose, duration = 3500 }: ToastProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    // Allow animation to complete before calling onClose
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const getStyles = () => {
    switch (type) {
      case "success":
        return {
          bg: "bg-green-50",
          border: "border-green-100",
          text: "text-green-800",
          accent: "bg-green-500",
          icon: <CheckCircle2 className="text-green-500" size={20} />
        };
      case "warning":
        return {
          bg: "bg-amber-50",
          border: "border-amber-100",
          text: "text-amber-800",
          accent: "bg-amber-500",
          icon: <AlertTriangle className="text-amber-500" size={20} />
        };
      case "danger":
        return {
          bg: "bg-red-50",
          border: "border-red-100",
          text: "text-red-800",
          accent: "bg-red-500",
          icon: <XCircle className="text-red-500" size={20} />
        };
      default:
        return {
          bg: "bg-white",
          border: "border-gray-100",
          text: "text-gray-800",
          accent: "bg-gray-500",
          icon: null
        };
    }
  };

  const styles = getStyles();

  return (
    <div
      className={`
        relative overflow-hidden min-w-[320px] max-w-md
        ${styles.bg} ${styles.border} border ${styles.text}
        p-4 rounded-2xl shadow-lg shadow-gray-200/50
        flex gap-4 items-start
        animate-in fade-in slide-in-from-right-8 duration-300
        ${isExiting ? "animate-out fade-out slide-out-to-right-8" : ""}
      `}
      role="status"
    >
      {/* Accent Bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${styles.accent}`} />

      {/* Icon */}
      <div className="flex-shrink-0 mt-0.5">
        {styles.icon}
      </div>

      {/* Content */}
      <div className="flex-grow pr-4">
        <h4 className="text-sm font-black uppercase tracking-wider">
          {message}
        </h4>
        {description && (
          <p className="text-xs mt-1 font-medium opacity-80">
            {description}
          </p>
        )}
      </div>

      {/* Close Button */}
      <button
        onClick={handleClose}
        className="flex-shrink-0 p-1 hover:bg-black/5 rounded-lg transition-colors"
        aria-label="Close"
      >
        <X size={16} strokeWidth={3} />
      </button>

      {/* Visual Timer Progress Bar */}
      <div
        className={`absolute bottom-0 left-0 h-0.5 ${styles.accent} opacity-20`}
        style={{
          width: '100%',
          animation: `toastProgress ${duration}ms linear forwards`
        }}
      />

      <style>{`
        @keyframes toastProgress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
}

export default Toast;
