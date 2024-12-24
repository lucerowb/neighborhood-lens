import { create } from "zustand";

import { Maybe } from "@/types/common.type";

interface MapState {
  mapInstance: Maybe<mapboxgl.Map>;
  setMapInstance: (mapInstance: mapboxgl.Map) => void;
}

const useMapStore = create<MapState>((set) => ({
  mapInstance: null,
  setMapInstance: (mapInstance) => set({ mapInstance }),
}));

export default useMapStore;
