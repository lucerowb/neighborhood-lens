export const metersToMiles = (meters: number) => {
  const metersInMile = 1609.34; // 1 mile = 1609.34 meters
  return (meters / metersInMile).toFixed(2);
};
