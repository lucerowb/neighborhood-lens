export interface Feature {
  geometry: {
    coordinates: [number, number];
  };
  properties: {
    id: string;
  };
}

export interface PlaceInfo {
  fsq_id: string;
  name: string;
  categories: { name: string }[];
  location: { address: string };
  distance: string;
  rating: string;
  photos: string[];
  geocodes: { main: { latitude: number; longitude: number } };
}
