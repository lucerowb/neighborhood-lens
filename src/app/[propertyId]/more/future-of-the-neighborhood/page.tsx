"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import ChatBubbleCard from "@/components/common/chat-bubble-card";
import StreamTextAudio from "@/components/StreamTextAudio";
import { Button, buttonVariants } from "@/components/ui/button";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Typography } from "@/components/ui/typography";
import { getCatImage } from "@/utils/cat.util";

const futureDevelopmentPropertyMap: Record<string, { title: string; image: string }[]> = {
  "7f9487edad7d0f3f1d1b0d6e65f5375e": [
    {
      title: "Charming Farmhouse Restoration",
      image: "/amenities/Farmhouse.png",
    },
    {
      title: "Green Spaces Enhancement - Park C",
      image: "/amenities/Park-C.png",
    },
    {
      title: "Modern Retail Hub Development",
      image: "/amenities/Store.png",
    },
  ],
  e5d14b3cd9cc92be11ae6aecc8e1843e: [
    {
      title: "Local Artisan Storefronts",
      image: "/amenities/Small-Store-A.png",
    },
    {
      title: "Community Walking Trails - Park B",
      image: "/amenities/Park-B.png",
    },
    {
      title: "Playgrounds and Family Areas - Park D",
      image: "/amenities/Park-D.png",
    },
  ],
  dbc74ffe0223d31fa189df377ab7e58c: [
    {
      title: "Downtown Retail Development",
      image: "/amenities/Store.png",
    },
    {
      title: "Sleek Modern Living Spaces",
      image: "/amenities/Modern-Home-B.png",
    },
    {
      title: "Urban Storefront Expansion",
      image: "/amenities/Store.png",
    },
  ],
  "1095253908": [
    {
      title: "Lush Park A Renovation",
      image: "/amenities/Park-A.png",
    },
    {
      title: "Rustic Farmhouse Upgrade",
      image: "/amenities/Farmhouse.png",
    },
    {
      title: "Scenic Countryside Home Projects",
      image: "/amenities/Countryside-Home-A.png",
    },
  ],
  "39a05f577077f2f45fffbddfca4318c0": [
    {
      title: "Traditional Farmhouse Design",
      image: "/amenities/Farmhouse.png",
    },
    {
      title: "Boutique Retail Expansion",
      image: "/amenities/Small-Store-A.png",
    },
    {
      title: "Community Park A Improvements",
      image: "/amenities/Park-A.png",
    },
  ],
  d7b0b45b40ea8746b68dfdf982ed36fa: [
    {
      title: "Outdoor Recreation - Park D",
      image: "/amenities/Park-D.png",
    },
    {
      title: "Neighborhood Bakery Hub",
      image: "/amenities/Bakery-B.png",
    },
    {
      title: "Cozy Cafe Additions",
      image: "/amenities/Cafe-A.png",
    },
  ],
  "5faa65b3ae34c6615f5420f2522656e4": [
    {
      title: "Family-Friendly Park A Renovation",
      image: "/amenities/Park-A.png",
    },
    {
      title: "Gourmet Cafe Enhancements",
      image: "/amenities/Cafe-A.png",
    },
    {
      title: "Heritage Farmhouse Initiative",
      image: "/amenities/Farmhouse.png",
    },
    {
      title: "Neighborhood Bakery Expansion",
      image: "/amenities/Bakery-B.png",
    },
  ],
  "052543df0005553a8f25cc503adbd89f": [
    {
      title: "Charming Countryside Homes",
      image: "/amenities/Countryside-Home-A.png",
    },
    {
      title: "Fine Dining Experiences",
      image: "/amenities/Restaurant-A.png",
    },
    {
      title: "Contemporary Modern Home Additions",
      image: "/amenities/Modern-Home-B.png",
    },
  ],
  "7a96fe68738d9408d63582e962fbc062": [
    {
      title: "Park D Redevelopment for Families",
      image: "/amenities/Park-D.png",
    },
    {
      title: "Rustic Farmhouse Revival",
      image: "/amenities/Farmhouse.png",
    },
    {
      title: "Scenic Countryside Neighborhood",
      image: "/amenities/Countryside-Home-A.png",
    },
  ],
  "15e0156eff5c593d423473b0d661918d": [
    {
      title: "Artisan Bakery Opening",
      image: "/amenities/Bakery-A.png",
    },
    {
      title: "Neighborhood Bakery Addition",
      image: "/amenities/Bakery-A.png",
    },
    {
      title: "Luxury Countryside Villas",
      image: "/amenities/Countryside-Home-B.png",
    },
  ],
};

const FutureOfTheNeighborhoodPage = () => {
  const [mainCarouselApi, setMainCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const params = useParams<{
    propertyId: string;
  }>();

  const futureDevelopments = futureDevelopmentPropertyMap[params.propertyId] ?? [];

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
        href={`/${params.propertyId}/more`}
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
                  src={item.image}
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
        <ChatBubbleCard hideAnchor className="absolute top-24 min-h-16 w-full max-w-sm text-center">
          <Typography>
            <StreamTextAudio text="There’s more... Our neighborhood is growing. Some notable developments you might like." />
          </Typography>
        </ChatBubbleCard>
      </div>
    </main>
  );
};

export default FutureOfTheNeighborhoodPage;
