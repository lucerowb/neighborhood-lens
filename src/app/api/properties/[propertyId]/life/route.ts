import { eq } from "drizzle-orm";

import { AgeRangeEnum, GenderEnum, StageOfLifeEnum } from "@/enums/app.enum";
import { apiHandler } from "@/helpers/api-handler";
import { dr_hook } from "@/helpers/data_repo";
import { db } from "@/server/db";
import { localReviews } from "@/server/db/schema";

interface ActivityResult {
  timeSlot: string;
  place: {
    name: string;
    category: string;
    address: string;
    rating: number | null;
    photos: any[];
    features: Record<string, any>;
  } | null;
}

interface QueryParams {
  ageRange: AgeRangeEnum;
  gender: GenderEnum;
  stageOfLife: StageOfLifeEnum;
  propertyId: string;
}

export const GET = apiHandler(async (request: Request, { params }: { params: Promise<{ propertyId: string }> }) => {
  const propertyId = (await params).propertyId;
  const propertyDetails = await dr_hook.getPropertyDetails(propertyId);

  const propertyLocalStats = await db
    .select()
    .from(localReviews)
    .where(eq(localReviews.property_id, propertyId))
    .limit(1);

  propertyDetails.localStats = propertyLocalStats[0] || null;

  return Response.json(propertyDetails);
});
