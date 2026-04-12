import { useEffect, useState } from "react";
import type { AxiosError } from "axios";
import { BrowserRouter as Router, Navigate } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { ToastProvider } from "./context/ToastContext";
import { publicAxios } from "./api/axios";
import { Loader2 } from "lucide-react";

const RETRY_DELAY_MS = 2000;

function App() {
  const [backendReady, setBackendReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const maxRetries = 5;

  useEffect(() => {
    const checkBackend = async () => {
      if (window.location.pathname === "/error") {
        setBackendReady(false);
        setIsLoading(false);
        return;
      }

      const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

      try {
        setIsLoading(true);

        for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
          console.log(`Mengecek backend (percobaan ${attempt + 1}/${maxRetries + 1})...`);
          try {
            const response = await publicAxios.get("/health");

            if (response.status === 200) {
              setBackendReady(true);
              return;
            }
          } catch (error) {
            const axiosError = error as AxiosError;
            const isBackendError = !axiosError.response || axiosError.response.status >= 500;
            const hasNextAttempt = attempt < maxRetries;

            if (isBackendError && hasNextAttempt) {
              await wait(RETRY_DELAY_MS);
              continue;
            }

            throw error;
          }
        }
      } catch (error) {
        console.error("Backend tidak siap:", error);
        setBackendReady(false);
      } finally {
        setIsLoading(false);
      }
    };

    void checkBackend();
  }, []);

  if (!backendReady && isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={42} />
      </div>
    );
  }

  if (!isLoading) {
    return (
      <Router>
        <ToastProvider>
          {!backendReady && window.location.pathname !== "/error" && (
            <Navigate to="/error?status=502" replace />
          )}
          <AppRoutes />
        </ToastProvider>
      </Router>
    );
  }

  return null;
}

export default App;