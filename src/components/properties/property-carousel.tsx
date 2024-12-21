"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

import AnimatedPaginationDot from "@/components/common/animated-pagination-dot";
import { Button, ButtonProps } from "@/components/ui/button";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { PropertyPhoto } from "@/types/properties.type";

const SLIDE_OFFSET = 5;

type PropertyCarouselProps = {
  photos: PropertyPhoto[];
  primary_photo: string;
  address: string;
  disableNavBtns?: boolean;
  className?: string;
};

const PropertyCarousel = ({ photos, primary_photo, address, disableNavBtns, className }: PropertyCarouselProps) => {
  const [mainCarouselApi, setMainCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

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

  const highQualityPhotos = useMemo(
    () => photos?.map((arg) => (typeof arg === "string" ? arg : arg.MediaURL)) ?? [primary_photo],
    [photos, primary_photo]
  );

  useEffect(() => {
    if (mainCarouselApi) {
      const updateScrollState = () => {
        setCanScrollPrev(mainCarouselApi.canScrollPrev());
        setCanScrollNext(mainCarouselApi.canScrollNext());
        setActiveIndex(mainCarouselApi.selectedScrollSnap() ?? 0);
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
    <div className={cn("relative max-h-72 w-full overflow-hidden", className)}>
      <Carousel className="size-full" setApi={setMainCarouselApi}>
        <CarouselContent containerClassName="h-full" className="ml-0 size-full" draggable={false}>
          {highQualityPhotos?.map((photo, index) => (
            <CarouselItem key={index} className="relative basis-full pl-0">
              <Image
                className="size-full object-cover"
                src={photo}
                quality={100}
                loading={index === 0 ? "eager" : "lazy"}
                priority={index === 0 ? true : undefined}
                width={1080}
                height={720}
                onLoad={(e) => e.currentTarget.classList.remove("blur-md")}
                onLoadStartCapture={(e) => e.currentTarget.classList.add("blur-md")}
                alt={`Picture of ${address}`}
                draggable={false}
              />
              <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-[#00000000_30%] via-[#0000003a] to-[#000000b3]" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="absolute bottom-0 left-0 z-10 flex h-11 w-full items-center justify-center">
        {highQualityPhotos.length > 1 && (
          <AnimatedPaginationDot
            dotCount={
              highQualityPhotos.length - activeIndex <= SLIDE_OFFSET
                ? highQualityPhotos.length
                : highQualityPhotos.length + 2
            }
            activeIndex={activeIndex}
            className="rounded-full bg-black/15 p-2 backdrop-blur-sm"
          />
        )}
      </div>
      {/* carousel controller */}
      {!disableNavBtns && highQualityPhotos.length > 1 && (
        <>
          <div
            className="absolute left-0 top-0 h-full w-1/6 bg-gradient-to-r from-[#0000005c] to-[#00000000] opacity-0 transition-opacity group-hover/property-card:opacity-100"
            onClick={(e) => {
              e.preventDefault();
            }}
          />
          <div
            className="absolute right-0 top-0 h-full w-1/6 bg-gradient-to-l from-[#0000005c] to-[#00000000] opacity-0 transition-opacity group-hover/property-card:opacity-100"
            onClick={(e) => {
              e.preventDefault();
            }}
          />
          <NavigationButton aria-label="Previous" className="left-1" disabled={!canScrollPrev} onClick={handlePrevious}>
            <ChevronLeft className="size-5" />
          </NavigationButton>
          <NavigationButton aria-label="Next" className="right-1" disabled={!canScrollNext} onClick={handleNext}>
            <ChevronRight className="size-5" />
          </NavigationButton>
        </>
      )}
    </div>
  );
};

export default PropertyCarousel;

function NavigationButton({
  "aria-label": ariaLabel,
  disabled,
  onClick,
  children,
  className,
}: Pick<ButtonProps, "aria-label" | "disabled" | "onClick" | "className" | "children">) {
  return (
    <Button
      variant="secondary"
      size="sm"
      aria-label={ariaLabel}
      className={cn(
        "absolute top-1/2 h-8 -translate-y-1/2 rounded-full px-2 text-gray-900 opacity-100 disabled:opacity-0 disabled:group-hover/property-card:opacity-50 sm:opacity-0  sm:group-hover/property-card:opacity-100",
        className
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
