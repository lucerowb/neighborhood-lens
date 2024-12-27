import { Star } from "lucide-react";
import Image from "next/image";

import HomeIcon from "@/assets/icons/home.svg";
import PinIcon from "@/assets/icons/pin.svg";
import FallbackImage from "@/assets/img/location-image-fallback.png";
import { Typography } from "@/components/ui/typography";
import useMapStore from "@/stores/useMapStore";
import { metersToMiles } from "@/utils/distance.util";

export default function LocationOverlay() {
  const currentLocationData = useMapStore((state) => state.currentLocationData);

  const { distance, image, name, rating } = currentLocationData ?? {};

  const imageToShow = image ? `data:image/jpeg;base64,${image}` : FallbackImage;

  return (
    <div className="space-y-4 ">
      <div className="rounded-xl bg-gradient-to-b from-[#E2EBF3] to-[#F8FAFC]">
        <div className="flex w-56 items-center justify-between p-2">
          <Typography variant="subtle">{name}</Typography>
          {rating ? (
            <div className="flex items-center gap-2">
              <Star className="size-3" />
              <Typography variant="body" className="text-slate-500">
                {rating}/5
              </Typography>
            </div>
          ) : null}
        </div>
      </div>

      <div className="rounded-xl bg-gradient-to-b from-[#E2EBF3] to-[#F8FAFC]">
        <Image
          src={imageToShow}
          alt={name ?? "poi-image"}
          height={318}
          width={326}
          className="rounded-xl object-cover"
        />

        {distance ? (
          <div className="flex items-center gap-1 p-2">
            <Image src={HomeIcon} alt="home-icon" className="size-6" />
            <div className="w-16 border-t-2 border-slate-300"></div>
            <Image src={PinIcon} alt="home-icon" className="size-6" />
            <Typography variant="body">{metersToMiles(parseInt(distance))} mi away</Typography>
          </div>
        ) : null}
      </div>
    </div>
  );
}
