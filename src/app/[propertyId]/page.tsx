import { notFound } from "next/navigation";

import { getAllProperties, getPropertyDetail } from "@/api/properties.api";
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
  const [getPropertyDetailResult, getAllPropertiesResult] = await Promise.allSettled([
    getPropertyDetail(propertyId),
    getAllProperties(),
  ]);
  const propertyResponse = getPropertyDetailResult.status === "fulfilled" ? getPropertyDetailResult.value : null;
  const similarProperties =
    getAllPropertiesResult.status === "fulfilled"
      ? getAllPropertiesResult.value?.features
          ?.map(({ properties }) => properties)
          ?.filter((property) => property.id !== propertyId)
          ?.slice(0, 3)
      : [];

  if (!propertyResponse) return notFound();

  return (
    <main className="flex min-h-screen">
      <PropertyDetail propertyDetail={propertyResponse?.properties} similarProperties={similarProperties} />
    </main>
  );
};

export default PropertyDetailPage;
