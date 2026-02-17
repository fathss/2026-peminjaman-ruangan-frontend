import { Search, Filter } from "lucide-react";
import type { FilterPanelProps } from "../types";
import { useState } from "react";

function FilterPanel({ onSearch, onFilterBuilding }: FilterPanelProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBuilding, setSelectedBuilding] = useState("all");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
  };

  const handleBuildingChange = (building: string) => {
    setSelectedBuilding(building);
    onFilterBuilding?.(building === "all" ? "Semua" : building);
  };

  return (
    <aside className="lg:col-span-1 space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2 border-b pb-4">
          <Filter size={18} className="text-blue-600" /> Filter Pencarian
        </h3>

        <div className="space-y-6">
          {/* Input Nama Ruangan */}
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">
              Nama Ruangan
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Cari ruangan..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
              />
            </div>
          </div>

          {/* Select Lokasi / Gedung */}
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">
              Gedung
            </label>
            <select
              value={selectedBuilding}
              onChange={(e) => handleBuildingChange(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-bold text-gray-700"
            >
              <option value="all">Semua Gedung</option>
              <option value="Gedung D4">Gedung D4</option>
              <option value="Gedung D3">Gedung D3</option>
              <option value="Gedung SAW">Gedung SAW</option>
              <option value="Gedung Pascasarjana">Gedung Pasca</option>
            </select>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default FilterPanel;