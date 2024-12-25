import { and, eq, ilike } from "drizzle-orm";

import { apiHandler } from "@/helpers/api-handler";
import { db } from "@/server/db";
import { nearbyAttractions, places } from "@/server/db/schema";

export const GET = apiHandler(async (request: Request, { params }: { params: Promise<{ propertyId: string }> }) => {
  const url = new URL(request.url);

  const categoryName = url.searchParams.get("category_name");
  const propertyId = (await params).propertyId;
  const whereConditions = [eq(nearbyAttractions.property_id, propertyId)];

  if (categoryName) {
    whereConditions.push(ilike(places.category_name, `%${categoryName}%`));
  }

  const contains = await db.query.nearbyAttractions.findMany({
    where: and(...whereConditions),
    with: {
      mainCategory: true,
      subCategory: true,
    },
  });

  return Response.json(contains);
});
