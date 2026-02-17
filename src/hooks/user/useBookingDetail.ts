import { useState, useEffect, useCallback } from "react";
import { calculateBookingProgress } from "../../utils/bookingHelper";
import * as bookingService from "../../services/bookingService";

export function useBookingDetail(id: string | undefined) {
  const [booking, setBooking] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const fetchData = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      const [detailRes, historyRes] = await Promise.all([
        bookingService.getBookingById(id),
        bookingService.getBookingHistory(id)
      ]);

      setBooking(detailRes.data);
      setHistory(historyRes.data);

      if (detailRes.data.status === "OnGoing") {
        setProgress(calculateBookingProgress(detailRes.data.startTime, detailRes.data.endTime));
      }
    } catch (err) {
      console.error("Error fetching booking detail:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { booking, history, loading, progress, reload: fetchData };
}