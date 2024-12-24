"use client";

import MapBox from "@/components/core/map-box";
import useMapStore from "@/stores/useMapStore";
import { PropertyFeatures } from "@/types/properties.type";

type BgMapProps = {
  propertyFeatures: PropertyFeatures;
};

const setMapInstance = useMapStore.getState().setMapInstance;

const BgMap = ({ propertyFeatures }: BgMapProps) => {
  const { properties } = propertyFeatures;

  const initialViewState = {
    longitude: properties?.longitude,
    latitude: properties?.latitude,
    zoom: 20,
    pitch: 45,
    bearing: 0,
  };

  const handleMapLoad = (e: mapboxgl.MapEvent) => {
    e.target.resize();
    setMapInstance(e.target);
  };

  return <MapBox initialViewState={initialViewState} onLoad={handleMapLoad} />;
};

export default BgMap;
