import { notFound } from "next/navigation";

import { getPropertyDetail } from "@/api/properties.api";
import CatChatWidget from "@/components/cat-widget";

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
      <BgMap propertyFeatures={propertyResponse} />
      <CatChatWidget />
    </main>
  );
};

export default PropertyTour;
