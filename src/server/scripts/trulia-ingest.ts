import truliaLocalReviewsData from "../data/trulia.json";
import { db } from "../db";
import { InsertLocalReview, localReviews } from "../db/schema";

export enum TruliaStatIdentifier {
  NeedACar = "NeedACar",
  WellKeptYards = "WellKeptYards",
  DogFriendly = "DogFriendly",
  Sidewalks = "Sidewalks",
  HolidaySpirit = "HolidaySpirit",
  EasyParking = "EasyParking",
  Quiet = "Quiet",
  FriendlyNeighbors = "FriendlyNeighbors",
  WalkableToGroceries = "WalkableToGroceries",
  WellLitStreets = "WellLitStreets",
  LongTermResidents = "LongTermResidents",
  PeopleWouldWalkAloneAtNight = "PeopleWouldWalkAloneAtNight",
  WalkableToRestaurants = "WalkableToRestaurants",
  Wildlife = "Wildlife",
  KidsPlayOutside = "KidsPlayOutside",
  CommunityEvents = "CommunityEvents",
}

export interface TruliaReviewStats {
  identifier: TruliaStatIdentifier;
  label: string;
  score: number;
}

async function ingestTruliaLocalData() {
  const localReviewsData: InsertLocalReview[] = [];

  for (const localReview of truliaLocalReviewsData) {
    localReviewsData.push({
      property_id: localReview.property_id,
      minResponseCount: localReview.localUGC.stats.minimumResponseCount,
      stats: localReview.localUGC.stats.attributes.map((attribute) => ({
        identifier: TruliaStatIdentifier[attribute.type as TruliaStatIdentifier],
        label: attribute.name,
        score: attribute.score,
      })),
    });
  }

  console.info(`Inserting ${localReviewsData.length} local reviews into the database...`);

  const insertedData = await db.insert(localReviews).values(localReviewsData).returning({
    id: localReviews.id,
  });
  console.log(`Successfully inserted ${insertedData.length} local reviews into the database.`);
}

(async () => {
  try {
    await ingestTruliaLocalData();
    process.exit(0);
  } catch (e) {
    console.error(e);
  }
})();
