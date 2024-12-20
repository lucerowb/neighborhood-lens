import axios from "axios";
import { NextResponse } from "next/server";

import { Feature, PlaceInfo } from "@/app/api/places/ingest/interfaces";
import env from "@/config/env.config";
import { db } from "@/server/db";
import { InsertPlace, places } from "@/server/db/schema";

const FOURSQUARE_BASE_URL: string = "https://api.foursquare.com/v3/places/search";

function checkCoordinatesAndCategory(item: PlaceInfo) {
  return item.geocodes?.main?.latitude && item.geocodes?.main?.longitude && item.categories?.[0]?.name && item.fsq_id;
}

function createPlace(placeInfo: PlaceInfo, feature: Feature): InsertPlace {
  return {
    fsq_id: placeInfo.fsq_id,
    property_ids: [feature.properties.id],
    name: placeInfo.name,
    category_name: placeInfo.categories[0].name,
    coordinates: {
      x: placeInfo.geocodes.main.latitude,
      y: placeInfo.geocodes.main.longitude,
    },
    distance: placeInfo.distance,
    rating: placeInfo.rating,
    photos: placeInfo.photos,
    address: placeInfo.location.address,
  };
}

async function getNearByPlaces(feature: any): Promise<InsertPlace[]> {
  const lat = feature.geometry.coordinates[1];
  const lon = feature.geometry.coordinates[0];

  try {
    const response = await axios.get(FOURSQUARE_BASE_URL, {
      headers: {
        Authorization: env.foursquare.apiKey,
      },
      params: {
        ll: `${lat},${lon}`,
        radius: 100000,
        sort: "distance",
        fields: "fsq_id,name,categories,location,distance,rating,photos,geocodes",
        categories:
          "13032,18021,11128,12080,13022,10032,13054,18028,13059,17020,17114,10004,13065,13019,18025,16032,13002,10027,16019,13027,13025,16005,10024,13046,16037,10056,12004,13018",
        limit: 50,
      },
    });
    const responseData = response.data.results;

    return responseData
      .filter(checkCoordinatesAndCategory)
      .map((responseDataResult: any) => createPlace(responseDataResult, feature));
  } catch (error) {
    console.error(`Failed to fetch Foursquare data for property ID: ${feature.properties.id}`, error);
    return [];
  }
}

const fetchData = async () => {
  const propertyResponse = await fetch(`${env.appUrl}api/properties/`, {
    method: "GET",
  });
  const result = await propertyResponse.json();
  const features = result.features;

  const requests = features.map(getNearByPlaces);
  const allPlaces: InsertPlace[] = (await Promise.all(requests)).flat();

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

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ data: await fetchData() });
}
