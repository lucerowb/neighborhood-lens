"use client";

import Image from "next/image";
import { useMemo, useRef } from "react";

import PlayIcon from "@/assets/icons/play.svg";
import FallbackImage from "@/assets/img/location-image-fallback.png";
import { TimeSlots } from "@/enums/app.enum";
import useCatMessages from "@/hooks/useCatMessages";
import { cn } from "@/lib/utils";
import useMapStore from "@/stores/useMapStore";
import { useTourStore } from "@/stores/useTourStore";
import { timeSlotConfigMap } from "@/utils/tour.util";

const { setCurrentLocationData } = useMapStore.getState();
const { setCurrentMessageIndex, setIsTourCompleted } = useTourStore.getState();

type TimelineProps = {
  isReplay?: boolean;
};

export default function Timeline({ isReplay }: TimelineProps) {
  const selectedItinerary = useTourStore((state) => state.selectedItinerary);
  const mapInstance = useMapStore((state) => state.mapInstance);
  const { messages, audioRef } = useCatMessages();
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  const imageSize = useMemo(
    () => ({
      height: isReplay ? 140 : 100,
      width: isReplay ? 120 : 80,
    }),
    [isReplay]
  );

  return (
    <div
      className={cn("flex items-center justify-between gap-10", {
        "absolute -top-2 left-1/3": !isReplay,
      })}
    >
      {Object.entries(selectedItinerary).map(([timeSlot, activity]) => {
        const timeSlotImage = timeSlotConfigMap[timeSlot as TimeSlots].icon;

        if (!activity) {
          return null;
        }

        const { place, generatedImage } = activity;

        const { coordinates, name, distance, rating } = place;

        const { x: lat, y: lng } = coordinates;

        const replayItem = () => {
          setIsTourCompleted(false);

          if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current);
          }

          const itemMessageIndex = messages.findIndex((message) => {
            return message.id === timeSlot;
          });

          setCurrentMessageIndex(itemMessageIndex);

          mapInstance?.setConfigProperty(
            "basemap",
            "lightPreset",
            timeSlotConfigMap[timeSlot as TimeSlots].lightPreset
          );

          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }
          try {
            audioRef.current = new Audio(timeSlotConfigMap[timeSlot as TimeSlots].audio);
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

          setCurrentLocationData({
            coordinates: [lng, lat],
            name,
            distance,
            rating,
            image: generatedImage,
          });

          if (mapInstance) {
            mapInstance.flyTo({
              center: [lng, lat],
              zoom: 18,
              pitch: 60,
              bearing: 30,
              duration: 5000,
            });

            timeoutRef.current = setTimeout(() => {
              mapInstance.easeTo({
                center: [lng, lat],
                zoom: 18,
                pitch: 45,
                bearing: -30,
                duration: 3000,
              });
            }, 5000);
          }
        };

        const imageToShow = generatedImage ? `data:image/jpeg;base64,${generatedImage}` : FallbackImage.src;

        return (
          <div key={timeSlot} className="flex cursor-pointer flex-col items-center justify-center" onClick={replayItem}>
            <Image src={timeSlotImage} alt={timeSlot} className="translate-y-3" />
            <Image src={imageToShow} alt="poi-image" {...imageSize} className="rounded-xl object-cover" />
            <Image src={PlayIcon} alt="play-icon" className="size-6 -translate-y-3" />
          </div>
        );
      })}
    </div>
  );
}
