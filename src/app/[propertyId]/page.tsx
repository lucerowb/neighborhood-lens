import { notFound } from "next/navigation";

import { getPropertyDetail } from "@/api/properties.api";
import PropertyDetail from "@/components/properties/property-detail";

export const dynamic = "force-dynamic";

type PropertyDetailPageProps = {
  params: Promise<{
    propertyId: string;
  }>;
};

const PropertyDetailPage = async ({ params }: PropertyDetailPageProps) => {
  const propertyId = (await params).propertyId;
  if (!propertyId) return notFound();
  const [getPropertyDetailResult] = await Promise.allSettled([getPropertyDetail(propertyId)]);
  const propertyResponse = getPropertyDetailResult.status === "fulfilled" ? getPropertyDetailResult.value : null;

  if (!propertyResponse) return notFound();

  return (
    <main className="flex min-h-screen">
      <PropertyDetail propertyDetail={propertyResponse?.properties} />
    </main>
  );
};

export default PropertyDetailPage;
