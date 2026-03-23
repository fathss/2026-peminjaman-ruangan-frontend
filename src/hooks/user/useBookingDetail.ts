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

      const res = await bookingService.getBookingById(id);

      const roomDetailData = res.data.booking;
      const roomHistoryData = res.data.histories;

      setBooking(roomDetailData);
      setHistory(roomHistoryData);

      if (roomDetailData.status === "OnGoing") {
        setProgress(calculateBookingProgress(roomDetailData.startTime, roomDetailData.endTime));
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