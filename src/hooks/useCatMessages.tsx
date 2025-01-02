import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { getLifeSimulation } from "@/api/life.api";
import { getPlacesImages } from "@/api/places.api";
import LocalFeedback from "@/app/[propertyId]/tour/components/local-feedback";
import { AnchorPosition } from "@/components/common/chat-bubble-card";
import { ButtonProps } from "@/components/ui/button";
import { AgeRangeEnum, GenderEnum, StageOfLifeEnum, TimeSlots } from "@/enums/app.enum";
import useMapStore from "@/stores/useMapStore";
import { useTourStore } from "@/stores/useTourStore";
import { PlaceImage } from "@/types/place.type";
import { PropertyFeatures } from "@/types/properties.type";
import { Activity, TourItineraryOptions } from "@/types/tour.type";
import {
  ageRangeLabelMap,
  categoryReplyMap,
  genderLabelMap,
  stageOfLifeLabelMap,
  timeSlotConfigMap,
} from "@/utils/tour.util";

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
  catCharacterClassName?: string;
  anchorPosition?: AnchorPosition;
  options?: Option[];
  replies?: Replies;
  content?: React.ReactNode;
  continueButtonText?: string;
  continueButtonVariant?: ButtonProps["variant"];
  tapToContinue?: boolean;
  skip?: boolean;
};

const { setGender, setStageOfLife, setAgeRange, setSelectedItinerary, setIsTourCompleted } = useTourStore.getState();
const { setCurrentLocationData } = useMapStore.getState();

export default function useCatMessages(propertyFeatures?: PropertyFeatures) {
  const [tourIteinerary, setTourIteinerary] = useState<TourItineraryOptions>();
  const { ageRange, gender, stageOfLife } = useTourStore((state) => state);
  const mapInstance = useMapStore((state) => state.mapInstance);
  const audioRef = useRef<HTMLAudioElement>(null);

  const { localStats, properties } = propertyFeatures ?? {};
  const propertyId = properties?.id;

  const handleSelectActivity = useCallback(
    async (activity: Activity, timeSlot: TimeSlots) => {
      mapInstance?.setConfigProperty("basemap", "lightPreset", timeSlotConfigMap[timeSlot].lightPreset);

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      try {
        audioRef.current = new Audio(timeSlotConfigMap[timeSlot].audio);
        audioRef.current.volume = 0.5;

        audioRef.current.addEventListener("canplaythrough", () => {
          audioRef.current?.play().catch((error) => {
            console.error("Audio playback failed:", error);
          });
        });

        audioRef.current.loop = true;

        audioRef.current.addEventListener("error", (e) => {
          console.error("Audio loading error:", e);
        });
      } catch (error) {
        console.error("Error setting up audio:", error);
      }

      const { coordinates, distance, rating, name, category_id } = activity.place;
      const { x: lat, y: lng } = coordinates;

      let image: PlaceImage | undefined;
      try {
        image = await getPlacesImages({
          ageRange: ageRange as AgeRangeEnum,
          gender: gender as GenderEnum,
          placeCategory: category_id,
          timeSlot: timeSlot,
          placeName: name,
        });
      } catch (error) {
        console.error(error);
        image = undefined;
      }

      setCurrentLocationData({
        coordinates: [lng, lat],
        name,
        distance,
        rating,
        image: image?.data?.[0]?.base64,
      });

      setSelectedItinerary(timeSlot, {
        ...activity,
        generatedImage: image?.data?.[0]?.base64,
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
    [mapInstance, ageRange, gender]
  );

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const messages: Message[] = useMemo(
    () =>
      [
        {
          id: "intro",
          text: "Hi, I’m rePurrrr, your friendly neighborhood guide! Let me show you the best this area has to offer—from cozy coffee spots to scenic parks for evening strolls. Ready to explore your potential new neighborhood? Let’s go!",
          catImageNumber: 1,
          catClassName: "bottom-2 left-1/2 -translate-x-1/2 items-center",
          catCharacterClassName: "mr-0",
          anchorPosition: "bottom-center",
          tapToContinue: true,
        },
        {
          id: "features",
          text: "Curious about the neighborhood? Here’s what the locals are saying—it’s looking great, don’t you think?",
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
          skip: !!gender,
          text: "Before we dive into exploring, can you share your gender to personalize the experience?",
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
          skip: !!ageRange,
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
          skip: !!stageOfLife,
          catImageNumber: 1,
          text: "Great! Could you tell me which life stage best describes you right now?",
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
          catClassName: "bottom-2 left-1/2 -translate-x-1/2 items-center",
          anchorPosition: "bottom-center",
          catCharacterClassName: "mr-0",
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
                if (propertyId && ageRange && gender && stageOfLife) {
                  const res = await getLifeSimulation(propertyId, ageRange, gender, stageOfLife);
                  setTourIteinerary(res);
                }
              },
            },
          ],
        },
        {
          id: TimeSlots.MORNING,
          text: "I love starting my mornings with a peaceful park walk. What’s your ideal way to start the day?",
          catImageNumber: 1,
          options: tourIteinerary?.morning.map((activity) => ({
            text: activity.label,
            value: activity.id,
            action: async () => await handleSelectActivity(activity, TimeSlots.MORNING),
          })),
          replies: categoryReplyMap,
        },
        {
          id: TimeSlots.LATE_MORNING,
          text: "After my morning walk, I like to grab a cup of coffee. What do you do after your morning routine?",
          catImageNumber: 1,
          options: tourIteinerary?.late_morning.map((activity) => ({
            text: activity.label,
            value: activity.id,
            action: async () => await handleSelectActivity(activity, TimeSlots.LATE_MORNING),
          })),
          replies: categoryReplyMap,
        },
        {
          id: TimeSlots.AFTERNOON,
          text: "After my coffee, I like to visit the local library and read a book. What do you do in the afternoon?",
          catImageNumber: 1,
          options: tourIteinerary?.afternoon.map((activity) => ({
            text: activity.label,
            value: activity.id,
            action: async () => await handleSelectActivity(activity, TimeSlots.AFTERNOON),
          })),
          replies: categoryReplyMap,
        },
        {
          id: TimeSlots.EVENING,
          text: "In the evening, I like to go to the local park and play with my friends. What do you do in the evening?",
          catImageNumber: 1,
          options: tourIteinerary?.evening.map((activity) => ({
            text: activity.label,
            value: activity.id,
            action: async () => await handleSelectActivity(activity, TimeSlots.EVENING),
          })),
          replies: categoryReplyMap,
        },
        {
          id: "end",
          text: "That's it! I hope you enjoyed the simulation. I hope you have a great day ahead!",
          catImageNumber: 1,
          catClassName: "bottom-2 left-1/2 -translate-x-1/2 items-center",
          catCharacterClassName: "mr-0",
          anchorPosition: "bottom-center",
          options: [
            {
              text: "Continue",
              action: async () => setIsTourCompleted(true),
            },
          ],
        },
      ].filter(Boolean) as Message[],
    [localStats, ageRange, gender, stageOfLife, propertyId, tourIteinerary, handleSelectActivity]
  );

  return { messages, audioRef };
}
