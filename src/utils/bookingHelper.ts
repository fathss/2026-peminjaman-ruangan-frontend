export const calculateBookingProgress = (start: string, end: string): number => {
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();
  const now = new Date().getTime();

  if (now < startTime) return 0;
  if (now > endTime) return 100;

  const percentage = ((now - startTime) / (endTime - startTime)) * 100;
  return Math.round(percentage);
};
