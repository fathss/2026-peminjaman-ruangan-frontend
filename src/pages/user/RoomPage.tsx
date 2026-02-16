import { useState } from "react";
import Navbar from "../../layouts/Navbar";
import BackButton from "../../components/BackButton";
import FilterPanel from "../../components/FilterPanel";
import RoomCard from "../../components/RoomCard";
import { School } from "lucide-react";
import type { Room } from "../../types";

function RoomPage() {
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([
    {
      id: 1,
      name: "Aula Syahdan",
      type: "Aula Utama",
      gedung: "Gedung A",
      capacity: 300,
      floor: "Lantai 1",
      isAvailable: true,
      facilities: ["Wifi", "AC", "Sound System"],
    },
    {
      id: 2,
      name: "Lab Jaringan",
      type: "Laboratorium",
      gedung: "Gedung C",
      capacity: 50,
      floor: "Lantai 3",
      isAvailable: true,
      facilities: ["Wifi", "AC", "Komputer"],
    },
    {
      id: 3,
      name: "Ruang Meeting A",
      type: "Ruang Rapat",
      gedung: "Gedung B",
      capacity: 20,
      floor: "Lantai 2",
      isAvailable: false,
      facilities: ["Wifi", "Projector"],
    },
  ]);

  const handleSearch = (query: string) => {
    // Filter logic berdasarkan query
    console.log("Search:", query);
  };

  const handleFilterBuilding = (building: string) => {
    // Filter logic berdasarkan gedung
    console.log("Filter by building:", building);
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />

      <main className="max-w-7xl mx-auto p-6">
        {/* Tombol Kembali ke Dashboard */}
        <BackButton to="/dashboard" label="Kembali ke Dashboard" mb="mb-6" />

        <div className="mb-10">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            <School className="text-blue-600" size={32} /> Jelajahi Ruangan Kampus
          </h2>
          <p className="text-gray-500 font-medium mt-1 italic">
            Sistem Informasi Peminjaman Sarana & Prasarana Kampus
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filter */}
          <FilterPanel onSearch={handleSearch} onFilterBuilding={handleFilterBuilding} />

          {/* Room List */}
          <div className="lg:col-span-3 space-y-4">
            {filteredRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default RoomPage;