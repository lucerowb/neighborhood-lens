import { create } from "zustand";

import { AgeRangeEnum, GenderEnum, StageOfLifeEnum } from "@/enums/app.enum";
import { Maybe } from "@/utils/typescript.util";

export type TourStore = {
  gender: Maybe<GenderEnum>;
  setGender: (gender: GenderEnum) => void;
  age: Maybe<AgeRangeEnum>;
  setAge: (age: AgeRangeEnum) => void;
  stageOfLife: Maybe<StageOfLifeEnum>;
  setStageOfLife: (stageOfLife: StageOfLifeEnum) => void;
};

export const useTourStore = create<TourStore>((set) => ({
  gender: null,
  stageOfLife: null,
  age: null,
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
  setAge: (age: AgeRangeEnum) =>
    set((state: TourStore) => ({
      ...state,
      age,
    })),
}));
