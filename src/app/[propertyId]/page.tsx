import { getPropertyDetail } from "@/api/properties.api";
import PropertyDetail from "@/components/properties/property-detail";

type PropertyDetailPageProps = {
  params: {
    propertyId: string;
  };
};

const PropertyDetailPage = async ({ params: { propertyId } }: PropertyDetailPageProps) => {
  const propertyResponse = await getPropertyDetail(propertyId);
  return (
    <main className="flex min-h-screen">
      <PropertyDetail propertyDetail={propertyResponse?.properties} />
    </main>
  );
};

export default PropertyDetailPage;
