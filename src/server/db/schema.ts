import { relations, sql } from "drizzle-orm";
import { decimal, integer, jsonb, pgTable, pgTableCreator, point, unique, uuid, varchar } from "drizzle-orm/pg-core";

import { TruliaReviewStats } from "../scripts/trulia-ingest";

export const createTable = pgTableCreator((name) => `neighborhood_lens_${name}`);

export const places = pgTable("neighborhood_lens_places", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  fsq_id: varchar({ length: 255 }).notNull().unique(),
  name: varchar({ length: 255 }).notNull(),
  property_ids: varchar("property_list", { length: 255 }).array().notNull(),
  category_id: integer().notNull().default(1000),
  category_name: varchar({ length: 255 }).notNull(),
  category_icon: jsonb(),
  coordinates: point("location", { mode: "xy" }).notNull(),
  distance: decimal(),
  rating: decimal({ precision: 2, scale: 1 }),
  address: varchar({ length: 255 }),
  photos: jsonb().array(),
  features: jsonb(),
});

export type Place = typeof places.$inferSelect;

export const nearbyAttractions = createTable(
  "nearby_attractions",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    fsq_id: varchar({ length: 255 }).notNull(),
    name: varchar({ length: 255 }).notNull(),
    category_id: integer().notNull(),
    sub_category_id: integer().notNull(),
    property_id: varchar({ length: 255 }).notNull(),
    category_icon: jsonb(),
    coordinates: point("location", { mode: "xy" }).notNull(),
    distance: decimal(),
    rating: decimal({ precision: 2, scale: 1 }),
    address: varchar({ length: 255 }),
    photos: jsonb().array(),
    features: jsonb(),
  },
  (table) => ({
    uniquePlaceProperty: unique().on(table.property_id, table.fsq_id),
  })
);

export type NearbyAttraction = typeof nearbyAttractions.$inferSelect;
export type InsertNearbyAttraction = typeof nearbyAttractions.$inferInsert;

export const fsqCategories = createTable("fsq_categories", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  category_id: integer().notNull().unique(),
  category_name: varchar({ length: 255 }).notNull(),
});

export const placesMainCategory = createTable("places_main_category", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  category_id: uuid().default(sql`gen_random_uuid()`),
  category_name: varchar({ length: 255 }).notNull(),
});

export const placesSubCategory = createTable("places_sub_category", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  mainCategory: integer("main_category_id").notNull(),
  fsq_category_id: integer("fsq_category_id").notNull().unique(),
  fsq_category_name: varchar({ length: 255 }).notNull(),
});

export type InsertPlaceMainCategory = typeof placesMainCategory.$inferInsert;

export type InsertPlaceSubCategory = typeof placesSubCategory.$inferInsert;
export type PlaceSubCategory = typeof placesSubCategory.$inferSelect;

export const placesSubCategoryRelations = relations(placesSubCategory, ({ one }) => ({
  profileInfo: one(placesMainCategory, {
    fields: [placesSubCategory.mainCategory],
    references: [placesMainCategory.id],
  }),
}));

export type InsertPlace = typeof places.$inferInsert;

export const localReviews = createTable("local_reviews", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  property_id: varchar({ length: 255 }).notNull().unique(),
  minResponseCount: integer().notNull().default(0),
  stats: jsonb().array().notNull().$type<TruliaReviewStats[]>(),
});

export type InsertLocalReview = typeof localReviews.$inferInsert;

export const nearbyAttractionsRelations = relations(nearbyAttractions, ({ one }) => ({
  subCategory: one(placesSubCategory, {
    fields: [nearbyAttractions.sub_category_id],
    references: [placesSubCategory.fsq_category_id],
  }),
  mainCategory: one(placesMainCategory, {
    fields: [nearbyAttractions.category_id],
    references: [placesMainCategory.id],
  }),
}));
