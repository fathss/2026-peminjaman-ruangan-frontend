import axios from "../api/axios";

export const getAllBookings = () => axios.get("/roombookings");
export const getBookingById = (id: string) => axios.get(`/roombookings/${id}`);
export const getBookingHistory = (id: string) => axios.get(`/roombookings/${id}/histories`);
export const getAvailability = (roomId: number, date: string, timezoneOffset: number = 0, excludeBookingId?: number) => axios.get(`/roombookings/availability`, { params: { roomId, date, timezoneOffset, excludeBookingId } });
export const createBooking = (payload: any) => axios.post("/roombookings", payload);
export const updateBooking = (id: string, payload: any) => axios.put(`/roombookings/${id}`, payload);
export const approveBooking = (id: string) => axios.put(`/roombookings/${id}/approve`);
export const rejectBooking = (id: string, reason: string) => axios.put(`/roombookings/${id}/reject`, { reason });
export const cancelBooking = (id: string) => axios.put(`/roombookings/${id}/cancel`);
export const completeBooking = (id: string) => axios.put(`/roombookings/${id}/complete`);