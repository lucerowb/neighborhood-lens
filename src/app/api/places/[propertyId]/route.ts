import { and, arrayContains, ilike } from "drizzle-orm";

import { apiHandler } from "@/helpers/api-handler";
import { db } from "@/server/db";
import { places } from "@/server/db/schema";

export const GET = apiHandler(async (request: Request, { params }: { params: Promise<{ propertyId: string }> }) => {
  const url = new URL(request.url);

  const categoryName = url.searchParams.get("category_name");
  const propertyId = (await params).propertyId;
  const whereConditions = [arrayContains(places.property_ids, [propertyId])];

  if (categoryName) {
    whereConditions.push(ilike(places.category_name, `%${categoryName}%`));
  }

  const contains = await db
    .select()
    .from(places)
    .where(and(...whereConditions));
  return Response.json(contains);
});
