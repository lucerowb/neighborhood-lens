import { create } from "zustand";

import { Maybe } from "@/types/common.type";

interface CurrentLocation {
  name: string;
  distance?: string;
  rating?: string;
  image?: string;
  coordinates: [number, number];
}

interface MapState {
  mapInstance: Maybe<mapboxgl.Map>;
  setMapInstance: (mapInstance: mapboxgl.Map) => void;
  currentLocationData: Maybe<CurrentLocation>;
  setCurrentLocationData: (currentLocationData: Maybe<CurrentLocation>) => void;
}

const useMapStore = create<MapState>((set) => ({
  mapInstance: null,
  setMapInstance: (mapInstance) => set({ mapInstance }),
  currentLocationData: null,
  setCurrentLocationData: (currentLocationData) => set({ currentLocationData }),
}));

export default useMapStore;
