import { Download, Share2, Star, View } from "lucide-react";
import Image from "next/image";

import HomeIcon from "@/assets/icons/home.svg";
import PinIcon from "@/assets/icons/pin.svg";
import FallbackImage from "@/assets/img/location-image-fallback.png";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  MorphingDialog,
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogImage,
  MorphingDialogTrigger,
} from "@/components/ui/morphing-dialog";
import { Typography } from "@/components/ui/typography";
import useMapStore from "@/stores/useMapStore";
import { metersToMiles } from "@/utils/distance.util";

export default function LocationOverlay() {
  const currentLocationData = useMapStore((state) => state.currentLocationData);

  const { distance, image, name, rating } = currentLocationData ?? {};

  const imageToShow = image ? `data:image/jpeg;base64,${image}` : FallbackImage.src;

  const handleShare = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log("share");
    // TODO: share
  };

  const handleDownload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log("download");
    const a = document.createElement("a");
    a.href = imageToShow;
    a.download = `${name}.jpg`;
    a.click();
  };

  return (
    <MorphingDialog
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 24,
      }}
    >
      <div className="space-y-3">
        <div className="flex w-fit items-center gap-4 rounded-xl bg-gradient-to-b from-[#E2EBF3] to-[#F8FAFC] p-2 shadow-xl">
          <Typography variant="subtle">{name}</Typography>
          {rating ? (
            <div className="flex items-center gap-2">
              <Star className="size-3" />
              <Typography variant="body" className="text-slate-500">
                {rating}/10
              </Typography>
            </div>
          ) : null}
        </div>

        <div className="rounded-2xl bg-gradient-to-b from-[#E2EBF3] to-[#F8FAFC]">
          <div className="relative rounded-2xl border-4 border-white">
            <MorphingDialogTrigger>
              <Button className="absolute right-2 top-2 rounded-xl" variant="secondary" size="icon">
                <View />
              </Button>
            </MorphingDialogTrigger>
            <div className="absolute bottom-2 right-2 flex flex-col gap-2">
              <Button className="rounded-xl" variant="secondary" size="icon" onClick={handleShare}>
                <Share2 />
              </Button>
              <Button className="rounded-xl" variant="secondary" size="icon" onClick={handleDownload}>
                <Download />
              </Button>
            </div>

            <MorphingDialogImage
              src={imageToShow}
              alt={name ?? "poi-image"}
              className="h-[200px] w-[326px] rounded-t-xl object-cover"
            />
          </div>

          {distance ? (
            <div className="flex items-center gap-2 p-2">
              <Image src={HomeIcon} alt="home-icon" className="size-6" />
              <div className="w-full border-t-2 border-slate-300"></div>
              <Image src={PinIcon} alt="home-icon" className="size-6" />
              <Typography variant="body" className="text-nowrap">
                {metersToMiles(parseInt(distance))} mi away
              </Typography>
            </div>
          ) : null}
        </div>
      </div>

      <MorphingDialogContainer className="size-full">
        <MorphingDialogContent className="relative h-full w-full md:h-[90vh] md:w-[90vw] md:rounded-xl">
          <MorphingDialogImage
            src={imageToShow}
            alt={name ?? "poi-image"}
            className="h-full w-full object-cover object-center"
          />
          <MorphingDialogClose
            className={buttonVariants({ variant: "secondary", size: "icon", className: "top-2 right-2" })}
          />
          <div className="absolute bottom-2 right-2 flex flex-col gap-2">
            <Button className="rounded-xl" variant="secondary" size="icon" onClick={handleShare}>
              <Share2 />
            </Button>
            <Button className="rounded-xl" variant="secondary" size="icon" onClick={handleDownload}>
              <Download />
            </Button>
          </div>
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  );
}
