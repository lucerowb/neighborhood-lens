import { getPlaces } from "@/api/places.api";
import { getAllProperties } from "@/api/properties.api";
import MapBox from "@/components/core/map-box";

import MarkertComponent from "./MarkertComponent";

const coordinates = [
  { lng: -82.4572, lat: 27.9506 },
  { lng: -82.4698, lat: 27.9378 },
  { lng: -82.441, lat: 27.9663 },
];

const initialViewState = {
  longitude: coordinates[0].lng,
  latitude: coordinates[0].lat,
  zoom: 20,
  pitch: 45,
  bearing: 0,
};

async function MapPage() {
  const properties = await getAllProperties();
  const features = properties?.features;
  const latLong = features?.map((property) => {
    return {
      latitude: property.geometry.coordinates[1],
      longitude: property.geometry.coordinates[0],
    };
  });

  const places = await getPlaces();

  return (
    <MapBox
      initialViewState={{
        ...initialViewState,
        longitude: latLong?.[0]?.longitude,
        latitude: latLong?.[0]?.latitude,
      }}
    >
      {features?.map((property) => {
        return (
          <MarkertComponent
            key={property.properties.id}
            name={`${property.geometry.coordinates[1]} ${property.geometry.coordinates[0]}`}
            latitude={property.geometry.coordinates[1]}
            longitude={property.geometry.coordinates[0]}
          />
        );
      })}

      {places?.map((place) => {
        return (
          <MarkertComponent
            key={place.fsq_id}
            latitude={place.coordinates?.x}
            longitude={place.coordinates?.y}
            name={place.name}
            isPlace
          />
        );
      })}
    </MapBox>
  );
}

export default MapPage;
