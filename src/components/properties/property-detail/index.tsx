"use client";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment } from "react";

import ChatBubbleCard from "@/components/common/chat-bubble-card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography, typographyVariants } from "@/components/ui/typography";
import { Property } from "@/types/properties.type";
import { formatToUSD, pluralize } from "@/utils/string.util";

import PropertyCarousel from "../property-carousel";

type PropertyDetailProps = {
  propertyDetail: Property;
};
const PropertyDetail = ({ propertyDetail }: PropertyDetailProps) => {
  const router = useRouter();
  const {
    id,
    photos,
    primary_photo,
    address,
    list_price,
    street_address,
    beds,
    baths,
    sqft,
    city,
    state_abbr,
    zip_code,
    description,
  } = propertyDetail;

  const propertyDetails = [
    {
      label: pluralize(beds, "bedroom", "bedrooms"),
      value: beds || "-",
    },
    {
      label: pluralize(baths, "bath", "baths"),
      value: baths || "-",
    },
    {
      label: "sqft",
      value: sqft?.toLocaleString() || "-",
    },
  ];

  return (
    <div className="relative flex flex-col gap-4">
      <div className="group/property-card relative">
        <PropertyCarousel
          photos={photos}
          primary_photo={primary_photo}
          address={address}
          className="h-72 md:h-[50vh] md:max-h-[50vh]"
        />
        <div className="absolute left-4 top-4">
          <Button variant="secondary" size="icon" className="rounded-xl" onClick={() => router.back()}>
            <ChevronLeft />
          </Button>
        </div>
      </div>
      <div className="mx-auto flex max-w-screen-xl flex-col gap-4 p-4 lg:flex-row lg:gap-8">
        <div className="flex flex-col gap-4 lg:flex-[3]">
          <ChatBubbleCard className="max-w-full" hideAnchor>
            <div className="flex flex-col gap-3">
              <Typography variant="h3" className="text-text-primary" asChild>
                <span>{list_price ? formatToUSD(list_price) : "N/A"}</span>
              </Typography>
              <div className="flex items-center justify-between gap-1">
                <Typography asChild variant="p" className="text-slate-800">
                  <h1>{street_address}</h1>
                </Typography>
                <Typography
                  variant="subtle"
                  className="text-gray-600"
                >{`${city}, ${state_abbr} ${zip_code}`}</Typography>
              </div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                {propertyDetails.map(({ label, value }, index, arr) => (
                  <Fragment key={label}>
                    <Typography variant="subtle" className="text-gray-600" asChild>
                      <span>
                        {value}&nbsp;
                        {label}
                      </span>
                    </Typography>
                    {index < arr.length - 1 && <span className="size-0.5 rounded-sm bg-gray-600" />}
                  </Fragment>
                ))}
              </div>
            </div>
          </ChatBubbleCard>
          <div className="flex flex-col gap-4 pb-12 lg:pb-0">
            <Typography variant="h3">About the property</Typography>
            <Typography>{description || "no description found "}</Typography>
          </div>
        </div>
        <Card className="hidden h-fit flex-col gap-4 bg-slate-50 p-3 lg:flex lg:flex-[1]">
          <CardHeader className="p-0">
            <CardTitle className={typographyVariants({ variant: "h4" })}>Life In this neighborhood</CardTitle>
            <CardDescription>Visualize what it’s like in the neighborhood from the cafes to the park.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Link href={`/${id}/tour`} className={buttonVariants({ size: "xl", className: "w-full rounded-2xl" })}>
              Explore Neighborhood
            </Link>
          </CardContent>
        </Card>
      </div>
      <div className="fixed bottom-2 w-full px-4 lg:hidden">
        <Link href={`/${id}/tour`} className={buttonVariants({ size: "xl", className: "w-full rounded-2xl" })}>
          Explore Neighborhood
        </Link>
      </div>
    </div>
  );
};

export default PropertyDetail;
