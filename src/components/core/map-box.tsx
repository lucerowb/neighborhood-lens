"use client";
import "mapbox-gl/dist/mapbox-gl.css";

import { Map, Marker } from "react-map-gl";

import env from "@/config/env.config";

const MapBox = () => {
  return (
    <Map
      mapboxAccessToken={env.mapbox.accessToken!}
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14,
      }}
      style={{ width: 600, height: 400 }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
    >
      <Marker longitude={-122.4} latitude={37.8} anchor="bottom">
        {/* <img src="./pin.png" /> */}
        <div className="inline-flex size-4 items-center justify-center rounded-full bg-white p-2">A</div>
      </Marker>
    </Map>
  );
};

export default MapBox;
