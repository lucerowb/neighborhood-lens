import axios from "axios";

import { Feature, PlaceInfo } from "@/app/api/places/ingest/interfaces";
import env from "@/config/env.config";
import { InsertPlace, places } from "@/server/db/schema";

import { db } from "../db";

const FOURSQUARE_BASE_URL: string = "https://api.foursquare.com/v3/places/search";

function checkCoordinatesAndCategory(item: PlaceInfo) {
  return item.geocodes?.main?.latitude && item.geocodes?.main?.longitude && item.categories?.[0]?.name && item.fsq_id;
}
const categories =
  "10001,10002,10004,10007,10013,10024,10027,10056,12009,12055,12056,12061,12060,12059,12058,12057,12075,12071,12072,12070,12098,12124,13003,13029,13032,13035,13036,13034,13040,13040,13052,13065,13064,14001,14002,14004,15000,15005,15014,16000,16001,16023,16032,16037,18000,19000,13025,11128,16005,12004,13019,18021,13027,13018,13054,12080,16019,18028,10032,17114,18025,17020,13059,13002,13046,13022";

function createPlace(placeInfo: PlaceInfo, feature: Feature): InsertPlace {
  return {
    fsq_id: placeInfo.fsq_id,
    property_ids: [feature.properties.id],
    name: placeInfo.name,
    category_name: placeInfo.categories[0].name,
    category_id: placeInfo.categories[0].id,
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

async function getNearByPlaces(
  feature: any,
  currentPage = 1,
  accumulatedData: InsertPlace[] = [],
  nextUrl?: string
): Promise<InsertPlace[]> {
  const lat = feature.geometry.coordinates[1];
  const lon = feature.geometry.coordinates[0];

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
            radius: 3000,
            sort: "distance",
            fields: "fsq_id,name,categories,location,distance,rating,photos,geocodes,features",
            categories,
            limit: 50,
          },
        });
    const responseData = response.data.results;
    const newData: InsertPlace[] = responseData
      .filter(checkCoordinatesAndCategory)
      .map((responseDataResult: any) => createPlace(responseDataResult, feature));

    const finalData = [...accumulatedData, ...newData];

    if (currentPage === 100) {
      return finalData;
    }

    const linkHeader = response.headers?.link;
    const nextRequestURL = linkHeader ? linkHeader.match(/<([^>]+)>;\s*rel="next"/)?.[1] : null;

    if (nextRequestURL) {
      return getNearByPlaces(feature, currentPage + 1, finalData, nextRequestURL);
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

  const requests = features.map((feature: any) => getNearByPlaces(feature));
  const allPlaces: InsertPlace[] = (await Promise.all(requests)).flat();
  console.info(`Successfully fetched ${allPlaces.length} places from Foursquare.`);
  const uniquePlaces = new Set(allPlaces.map((place) => place.fsq_id));
  console.info(`Successfully fetched ${uniquePlaces.size} unique places from Foursquare.`);
  if (allPlaces.length > 0) {
    const mergedPlacesMap = new Map<string, InsertPlace>();

    for (const place of allPlaces) {
      const existingPlace = mergedPlacesMap.get(place.fsq_id);
      if (existingPlace) {
        existingPlace.property_ids.push(place.property_ids[0]);
        mergedPlacesMap.set(place.fsq_id, existingPlace);
      } else {
        mergedPlacesMap.set(place.fsq_id, place);
      }
    }

    await db.insert(places).values(Array.from(mergedPlacesMap.values())).onConflictDoNothing({ target: places.fsq_id });
    console.log(`Successfully inserted ${mergedPlacesMap.size} places into the database.`);
  } else {
    console.log("No places to insert into the database.");
  }

  return allPlaces;
};

(async () => {
  try {
    await ingestPlaces();
    process.exit(0);
  } catch (e) {
    console.error(e);
  }
})();
