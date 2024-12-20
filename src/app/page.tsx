import Link from "next/link";

import { getAllProperties } from "@/api/properties.api";
import ChatBubbleCard from "@/components/common/chat-bubble-card";
import { buttonVariants } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

import PropertyCard from "../components/properties/property-card";

export default async function Home() {
  const properties = await getAllProperties();
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-10 py-10">
        <Typography variant="h1">Neighborhood Lens</Typography>
        <ChatBubbleCard anchorPosition="bottom-center">
          <Typography variant="pUiMedium" className="text-center">
            Ready to picture your dream life? Here are some amazing properties to explore. Let&apos;s see how they fit
            into your ideal neighborhood!
          </Typography>
        </ChatBubbleCard>
        <div className="flex flex-col gap-4">
          {properties?.features.map((property) => (
            <PropertyCard key={property.properties.id} propertyDetail={property.properties}>
              <Link href={`/${property.properties.id}`} className={buttonVariants({ size: "lg", className: "mt-2" })}>
                Explore Neighborhood
              </Link>
            </PropertyCard>
          ))}
        </div>
      </div>
    </main>
  );
}
