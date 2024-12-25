import { eq } from "drizzle-orm";

import categoriesData from "../data/fq_categories.json";
import { db } from "../db";
import { nearbyAttractions } from "../db/schema";

async function addCategoryIcons() {
  const categoriesIconMap = new Map(categoriesData?.map((category) => [category.categoryCode, category.icon]));
  const nearbyAttractionData = await db.select().from(nearbyAttractions);

  const updates = nearbyAttractionData
    .filter((place) => !place.category_icon)
    .map((place) => {
      return {
        id: place.id,
        category_icon: categoriesIconMap.get(place.sub_category_id) || categoriesIconMap.get(place.category_id) || null,
      };
    })
    .filter((update) => update.category_icon !== null);

  await Promise.all(
    updates.map((update) =>
      db
        .update(nearbyAttractions)
        .set({ category_icon: update.category_icon })
        .where(eq(nearbyAttractions.id, update.id))
    )
  );

  console.log(`Successfully added category icons to ${updates.length} places.`);
}

(async () => {
  try {
    await addCategoryIcons();
    process.exit(0);
  } catch (e) {
    console.error(e);
  }
})();
