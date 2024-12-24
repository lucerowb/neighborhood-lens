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
  categories: { name: string; id: number }[];
  location: { address: string };
  distance: string;
  rating: string;
  photos: {}[];
  geocodes: { main: { latitude: number; longitude: number } };
  features: {};
}
