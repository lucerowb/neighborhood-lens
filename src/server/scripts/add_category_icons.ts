import { eq } from "drizzle-orm";

import categoriesData from "../data/fq_categories.json";
import { db } from "../db";
import { places } from "../db/schema";

async function addCategoryIcons() {
  const categoriesIconMap = new Map(categoriesData?.map((category) => [category.categoryCode, category.icon]));
  const placesData = await db.select().from(places);

  const updates = placesData
    .filter((place) => !place.category_icon)
    .map((place) => {
      return {
        id: place.id,
        category_icon: categoriesIconMap.get(place.category_id) || null,
      };
    })
    .filter((update) => update.category_icon !== null);

  await Promise.all(
    updates.map((update) =>
      db.update(places).set({ category_icon: update.category_icon }).where(eq(places.id, update.id))
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
