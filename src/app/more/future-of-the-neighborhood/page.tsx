"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import CommunityParkDevelopmentImage from "@/assets/img/more/community-park-development.webp";
import FineDiningSpotsImage from "@/assets/img/more/fine-dining-spots.webp";
import ChatBubbleCard from "@/components/common/chat-bubble-card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Typography } from "@/components/ui/typography";
import { getCatImage } from "@/utils/cat.util";

const futureDevelopments = [
  {
    title: "Community Park Redevelopment",
    img: CommunityParkDevelopmentImage.src,
  },
  {
    title: "Fine Dining Spots",
    img: FineDiningSpotsImage.src,
  },
];

const FutureOfTheNeighborhoodPage = () => {
  const [mainCarouselApi, setMainCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const handlePrevious = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (!canScrollPrev) return;
      mainCarouselApi?.scrollPrev();
    },
    [mainCarouselApi, canScrollPrev]
  );

  const handleNext = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (!canScrollNext && !mainCarouselApi) return;
      mainCarouselApi?.scrollNext();
    },
    [mainCarouselApi, canScrollNext]
  );

  useEffect(() => {
    if (mainCarouselApi) {
      const updateScrollState = () => {
        setCanScrollPrev(mainCarouselApi.canScrollPrev());
        setCanScrollNext(mainCarouselApi.canScrollNext());
      };

      mainCarouselApi.on("select", updateScrollState);
      mainCarouselApi.on("reInit", updateScrollState);

      updateScrollState();

      return () => {
        mainCarouselApi.off("select", updateScrollState);
        mainCarouselApi.off("reInit", updateScrollState);
      };
    }
  }, [mainCarouselApi]);
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center gap-10 p-8">
      <Link
        href={`/more`}
        className={buttonVariants({ variant: "secondary", size: "icon", className: "absolute top-2 left-2" })}
      >
        <ChevronLeft />
      </Link>
      <Typography className="font-dyna-puff" variant="h3">
        Future Developments
      </Typography>
      <div className="flex w-full flex-col items-center gap-10">
        <Carousel setApi={setMainCarouselApi} className="aspect-square size-80 md:size-[30rem]">
          <CarouselContent>
            {futureDevelopments?.map((item, index) => (
              <CarouselItem key={index} className="flex aspect-square flex-col items-center text-center">
                <Image
                  src={item.img}
                  alt={`future-development-img-${index}`}
                  height={480}
                  width={480}
                  className="rounded-xl object-cover"
                />
                <Typography variant="h4">{item.title}</Typography>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-2">
          <Button onClick={handlePrevious} disabled={!canScrollPrev} variant="secondary" size="icon">
            <ChevronLeft />
          </Button>
          <Button onClick={handleNext} disabled={!canScrollNext} variant="secondary" size="icon">
            <ChevronRight />
          </Button>
        </div>
      </div>
      <div className="relative flex h-full w-full flex-col items-center">
        <Image src={getCatImage(7)} alt="cat-img" />
        <ChatBubbleCard hideAnchor className="absolute top-24 w-full max-w-sm text-center">
          <Typography>
            There’s more... Our neighborhood is growing. Some notable developments you might like.
          </Typography>
        </ChatBubbleCard>
      </div>
    </main>
  );
};

export default FutureOfTheNeighborhoodPage;
