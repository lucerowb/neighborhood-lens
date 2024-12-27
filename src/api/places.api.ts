import { AgeRangeEnum, GenderEnum, TimeSlots } from "@/enums/app.enum";
import { fetcher } from "@/lib/fetcher.lib";
import { CategoryEnum } from "@/schemas/activity-categorization-schema";
import { Place, PlaceImage } from "@/types/place.type";

export const getPlaces = async () => {
  return await fetcher<Place[]>(`/api/places`);
};

export const getPlacesByPropertyId = async (propertyId: string) => {
  return await fetcher<Place[]>(`/api/places/${propertyId}`);
};

export const getPlacesImages = async ({
  ageRange,
  gender,
  placeCategory,
  timeSlot,
}: {
  ageRange: AgeRangeEnum;
  gender: GenderEnum;
  placeCategory: CategoryEnum;
  timeSlot: TimeSlots;
}) => {
  return await fetcher<PlaceImage>("/api/places/image", {
    age_range: ageRange,
    gender,
    place_category: placeCategory,
    time_slot: timeSlot,
  });
};
