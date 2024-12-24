import { create } from "zustand";

import { AgeRangeEnum, GenderEnum, StageOfLifeEnum } from "@/enums/app.enum";
import { Maybe } from "@/types/common.type";

export type TourStore = {
  gender: Maybe<GenderEnum>;
  setGender: (gender: GenderEnum) => void;
  ageRange: Maybe<AgeRangeEnum>;
  setAgeRange: (ageRange: AgeRangeEnum) => void;
  stageOfLife: Maybe<StageOfLifeEnum>;
  setStageOfLife: (stageOfLife: StageOfLifeEnum) => void;
};

export const useTourStore = create<TourStore>((set) => ({
  gender: null,
  stageOfLife: null,
  ageRange: null,
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
  setAgeRange: (age: AgeRangeEnum) =>
    set((state: TourStore) => ({
      ...state,
      age,
    })),
}));
