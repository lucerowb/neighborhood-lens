import { AgeRangeEnum, GenderEnum, StageOfLifeEnum, TimeSlots } from "@/enums/app.enum";
import { CategoryEnum } from "@/schemas/activity-categorization-schema";

import { Place } from "./place.type";

export type Activity = {
  label: string;
  id: CategoryEnum;
  ageGroup: AgeRangeEnum[];
  stageOfLife: StageOfLifeEnum[];
  genderPreferences: GenderEnum[];
  place: Place;
  generatedImage?: string;
};

export type TourItineraryOptions = Record<TimeSlots, Activity[]>;
export type TourItinerarySelection = Record<TimeSlots, Activity | null>;
