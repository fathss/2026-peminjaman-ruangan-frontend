import { useNavigate, Link } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    console.log("Logout clicked");
    navigate("/login");
  }

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 px-8 py-4 flex justify-between items-center shadow-sm">
      {/* Kiri: Logo */}
      <div className="flex items-center gap-8">
        <h1 
          className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tight cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          PeminjamanRuangan
        </h1>

        {/* Tengah: Menu Navigasi Tambahan */}
        <div className="hidden md:flex items-center gap-6 text-sm font-bold text-gray-600">
          <Link to="/rooms" className="hover:text-blue-600 transition-colors">
            Cari Ruangan
          </Link>
          <Link to="/bookinghistory" className="hover:text-blue-600 transition-colors">
            Riwayat Booking
          </Link>
        </div>
      </div>

      {/* Kanan: Profil & Logout */}
      <div className="flex items-center gap-5">
        <div className="hidden sm:flex flex-col items-end mr-2">
          <span className="text-xs font-bold text-gray-800">Administrator</span>
          <span className="text-[10px] text-gray-500 uppercase">Online</span>
        </div>
        
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 active:scale-95 text-white text-sm font-bold px-6 py-2.5 rounded-lg shadow-md hover:shadow-red-200 transition-all duration-200 ease-in-out"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;