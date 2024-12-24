"use client";

import "mapbox-gl/dist/mapbox-gl.css";

import { CSSProperties, PropsWithChildren } from "react";
import { Map, ViewState } from "react-map-gl";

import env from "@/config/env.config";

type MapBoxProps = PropsWithChildren<{
  onLoad?: (e: mapboxgl.MapEvent) => void;
  initialViewState: Partial<ViewState>;
  style?: CSSProperties;
}>;

const MapBox = ({ initialViewState, onLoad, style = { width: "100%", height: "100vh" }, children }: MapBoxProps) => {
  return (
    <>
      <Map
        mapboxAccessToken={env.mapbox.accessToken!}
        initialViewState={initialViewState}
        style={style}
        mapStyle="mapbox://styles/mapbox/standard"
        onLoad={onLoad}
        // interactive={false}
        //removing attribution is breaking the TOS, hope we don't get caught 😛
        attributionControl={false}
      >
        {children}
      </Map>
    </>
  );
};

export default MapBox;
