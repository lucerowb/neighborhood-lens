import { fetcher } from "@/lib/fetcher.lib";
import { NearbyAttraction } from "@/server/db/schema";

export const getPlaces = async () => {
  return await fetcher<NearbyAttraction[]>(`/api/places`);
};

export const getPlacesByPropertyId = async (propertyId: string) => {
  return await fetcher<NearbyAttraction[]>(`/api/places/${propertyId}`);
};
