import { Home } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getPropertyDetail } from "@/api/properties.api";
import CatChatWidget from "@/components/cat-widget";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import BgMap from "./components/bg-map";

type PropertyTourProps = {
  params: Promise<{
    propertyId: string;
  }>;
};

const PropertyTour = async ({ params }: PropertyTourProps) => {
  const propertyId = (await params).propertyId;
  if (!propertyId) return notFound();
  const propertyResponse = await getPropertyDetail(propertyId);

  if (!propertyResponse) return notFound();

  return (
    <main className="relative h-screen">
      <Link
        href={`/${propertyId}`}
        className={cn("absolute left-4 top-4 z-10", buttonVariants({ variant: "secondary", size: "icon" }))}
      >
        <Home />
      </Link>
      <BgMap propertyFeatures={propertyResponse} />
      <CatChatWidget propertyFeatures={propertyResponse} />
    </main>
  );
};

export default PropertyTour;
