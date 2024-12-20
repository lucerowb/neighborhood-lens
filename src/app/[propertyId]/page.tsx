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
  const propertyResponse = await getPropertyDetail(propertyId);
  return (
    <main className="flex min-h-screen">
      <PropertyDetail propertyDetail={propertyResponse?.properties} />
    </main>
  );
};

export default PropertyDetailPage;
