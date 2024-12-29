import { and, eq, inArray } from "drizzle-orm";
import { get, groupBy } from "lodash";
import { NextRequest } from "next/server";

import { AgeRangeEnum, GenderEnum, StageOfLifeEnum, TimeSlots } from "@/enums/app.enum";
import { apiHandler } from "@/helpers/api-handler";
import { dr_hook } from "@/helpers/data_repo";
import activityCategorizationSchema from "@/schemas/activity-categorization-schema";
import { db } from "@/server/db";
import { nearbyAttractions } from "@/server/db/schema";

interface QueryParams {
  ageRange: AgeRangeEnum;
  gender: GenderEnum;
  stageOfLife: StageOfLifeEnum;
}

export const GET = apiHandler(async (request: NextRequest, { params }: { params: Promise<{ propertyId: string }> }) => {
  const searchParams = request.nextUrl.searchParams;
  const propertyId = (await params).propertyId;

  const { ageRange, gender, stageOfLife }: QueryParams = {
    ageRange: searchParams.get("age_range") as AgeRangeEnum,
    gender: searchParams.get("gender") as GenderEnum,
    stageOfLife: searchParams.get("stage_of_life") as StageOfLifeEnum,
  };
  if (!ageRange || !gender || !stageOfLife) {
    return Response.json(
      { error: "Missing required query parameters: ageRange, gender, stageOfLife" },
      { status: 400 }
    );
  }
  const propertyDetails = await dr_hook.getPropertyDetails(propertyId);

  if (!propertyDetails) {
    return Response.json({ error: "Property not found" }, { status: 404 });
  }

  const availableActivities: Record<TimeSlots, any[]> = {
    [TimeSlots.MORNING]: [],
    [TimeSlots.LATE_MORNING]: [],
    [TimeSlots.AFTERNOON]: [],
    [TimeSlots.EVENING]: [],
  };

  for (const [timeSlot, activities] of Object.entries(activityCategorizationSchema)) {
    for (const activity of activities) {
      if (
        activity.ageGroup.includes(ageRange) &&
        activity.stageOfLife.includes(stageOfLife) &&
        activity.genderPreferences.includes(gender)
      ) {
        availableActivities[timeSlot as TimeSlots].push(activity);
      }
    }
  }

  const categoryIds = Object.values(availableActivities).flatMap(
    (activities) => activities?.map((activity) => activity.id) ?? []
  );

  const nearbyAttractionsData = await db
    .select()
    .from(nearbyAttractions)
    .where(and(inArray(nearbyAttractions.category_id, categoryIds), eq(nearbyAttractions.property_id, propertyId)))
    .orderBy(nearbyAttractions.distance);

  const groupedNearbyAttractions = groupBy(nearbyAttractionsData, "category_id");
  const selectedAttractionSet = new Set();

  const activitiesWithPlaces: Record<TimeSlots, any[]> = {
    [TimeSlots.MORNING]: [],
    [TimeSlots.LATE_MORNING]: [],
    [TimeSlots.AFTERNOON]: [],
    [TimeSlots.EVENING]: [],
  };

  for (const [timeSlot, activities] of Object.entries(availableActivities)) {
    for (const activity of activities) {
      const atttractions = get(groupedNearbyAttractions, `${activity.id}`, []).slice(0, 5);
      const attractionCount = atttractions.length;
      if (attractionCount === 0) {
        continue;
      }

      let selectedAttraction = atttractions[Math.floor(Math.random() * atttractions.length)];
      const checkedAttractionIds = new Set([selectedAttraction.id]);
      while (selectedAttractionSet.has(selectedAttraction.id) && checkedAttractionIds.size < attractionCount) {
        selectedAttraction = atttractions[Math.floor(Math.random() * atttractions.length)];
        checkedAttractionIds.add(selectedAttraction.id);
      }

      selectedAttractionSet.add(selectedAttraction.id);
      activitiesWithPlaces[timeSlot as TimeSlots].push({
        ...activity,
        place: selectedAttraction,
      });
    }
  }

  return Response.json(activitiesWithPlaces);
});
