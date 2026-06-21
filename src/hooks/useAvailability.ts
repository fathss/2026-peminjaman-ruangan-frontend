import { useState, useEffect, useRef } from "react";
import * as bookingService from "../services/bookingService";

export interface Slot {
  time: string;
  available: boolean;
}

const timezoneOffset = -new Date().getTimezoneOffset();

export function useAvailability(roomId: number | null, date: string, excludeBookingId?: number) {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!roomId || !date) {
      setSlots([]);
      setError(null);
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const fetchAvailability = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await bookingService.getAvailability(roomId, date, timezoneOffset, excludeBookingId);
        if (!controller.signal.aborted) {
          setSlots(res.data.slots);
        }
      } catch (err: any) {
        if (controller.signal.aborted) return;
        setError(err.response?.data?.message || "Gagal memuat ketersediaan slot.");
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchAvailability();

    return () => {
      controller.abort();
    };
  }, [roomId, date, excludeBookingId]);

  return { slots, isLoading, error };
}
