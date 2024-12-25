import { apiHandler } from "@/helpers/api-handler";
import { db } from "@/server/db";
import { nearbyAttractions } from "@/server/db/schema";

export const GET = apiHandler(async () => {
  const contains = await db.select().from(nearbyAttractions);
  return Response.json(contains);
});
