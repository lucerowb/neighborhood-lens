import { eq } from "drizzle-orm";

import { apiHandler } from "@/helpers/api-handler";
import { dr_hook } from "@/helpers/data_repo";
import { redis } from "@/helpers/redis";
import { db } from "@/server/db";
import { localReviews } from "@/server/db/schema";
import { parseJSONIfPossible } from "@/utils/json.util";

const appreciationRate: Record<string, number> = {
  "7f9487edad7d0f3f1d1b0d6e65f5375e": 0.5,
  e5d14b3cd9cc92be11ae6aecc8e1843e: 8,
  dbc74ffe0223d31fa189df377ab7e58c: 6,
  "1095253908": 6,
  "39a05f577077f2f45fffbddfca4318c0": 6,
  d7b0b45b40ea8746b68dfdf982ed36fa: 0.5,
  "5faa65b3ae34c6615f5420f2522656e4": 5,
  "052543df0005553a8f25cc503adbd89f": 7,
  "7a96fe68738d9408d63582e962fbc062": 4,
  "15e0156eff5c593d423473b0d661918d": 6.5,
};

export const GET = apiHandler(async (request: Request, { params }: { params: Promise<{ propertyId: string }> }) => {
  const propertyId = (await params).propertyId;

  let propertyDetails = null;

  const cachedPropertyDetails = (await redis.get(`property_details:${propertyId}`)) as string;
  if (cachedPropertyDetails) {
    propertyDetails = parseJSONIfPossible(cachedPropertyDetails);
  } else {
    propertyDetails = await dr_hook.getPropertyDetails(propertyId);
    await redis.set(`property_details:${propertyId}`, JSON.stringify(propertyDetails));
  }

  const propertyLocalStats = await db
    .select()
    .from(localReviews)
    .where(eq(localReviews.property_id, propertyId))
    .limit(1);

  propertyDetails.localStats = propertyLocalStats[0] || null;

  propertyDetails.appreciationRate = appreciationRate[propertyId];

  return Response.json(propertyDetails);
});
