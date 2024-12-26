import axios from "axios";
import { groupBy } from "lodash";

import env from "@/config/env.config";
import { InsertNearbyAttraction, nearbyAttractions, placesSubCategory, PlaceSubCategory } from "@/server/db/schema";

import { db } from "../db";
import { Feature, PlaceInfo } from "./fsq_ingestion";

const FOURSQUARE_BASE_URL: string = "https://api.foursquare.com/v3/places/search";

function checkCoordinatesAndCategory(item: PlaceInfo) {
  return item.geocodes?.main?.latitude && item.geocodes?.main?.longitude && item.categories?.[0]?.name && item.fsq_id;
}

function createPlace(
  placeInfo: PlaceInfo,
  feature: Feature,
  subCategoryMap: Map<number, number>
): InsertNearbyAttraction | null {
  const placesFilteredCategories = placeInfo.categories.filter((category) => subCategoryMap.has(category.id));

  if (placesFilteredCategories.length === 0) {
    return null;
  }
  const selectedSubCategory = placesFilteredCategories[0].id;
  const selectedMainCategory = subCategoryMap.get(placesFilteredCategories[0].id)!;

  return {
    fsq_id: placeInfo.fsq_id,
    property_id: feature.properties.id,
    name: placeInfo.name,
    sub_category_id: selectedSubCategory,
    category_id: selectedMainCategory,
    coordinates: {
      x: placeInfo.geocodes.main.latitude,
      y: placeInfo.geocodes.main.longitude,
    },
    distance: placeInfo.distance,
    rating: placeInfo.rating,
    photos: placeInfo.photos,
    address: placeInfo.location.address,
    features: placeInfo.features,
  };
}

async function getNearbyAttractions(
  feature: any,
  categories: PlaceSubCategory[],
  currentPage = 1,
  accumulatedData: InsertNearbyAttraction[] = [],
  nextUrl?: string
): Promise<InsertNearbyAttraction[]> {
  const lat = feature.geometry.coordinates[1];
  const lon = feature.geometry.coordinates[0];

  console.info(
    `Fetching nearby attractions for property ID: ${feature.properties.id} ${lat},${lon} - Page: ${currentPage}`
  );
  const category_string = categories.map((subCategory) => subCategory.fsq_category_id).join(",");
  const subCategoryMap = new Map(
    categories.map((subCategory) => [subCategory.fsq_category_id, subCategory.mainCategory])
  );

  try {
    const response = nextUrl
      ? await axios.get(nextUrl, {
          headers: {
            Authorization: env.foursquare.apiKey,
          },
        })
      : await axios.get(FOURSQUARE_BASE_URL, {
          headers: {
            Authorization: env.foursquare.apiKey,
          },
          params: {
            ll: `${lat},${lon}`,
            radius: 10000,
            sort: "distance",
            fields: "fsq_id,name,categories,location,distance,rating,photos,geocodes,features",
            categories: category_string,
            limit: 50,
          },
        });
    const responseData = response.data.results;
    const newData: InsertNearbyAttraction[] = responseData
      .filter(checkCoordinatesAndCategory)
      .map((responseDataResult: any) => createPlace(responseDataResult, feature, subCategoryMap))
      .filter(Boolean);

    const finalData = [...accumulatedData, ...newData];

    if (currentPage === 100) {
      return finalData;
    }

    const linkHeader = response.headers?.link;
    const nextRequestURL = linkHeader ? linkHeader.match(/<([^>]+)>;\s*rel="next"/)?.[1] : null;

    if (nextRequestURL) {
      return getNearbyAttractions(feature, categories, currentPage + 1, finalData, nextRequestURL);
    }

    return finalData;
  } catch (error) {
    console.error(`Failed to fetch Foursquare data for property ID: ${feature.properties.id}`, error);
    return [];
  }
}

const ingestPlaces = async () => {
  const propertyResponse = await fetch(`${env.appUrl}api/properties/`, {
    method: "GET",
  });
  const result = await propertyResponse.json();
  const features = result.features;

  const mainCategories = await db.select().from(placesSubCategory);
  const groupedCategories = groupBy(mainCategories, (category) => category.mainCategory);

  const requests = features.flatMap((feature: any) =>
    Object.entries(groupedCategories).map(([_, subCategories]) => getNearbyAttractions(feature, subCategories))
  );
  const allPlaces: InsertNearbyAttraction[] = (await Promise.all(requests)).flat();
  console.info(`Total requests: ${requests.length}`);

  const batchSize = 1000;

  let insertedCount = 0;

  for (let i = 0; i < allPlaces.length; i += batchSize) {
    const batch = allPlaces.slice(i, i + batchSize);
    const dbResponse = await db
      .insert(nearbyAttractions)
      .values(batch)
      .onConflictDoNothing({ target: [nearbyAttractions.fsq_id, nearbyAttractions.property_id] })
      .returning({ id: nearbyAttractions.id });

    insertedCount += dbResponse.length;
  }

  console.log(`Successfully inserted ${insertedCount} places into the database.`);
};

(async () => {
  try {
    await ingestPlaces();
  } catch (e) {
    console.error(e);
  } finally {
    process.exit(0);
  }
})();
