import { useCallback, useMemo, useState } from "react";

import { getLifeSimulation } from "@/api/life.api";
import LocalFeedback from "@/app/[propertyId]/tour/components/local-feedback";
import { AnchorPosition } from "@/components/common/chat-bubble-card";
import { ButtonProps } from "@/components/ui/button";
import { AgeRangeEnum, GenderEnum, StageOfLifeEnum, TimeSlots } from "@/enums/app.enum";
import useMapStore from "@/stores/useMapStore";
import { useTourStore } from "@/stores/useTourStore";
import { Place } from "@/types/place.type";
import { PropertyFeatures } from "@/types/properties.type";
import { TourItineraryOptions } from "@/types/tour.type";
import { ageRangeLabelMap, genderLabelMap, stageOfLifeLabelMap } from "@/utils/tour.util";

export type Option = {
  text: string;
  value?: string;
  action?: () => void | Promise<void>;
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
const { setCurrentLocationData } = useMapStore.getState();

export default function useCatMessages(propertyFeatures: PropertyFeatures) {
  const [tourIteinerary, setTourIteinerary] = useState<TourItineraryOptions>();
  const { ageRange, gender, stageOfLife } = useTourStore((state) => state);
  const mapInstance = useMapStore((state) => state.mapInstance);

  const { localStats, properties } = propertyFeatures;
  const propertyId = properties.id;

  const gotoLocation = useCallback(
    (place: Place) => {
      const { coordinates, distance, rating, name } = place;
      const { x: lat, y: lng } = coordinates;

      setCurrentLocationData({
        coordinates: [lng, lat],
        name,
        distance,
        rating,
        //TODO: use ai generated image
        image: undefined,
      });

      if (mapInstance) {
        mapInstance.flyTo({
          center: [lng, lat],
          zoom: 18,
          pitch: 60,
          bearing: 30,
          duration: 5000,
        });

        setTimeout(() => {
          mapInstance.easeTo({
            center: [lng, lat],
            zoom: 18,
            pitch: 45,
            bearing: -30,
            duration: 3000,
          });
        }, 5000);
      }
    },
    [mapInstance]
  );

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
            value: gender,
            action: () => setGender(gender),
          })),
          catImageNumber: 1,
          replies: {
            [GenderEnum.MALE]: {
              reply: "Meow! Nice to meet you, sir!",
              catImageNumber: 7,
            },
            [GenderEnum.FEMALE]: {
              reply: "Purr! Lovely to meet you, madam!",
              catImageNumber: 7,
            },
          },
        },
        {
          id: "age",
          catImageNumber: 1,
          text: "Are you older than me?",
          options: Object.values(AgeRangeEnum).map((age) => ({
            text: ageRangeLabelMap[age],
            value: age,
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
            value: stage,
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
          options: [
            {
              text: "Start simulation",
              action: async () => {
                if (ageRange && gender && stageOfLife) {
                  const res = await getLifeSimulation(propertyId, ageRange, gender, stageOfLife);
                  setTourIteinerary(res);
                }
              },
            },
          ],
        },
        {
          id: [TimeSlots.MORNING],
          text: "My typical morning begins with a walk in the park and looking at the beautiful scenery there. What's your morning like?",
          catImageNumber: 1,
          options: tourIteinerary?.morning.map(({ place, label }) => ({
            text: label,
            action: () => gotoLocation(place),
          })),
        },
        {
          id: [TimeSlots.LATE_MORNING],
          text: "After my morning walk, I like to grab a cup of coffee. What do you do after your morning routine?",
          catImageNumber: 1,
          options: tourIteinerary?.late_morning.map(({ place, label }) => ({
            text: label,
            action: () => gotoLocation(place),
          })),
        },
        {
          id: [TimeSlots.AFTERNOON],
          text: "After my coffee, I like to visit the local library and read a book. What do you do in the afternoon?",
          catImageNumber: 1,
          options: tourIteinerary?.afternoon.map(({ place, label }) => ({
            text: label,
            action: () => gotoLocation(place),
          })),
        },
        {
          id: [TimeSlots.EVENING],
          text: "In the evening, I like to go to the local park and play with my friends. What do you do in the evening?",
          catImageNumber: 1,
          options: tourIteinerary?.evening.map(({ place, label }) => ({
            text: label,
            action: () => gotoLocation(place),
          })),
        },
        {
          id: "end",
          text: "That's it! I hope you enjoyed the simulation. I hope you have a great day ahead!",
          catImageNumber: 1,
          catClassName: "bottom-4 left-1/2 -translate-x-1/2 items-center",
          anchorPosition: "bottom-center",
          tapToContinue: true,
        },
      ] as Message[],
    [localStats, ageRange, gender, stageOfLife, propertyId, tourIteinerary, gotoLocation]
  );

  return { messages };
}
