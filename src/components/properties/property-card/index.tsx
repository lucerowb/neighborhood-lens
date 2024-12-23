import Link from "next/link";
import { Fragment, ReactNode } from "react";

import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { Property } from "@/types/properties.type";
import { formatToUSD, pluralize } from "@/utils/string.util";

import PropertyCarousel from "../property-carousel";

type PropertyCardProps = {
  propertyDetail: Property;
  className?: string;
  children?: ReactNode;
};

const PropertyCard = ({ className, propertyDetail, children }: PropertyCardProps) => {
  const { address, street_address, city, state_abbr, zip_code, beds, baths, sqft, list_price, primary_photo, photos } =
    propertyDetail;

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
    <div
      className={cn(
        "group/property-card relative w-full overflow-hidden transition duration-300 flex flex-col gap-2 p-3",
        className
      )}
    >
      <Link href={`/${propertyDetail.id}`} draggable={false}>
        <PropertyCarousel
          photos={photos}
          primary_photo={primary_photo}
          address={address}
          className="aspect-[4/3] rounded-lg"
        />

        <div className="flex flex-col gap-3">
          <Typography variant="h3" className="text-text-primary" asChild>
            <span>{list_price ? formatToUSD(list_price) : "N/A"}</span>
          </Typography>
          <div className="flex items-center justify-between gap-1">
            <Typography asChild variant="p" className="text-slate-800">
              <h1>{street_address}</h1>
            </Typography>
            <Typography variant="subtle" className="text-gray-600">{`${city}, ${state_abbr} ${zip_code}`}</Typography>
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
      </Link>
      {children}
    </div>
  );
};

export default PropertyCard;
