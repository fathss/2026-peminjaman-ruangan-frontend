import React, { createContext, useContext, useState, useCallback } from "react";
import type { ToastContextType, ToastItem } from "../types";
import Toast from "../components/Toast";

// 1. Buat "Box" kosong untuk Context (Kantor Pusat)
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// 2. Buat Provider (Wadah yang membungkus aplikasi)
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Fungsi untuk Menampilkan Toast baru
  const showToast = useCallback((toast: Omit<ToastItem, "id">) => {
    const id = Math.random().toString(36).substring(2, 9); // Bikin ID acak
    setToasts((prev) => [...prev, { ...toast, id }]);
  }, []);

  // Fungsi untuk Menghapus Toast dari antrean
  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Container Toast: Menampilkan semua toast yang ada di antrean */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast
              type={toast.type}
              message={toast.message}
              description={toast.description}
              duration={toast.duration}
              onClose={() => removeToast(toast.id)}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// 3. Buat "Walkie-Talkie" (Hook) agar komponen lain bisa memanggil showToast
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast harus digunakan di dalam ToastProvider");
  }
  return context;
}
