import axios from "../api/axios";

export const getAllRooms = () => axios.get("/rooms");
export const getRoomById = (id: string) => axios.get(`/rooms/${id}`);
export const createRoom = (payload: any) => axios.post("/rooms", payload);
export const updateRoom = (id: string, payload: any) => axios.put(`/rooms/${id}`, payload);
export const deleteRoom = (id: string) => axios.delete(`/rooms/${id}`);
export const toggleRoomStatus = (id: string, isActive: boolean) => axios.patch(`/rooms/${id}`, { isActive });