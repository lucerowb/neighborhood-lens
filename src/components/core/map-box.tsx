"use client";

import "mapbox-gl/dist/mapbox-gl.css";

import { PropsWithChildren } from "react";
import { Map, ViewState } from "react-map-gl";

import env from "@/config/env.config";

type MapBoxProps = PropsWithChildren<{
  onLoad?: (e: mapboxgl.MapEvent) => void;
  initialViewState: Partial<ViewState>;
}>;

const MapBox = ({ initialViewState, onLoad, children }: MapBoxProps) => {
  return (
    <>
      <Map
        mapboxAccessToken={env.mapbox.accessToken!}
        initialViewState={initialViewState}
        style={{ width: "100%", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/standard"
        onLoad={onLoad}
        interactive={false}
        //removing attribution is breaking the TOS, hope we don't get caught 😛
        attributionControl={false}
      />
      {children}
    </>
  );
};

export default MapBox;
