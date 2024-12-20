import { fetcher } from "@/lib/fetcher.lib";
import { PropertiesResponse, PropertyFeatures } from "@/types/properties.type";

export const getAllProperties = async () => {
  return await fetcher<PropertiesResponse>("/api/properties");
};

export const getPropertyDetail = async (propertyId: string) => {
  return await fetcher<PropertyFeatures>(`/api/properties/${propertyId}`);
};
