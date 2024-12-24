"use client";
import React from "react";
import { Marker } from "react-map-gl";

function MarkertComponent({
  latitude,
  longitude,
  isPlace,
  name,
}: {
  latitude: number;
  longitude: number;
  name?: string;
  isPlace?: boolean;
}) {
  return (
    <Marker latitude={latitude} longitude={longitude}>
      <div style={{ cursor: "pointer", color: "red", fontSize: "40px" }}>{isPlace ? "📍" : "🏡"}</div>
      <p>{name}</p>
    </Marker>
  );
}

export default MarkertComponent;
