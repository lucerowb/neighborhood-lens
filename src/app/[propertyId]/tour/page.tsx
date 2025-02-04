import { Home } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getPropertyDetail } from "@/api/properties.api";
import CatChatWidget from "@/components/cat-widget";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import BgMap from "./components/bg-map";
import Replay from "./components/replay";
import Timeline from "./components/timeline";

type PropertyTourProps = {
  params: Promise<{
    propertyId: string;
  }>;
};

const PropertyTour = async ({ params }: PropertyTourProps) => {
  const propertyId = (await params).propertyId;
  if (!propertyId) return notFound();
  const [getPropertyDetailResult] = await Promise.allSettled([getPropertyDetail(propertyId)]);
  const propertyResponse = getPropertyDetailResult.status === "fulfilled" ? getPropertyDetailResult.value : null;

  if (!propertyResponse) return notFound();

  return (
    <main className="relative z-50 h-screen w-full overflow-hidden md:h-[90vh] md:w-[90vw] md:rounded-2xl md:shadow-2xl">
      <Link
        href={`/${propertyId}`}
        data-ignore-outside-click
        className={cn("absolute left-4 top-4 z-10", buttonVariants({ variant: "secondary", size: "icon" }))}
      >
        <Home />
      </Link>
      <BgMap propertyFeatures={propertyResponse} places={[]} />
      <CatChatWidget propertyFeatures={propertyResponse} />
      <Timeline />
      <Replay propertyId={propertyId} />
    </main>
  );
};

export default PropertyTour;
