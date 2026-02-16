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
    onFilterBuilding?.(building);
  };

  return (
    <aside className="lg:col-span-1 space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2 border-b pb-4">
          <Filter size={18} className="text-blue-600" /> Filter Pencarian
        </h3>

        <div className="space-y-6">
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">
              Nama Ruangan
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Contoh: Lab Jaringan..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">
              Gedung / Fakultas
            </label>
            <select
              value={selectedBuilding}
              onChange={(e) => handleBuildingChange(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-bold text-gray-700"
            >
              <option value="all">Semua Gedung</option>
              <option value="gedung-d4">Gedung D4</option>
              <option value="gedung-d3">Gedung D3</option>
              <option value="gedung-saw">Gedung SAW</option>
              <option value="gedung-pasca">Gedung Pascasarjana</option>
            </select>
          </div>
        </div>

        <button className="w-full mt-8 bg-blue-600 text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
          Cari Sekarang
        </button>
      </div>
    </aside>
  );
}

export default FilterPanel;
