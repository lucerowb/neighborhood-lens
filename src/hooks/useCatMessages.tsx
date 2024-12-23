import { useMemo } from "react";

import LocalFeedback from "@/app/[propertyId]/tour/components/local-feedback";
import { AgeRangeEnum, GenderEnum, StageOfLifeEnum } from "@/enums/app.enum";
import { useTourStore } from "@/stores/useTourStore";
import { PropertyFeatures } from "@/types/properties.type";

export interface Option {
  text: string;
  action: () => void;
}

export interface Message {
  id: string;
  text: string;
  catImageNumber: number;
  options?: Option[];
  replies?: {
    [key: string]: {
      reply: string;
      catImageNumber: number;
    };
  };
  content?: React.ReactNode;
}

const { setGender, setStageOfLife, setAge } = useTourStore.getState();

export default function useCatMessages(propertyFeatures: PropertyFeatures) {
  const { localStats } = propertyFeatures;
  const messages: Message[] = useMemo(
    () =>
      [
        {
          id: "intro",
          text: "Hi, I'm rePurrrr, your friendly neighborhood guide! I'll show you what this area has to offer—from morning coffee spots to parks for evening strolls. Let's dive in and explore your potential new neighborhood!",
          catImageNumber: 1,
        },
        {
          id: "features",
          text: "Here's what the locals have to say about my neighborhood. Looks promising, right?",
          catImageNumber: 2,
          content: localStats ? <LocalFeedback localStats={localStats} /> : null,
        },
        {
          id: "get-started",
          text: "Alright, with that out of the way, let's get to know the local areas.",
          catImageNumber: 2,
        },
        {
          id: "gender",
          text: "Before we get started, could you mention your gender?",
          options: Object.values(GenderEnum).map((gender) => ({
            text: gender,
            action: () => setGender(gender),
          })),
          catImageNumber: 1,
          replies: {
            [GenderEnum.MALE]: { reply: "Meow! Nice to meet you, sir!", catImageNumber: 7 },
            [GenderEnum.FEMALE]: { reply: "Purr! Lovely to meet you, madam!", catImageNumber: 7 },
          },
        },
        {
          id: "age",
          catImageNumber: 1,
          text: "Are you older than me?",
          options: Object.values(AgeRangeEnum).map((age) => ({
            text: age,
            action: () => setAge(age),
          })),
          replies: {
            [AgeRangeEnum.EIGHTEEN_TO_THIRTY]: { reply: "Meow! You're young and energetic!", catImageNumber: 7 },
            [AgeRangeEnum.THIRTY_ONE_TO_FORTY]: { reply: "Purr! You're in your prime!", catImageNumber: 7 },
            [AgeRangeEnum.FORTY_ONE_TO_FIFTY]: { reply: "Meow! You're wise and experienced!", catImageNumber: 7 },
            [AgeRangeEnum.FIFTY_ONE_TO_SIXTY]: { reply: "Purr! You're a senior catizen!", catImageNumber: 7 },
            [AgeRangeEnum.SIXTY_PLUS]: { reply: "Meow! You're a wise old cat!", catImageNumber: 7 },
          },
        },
        {
          id: "stage-of-life",
          catImageNumber: 1,
          text: "Ok got it! I also need to know what stage you are at in life?",
          options: Object.values(StageOfLifeEnum).map((stage) => ({
            text: stage,
            action: () => setStageOfLife(stage),
          })),
          replies: {
            [StageOfLifeEnum.SINGLE_AND_EXPLORING_OPTIONS]: {
              reply: "Meow! You're exploring your options!",
              catImageNumber: 7,
            },
            [StageOfLifeEnum.MARRIED_OR_PARTNERED]: {
              reply: "Purr! You're in a committed relationship!",
              catImageNumber: 7,
            },
            [StageOfLifeEnum.MARRIED_WITH_KIDS]: {
              reply: "Meow! You have a family to take care of!",
              catImageNumber: 7,
            },
            [StageOfLifeEnum.RETIRED_AND_ENJOYING_LIFE]: {
              reply: "Purr! You're enjoying your retirement!",
              catImageNumber: 7,
            },
          },
        },
      ] as Message[],
    [localStats]
  );

  return { messages };
}
