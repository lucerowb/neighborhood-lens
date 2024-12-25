import Link from "next/link";

import { getAllProperties } from "@/api/properties.api";
import ChatBubbleCard from "@/components/common/chat-bubble-card";
import { buttonVariants } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

export const dynamic = "force-dynamic";

import Logo from "@/components/icons/logo";

import PropertyCard from "../components/properties/property-card";

export default async function Home() {
  const properties = await getAllProperties();
  return (
    <main className="min-h-screen w-full">
      <div className="flex flex-col items-center gap-10 py-10">
        <Logo />
        <ChatBubbleCard anchorPosition="bottom-center" className="md:max-w-2xl">
          <Typography variant="pUiMedium" className="text-center">
            Ready to picture your dream life? Here are some amazing properties to explore. Let&apos;s see how they fit
            into your ideal neighborhood!
          </Typography>
        </ChatBubbleCard>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {properties?.features.map((property) => (
            <PropertyCard key={property.properties.id} propertyDetail={property.properties}>
              <Link
                href={`/${property.properties.id}/tour`}
                className={buttonVariants({ size: "lg", className: "mt-2" })}
              >
                Explore Neighborhood
              </Link>
            </PropertyCard>
          ))}
        </div>
      </div>
    </main>
  );
}
