import { apiHandler } from "@/helpers/api-handler";
import { db } from "@/server/db";
import { places } from "@/server/db/schema";

export const GET = apiHandler(async (request: Request) => {
  const contains = await db.select().from(places);
  return Response.json(contains);
});
