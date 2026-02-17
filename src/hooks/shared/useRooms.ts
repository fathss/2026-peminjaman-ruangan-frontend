import { useState, useEffect, useMemo } from "react";
import * as roomService from "../../services/roomService";
import type { Room } from "../../types";

export function useRooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [buildingFilter, setBuildingFilter] = useState("Semua");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const response = await roomService.getAllRooms();
        setRooms(response.data);
      } catch (error) {
        console.error("Gagal mengambil data ruangan:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const matchesSearch = 
        room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesBuilding = 
        buildingFilter === "Semua" || room.location.includes(buildingFilter);

      return matchesSearch && matchesBuilding;
    });
  }, [rooms, searchQuery, buildingFilter]);

  return {
    rooms,
    filteredRooms,
    loading,
    setSearchQuery,
    setBuildingFilter,
    buildingFilter
  };
}