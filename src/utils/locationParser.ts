export const parseLocation = (location: string | undefined | null) => {
  if (!location) {
    return { 
      building: "-", 
      floor: "-" 
    };
  }

  const parts = location.split(",");
  
  return {
    building: parts[0]?.trim() || location,
    floor: parts[1]?.trim() || "Lantai tidak spesifik"
  };
};