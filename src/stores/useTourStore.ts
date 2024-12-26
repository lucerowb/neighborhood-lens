import { create } from "zustand";

import { AgeRangeEnum, GenderEnum, StageOfLifeEnum, TimeSlots } from "@/enums/app.enum";
import { Maybe } from "@/types/common.type";
import { Activity, TourItinerarySelection } from "@/types/tour.type";

export type TourStore = {
  gender: Maybe<GenderEnum>;
  setGender: (gender: GenderEnum) => void;
  ageRange: Maybe<AgeRangeEnum>;
  setAgeRange: (ageRange: AgeRangeEnum) => void;
  stageOfLife: Maybe<StageOfLifeEnum>;
  setStageOfLife: (stageOfLife: StageOfLifeEnum) => void;
  selectedItinerary: TourItinerarySelection;
  setSelectedItinerary: (timeSlot: TimeSlots, detail: Activity) => void;
};

export const useTourStore = create<TourStore>((set) => ({
  gender: null,
  stageOfLife: null,
  ageRange: null,
  selectedItinerary: {
    [TimeSlots.MORNING]: null,
    [TimeSlots.LATE_MORNING]: null,
    [TimeSlots.AFTERNOON]: null,
    [TimeSlots.EVENING]: null,
  },
  setGender: (gender: GenderEnum) =>
    set((state: TourStore) => ({
      ...state,
      gender,
    })),
  setStageOfLife: (stageOfLife: StageOfLifeEnum) =>
    set((state: TourStore) => ({
      ...state,
      stageOfLife,
    })),
  setAgeRange: (ageRange: AgeRangeEnum) => {
    set((state: TourStore) => ({
      ...state,
      ageRange,
    }));
  },
  setSelectedItinerary: (timeSlot, detail) =>
    set((state) => ({
      selectedItinerary: {
        ...state.selectedItinerary,
        [timeSlot]: detail,
      },
    })),
}));
