import { fetcher } from "@/lib/fetcher.lib";
import { Place } from "@/server/db/schema";

export const getPlaces = async () => {
  return await fetcher<Place[]>(`/api/places`);
};
