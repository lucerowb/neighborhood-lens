/* eslint-disable @next/next/no-img-element */
"use client";

import { MapPin } from "lucide-react";
import { ReactNode, useRef, useState } from "react";
import { Marker, Popup, PopupProps } from "react-map-gl";

import MapBox from "@/components/core/map-box";
import { Typography } from "@/components/ui/typography";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import useMapStore from "@/stores/useMapStore";
import { Place } from "@/types/place.type";
import { PropertyFeatures } from "@/types/properties.type";

import LocationOverlay from "./location-overlay";

type BgMapProps = {
  propertyFeatures: PropertyFeatures;
  places?: Place[];
};

const setMapInstance = useMapStore.getState().setMapInstance;

const BgMap = ({ propertyFeatures, places }: BgMapProps) => {
  const { properties, geometry } = propertyFeatures;
  const currentLocationData = useMapStore((state) => state.currentLocationData);
  const { coordinates } = currentLocationData ?? {};

  const initialViewState = {
    longitude: properties?.longitude,
    latitude: properties?.latitude,
    zoom: 19,
    pitch: 45,
    bearing: 0,
  };

  const handleMapLoad = (e: mapboxgl.MapEvent) => {
    e.target.resize();
    setMapInstance(e.target);
  };

  return (
    <MapBox initialViewState={initialViewState} onLoad={handleMapLoad} interactive>
      <MarkerWithPopup
        latitude={geometry.coordinates[1]}
        longitude={geometry.coordinates[0]}
        icon={<MapPin className="text-lime-900" />}
        popupContent={<Typography variant="detail">{properties?.address}</Typography>}
      />

      {currentLocationData && coordinates ? (
        <Popup
          latitude={coordinates[1]}
          longitude={coordinates[0]}
          closeOnClick={false}
          anchor="right"
          className="location-overlay"
          offset={20}
          closeButton={false}
        >
          <LocationOverlay />
        </Popup>
      ) : null}

      {places?.map((place) => {
        return (
          <MarkerWithPopup
            key={place.fsq_id}
            latitude={place.coordinates?.x}
            longitude={place.coordinates?.y}
            icon={
              <img
                src={place.category_icon?.mapPrefix + place.category_icon?.suffix}
                alt={place.name}
                className="h-6 w-6 rounded-full"
              />
            }
            popupContent={<Typography variant="detail">{place?.name}</Typography>}
          />
        );
      })}
    </MapBox>
  );
};

export default BgMap;

const MarkerWithPopup = ({
  latitude,
  longitude,
  icon,
  popupAnchor = "bottom",
  popupContent,
}: {
  latitude: number;
  longitude: number;
  icon: ReactNode;
  popupAnchor?: PopupProps["anchor"];
  popupContent?: ReactNode;
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [openPopup, setOpenPopup] = useState(false);
  useOnClickOutside(ref, () => setOpenPopup(false));
  return (
    <>
      <Marker latitude={latitude} longitude={longitude}>
        <button
          ref={ref}
          type="button"
          className="relative flex items-center justify-center rounded-3xl bg-gradient-to-b from-[#D9F99D] to-[#ECFCCB] px-3 py-2"
          onClick={(e) => {
            e.preventDefault();
            setOpenPopup((state) => !state);
          }}
        >
          {icon}
          <span className="absolute -bottom-3 h-0 w-0 border-l-8 border-r-8 border-t-[16px] border-transparent border-t-[#ECFCCB]" />
        </button>
      </Marker>
      {openPopup && (
        <Popup
          latitude={latitude}
          longitude={longitude}
          closeOnClick={false}
          anchor={popupAnchor}
          onClose={() => setOpenPopup(false)}
          offset={20}
        >
          {popupContent}
        </Popup>
      )}
    </>
  );
};
