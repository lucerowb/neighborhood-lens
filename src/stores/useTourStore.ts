import { create } from "zustand";
import { persist } from "zustand/middleware";

import { AgeRangeEnum, GenderEnum, StageOfLifeEnum, TimeSlots } from "@/enums/app.enum";
import { Maybe } from "@/types/common.type";
import { Activity, TourItinerarySelection } from "@/types/tour.type";

const defaultSelectedItinerary: TourItinerarySelection = {
  [TimeSlots.MORNING]: null,
  [TimeSlots.LATE_MORNING]: null,
  [TimeSlots.AFTERNOON]: null,
  [TimeSlots.EVENING]: null,
};

export type TourStore = {
  currentMessageIndex: number;
  setCurrentMessageIndex: (index: number) => void;
  isTourCompleted: boolean;
  setIsTourCompleted: (isCompleted: boolean) => void;
  gender: Maybe<GenderEnum>;
  setGender: (gender: GenderEnum) => void;
  ageRange: Maybe<AgeRangeEnum>;
  setAgeRange: (ageRange: AgeRangeEnum) => void;
  stageOfLife: Maybe<StageOfLifeEnum>;
  setStageOfLife: (stageOfLife: StageOfLifeEnum) => void;
  selectedItinerary: TourItinerarySelection;
  setSelectedItinerary: (timeSlot: TimeSlots, detail: Activity) => void;
  clearSelectedItinerary: () => void;
};

export const useTourStore = create<TourStore>()(
  persist(
    (set) => ({
      currentMessageIndex: 0,
      gender: null,
      stageOfLife: null,
      ageRange: null,
      isTourCompleted: false,
      setIsTourCompleted: (isCompleted: boolean) => set({ isTourCompleted: isCompleted }),
      setCurrentMessageIndex: (index: number) => set({ currentMessageIndex: index }),
      selectedItinerary: defaultSelectedItinerary,
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
      clearSelectedItinerary: () =>
        set({
          selectedItinerary: defaultSelectedItinerary,
        }),
    }),
    {
      name: "tour-store",
      partialize: (state) => ({
        ageRange: state.ageRange,
        gender: state.gender,
        stageOfLife: state.stageOfLife,
      }),
    }
  )
);
