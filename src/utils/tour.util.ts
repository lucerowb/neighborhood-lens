import AfternoonIcon from "@/assets/icons/afternoon.svg";
import EveningIcon from "@/assets/icons/evening.svg";
import LateMorningIcon from "@/assets/icons/late-morning.svg";
import MorningIcon from "@/assets/icons/morning.svg";
import { AgeRangeEnum, GenderEnum, StageOfLifeEnum, TimeSlots } from "@/enums/app.enum";

export const ageRangeLabelMap = {
  [AgeRangeEnum.EIGHTEEN_TO_THIRTY]: "18-30 yo",
  [AgeRangeEnum.THIRTY_ONE_TO_FORTY]: "31-40 yo",
  [AgeRangeEnum.FORTY_ONE_TO_FIFTY]: "41-50 yo",
  [AgeRangeEnum.FIFTY_ONE_TO_SIXTY]: "51-60 yo",
  [AgeRangeEnum.SIXTY_PLUS]: "60+ yo",
};

export const genderLabelMap = {
  [GenderEnum.MALE]: "Male",
  [GenderEnum.FEMALE]: "Female",
};

export const stageOfLifeLabelMap = {
  [StageOfLifeEnum.SINGLE_AND_EXPLORING_OPTIONS]: "Single and exploring options",
  [StageOfLifeEnum.MARRIED_OR_PARTNERED]: "Married or partnered",
  [StageOfLifeEnum.MARRIED_WITH_KIDS]: "Married with kids",
  [StageOfLifeEnum.RETIRED_AND_ENJOYING_LIFE]: "Retired and enjoying life",
};

export const timeSlotConfigMap = {
  [TimeSlots.MORNING]: {
    lightPreset: "dusk",
    icon: MorningIcon,
  },
  [TimeSlots.LATE_MORNING]: {
    lightPreset: "day",
    icon: LateMorningIcon,
  },
  [TimeSlots.AFTERNOON]: {
    lightPreset: "day",
    icon: AfternoonIcon,
  },
  [TimeSlots.EVENING]: {
    lightPreset: "dawn",
    icon: EveningIcon,
  },
};
