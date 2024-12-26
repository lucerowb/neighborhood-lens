import { AgeRangeEnum, GenderEnum, StageOfLifeEnum } from "@/enums/app.enum";
import { fetcher } from "@/lib/fetcher.lib";
import { TourItineraryOptions } from "@/types/tour.type";

export const getLifeSimulation = async (
  propertyId: string,
  age_range: AgeRangeEnum,
  gender: GenderEnum,
  stage_of_life: StageOfLifeEnum
) => {
  return await fetcher<TourItineraryOptions>(`/api/properties/${propertyId}/life`, {
    age_range,
    gender,
    stage_of_life,
  });
};
