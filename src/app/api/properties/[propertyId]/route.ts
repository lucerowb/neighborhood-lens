import { apiHandler } from "@/helpers/api-handler";
import { dr_hook } from "@/helpers/data_repo";

export const GET = apiHandler(async (request: Request, { params }: { params: Promise<{ propertyId: string }> }) => {
  const propertyId = (await params).propertyId;
  const propertyDetails = await dr_hook.getPropertyDetails(propertyId);
  return Response.json(propertyDetails);
});
