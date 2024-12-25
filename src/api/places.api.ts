import { fetcher } from "@/lib/fetcher.lib";
import { Place } from "@/types/place.type";

export const getPlaces = async () => {
  return await fetcher<Place[]>(`/api/places`);
};

export const getPlacesByPropertyId = async (propertyId: string) => {
  return await fetcher<Place[]>(`/api/places/${propertyId}`);
};
