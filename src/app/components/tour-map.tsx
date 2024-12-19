"use client";

import MapBox from "@/components/core/map-box";

const coordinates = [
  { lng: -82.4572, lat: 27.9506 },
  { lng: -82.4698, lat: 27.9378 },
  { lng: -82.441, lat: 27.9663 },
];

const initialViewState = {
  longitude: coordinates[0].lng,
  latitude: coordinates[0].lat,
  zoom: 18,
  pitch: 45,
  bearing: 0,
};

export default function TourMap() {
  const handleMapLoad = (e: mapboxgl.MapEvent) => {
    const map = e.target;

    map.resize();

    let index = 0;

    const transitionToNextLocation = () => {
      if (index >= coordinates.length) {
        index = 0;
      }

      const { lng, lat } = coordinates[index];

      map.flyTo({
        center: [lng, lat],
        zoom: 18,
        pitch: 60,
        bearing: 30,
        duration: 5000,
      });

      setTimeout(() => {
        map.easeTo({
          center: [lng, lat],
          zoom: 18,
          pitch: 45,
          bearing: -30,
          duration: 3000,
        });

        setTimeout(() => {
          index++;
          transitionToNextLocation();
        }, 3000);
      }, 5000);
    };

    transitionToNextLocation();
  };

  return (
    <MapBox initialViewState={initialViewState} onLoad={handleMapLoad}>
      <div className="absolute bottom-10 right-10 rounded-xl bg-lime-100 p-10 text-lg shadow-xl">Cat goes here 🐱</div>
    </MapBox>
  );
}
