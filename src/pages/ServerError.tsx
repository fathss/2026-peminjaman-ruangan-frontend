import { useSearchParams } from "react-router-dom";
import { AlertTriangle, RefreshCw } from "lucide-react";

function ServerError() {
    const [searchParams] = useSearchParams();
    const status = searchParams.get("status") || "500";

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.15),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(239,68,68,0.12),_transparent_28%)]" />
            <div className="relative min-h-screen flex items-center justify-center p-6">
                <div className="w-full max-w-4xl text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-[1.75rem] bg-red-100 text-red-600 shadow-lg shadow-red-100/60 mb-8">
                        <AlertTriangle size={38} />
                    </div>

                    <p className="text-xs font-black uppercase tracking-[0.28em] text-red-500 mb-4">
                        Terjadi Gangguan Server
                    </p>

                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-none">
                        {status}
                    </h1>

                    <p className="mt-3 text-sm md:text-base text-gray-500 max-w-xl mx-auto">
                        Coba lagi nanti dalam waktu beberapa menit.
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <a
                            href="/"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-blue-100 transition-all active:scale-95"
                        >
                            <RefreshCw size={18} /> Coba Lagi
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ServerError;

