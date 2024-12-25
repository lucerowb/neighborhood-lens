import { useMemo } from "react";

import LocalFeedback from "@/app/[propertyId]/tour/components/local-feedback";
import { AnchorPosition } from "@/components/common/chat-bubble-card";
import { ButtonProps } from "@/components/ui/button";
import { AgeRangeEnum, GenderEnum, StageOfLifeEnum } from "@/enums/app.enum";
import { useTourStore } from "@/stores/useTourStore";
import { PropertyFeatures } from "@/types/properties.type";
import { ageRangeLabelMap, genderLabelMap, stageOfLifeLabelMap } from "@/utils/tour.util";

export type Option = {
  text: string;
  action?: () => void;
};

export type Replies = Record<string, { reply: string; catImageNumber: number }>;

export type Message = {
  id: string;
  text: string;
  catImageNumber: number;
  catClassName?: string;
  anchorPosition?: AnchorPosition;
  options?: Option[];
  replies?: Replies;
  content?: React.ReactNode;
  continueButtonText?: string;
  continueButtonVariant?: ButtonProps["variant"];
  tapToContinue?: boolean;
};

const { setGender, setStageOfLife, setAgeRange } = useTourStore.getState();

export default function useCatMessages(propertyFeatures: PropertyFeatures) {
  const { localStats } = propertyFeatures;
  const messages: Message[] = useMemo(
    () =>
      [
        {
          id: "intro",
          text: "Hi, I'm rePurrrr, your friendly neighborhood guide! I'll show you what this area has to offer—from morning coffee spots to parks for evening strolls. Let's dive in and explore your potential new neighborhood!",
          catImageNumber: 1,
          catClassName: "bottom-4 left-1/2 -translate-x-1/2 items-center",
          anchorPosition: "bottom-center",
          tapToContinue: true,
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
          continueButtonText: "Get started",
          continueButtonVariant: "outline",
        },
        {
          id: "gender",
          text: "Before we get started, could you mention your gender?",
          options: Object.values(GenderEnum).map((gender) => ({
            text: genderLabelMap[gender],
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
            text: ageRangeLabelMap[age],
            action: () => setAgeRange(age),
          })),
          replies: {
            [AgeRangeEnum.EIGHTEEN_TO_THIRTY]: {
              reply: "Meow! You're young and energetic!",
              catImageNumber: 7,
            },
            [AgeRangeEnum.THIRTY_ONE_TO_FORTY]: {
              reply: "Purr! You're in your prime!",
              catImageNumber: 7,
            },
            [AgeRangeEnum.FORTY_ONE_TO_FIFTY]: {
              reply: "Meow! You're wise and experienced!",
              catImageNumber: 7,
            },
            [AgeRangeEnum.FIFTY_ONE_TO_SIXTY]: {
              reply: "Purr! You're a senior catizen!",
              catImageNumber: 7,
            },
            [AgeRangeEnum.SIXTY_PLUS]: {
              reply: "Meow! You're a wise old cat!",
              catImageNumber: 7,
            },
          },
        },
        {
          id: "stage-of-life",
          catImageNumber: 1,
          text: "Ok got it! I also need to know what stage you are at in life?",
          options: Object.values(StageOfLifeEnum).map((stage) => ({
            text: stageOfLifeLabelMap[stage],
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
        {
          id: "small-talk-1",
          text: "I know how important it is to have a good neighborhood and good neighbors at that.",
          catImageNumber: 1,
          catClassName: "bottom-4 left-1/2 -translate-x-1/2 items-center",
          anchorPosition: "bottom-center",
          tapToContinue: true,
        },
        {
          id: "visualize",
          text: "Lets visualize how your life could look like here....",
          catImageNumber: 1,
          continueButtonText: "Start Simulation",
          continueButtonVariant: "outline",
        },
        {
          id: "cat-morning",
          text: "My typical morning begins with a walk in the park and looking at the beautiful scenery there",
          catImageNumber: 1,
          catClassName: "bottom-4 left-1/2 -translate-x-1/2 items-center",
          anchorPosition: "bottom-center",
          tapToContinue: true,
        },
        {
          id: "morning-routine",
          text: "What is your morning like... Start with a bang or a coffee at peace?",
          catImageNumber: 1,
          options: [
            {
              text: "Gym experience",
              action: () => {
                // TODO: get gym near location and show gym experience
              },
            },
            {
              text: "Coffee at peace",
              action: () => {
                // TODO: get coffee near location and show coffee at peace
              },
            },
          ],
        },
      ] as Message[],
    [localStats]
  );

  return { messages };
}
