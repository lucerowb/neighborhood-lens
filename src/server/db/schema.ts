import { decimal, integer, jsonb, pgTable, pgTableCreator, point, varchar } from "drizzle-orm/pg-core";

import { TruliaReviewStats } from "../scripts/trulia-ingest";

export const createTable = pgTableCreator((name) => `neighborhood_lens_${name}`);

export const places = pgTable("neighborhood_lens_places", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  fsq_id: varchar({ length: 255 }).notNull().unique(),
  name: varchar({ length: 255 }).notNull(),
  property_ids: varchar("property_list", { length: 255 }).array().notNull(),
  category_id: integer().notNull().default(1000),
  category_name: varchar({ length: 255 }).notNull(),
  coordinates: point("location", { mode: "xy" }).notNull(),
  distance: decimal(),
  rating: decimal({ precision: 2, scale: 1 }),
  address: varchar({ length: 255 }),
  photos: jsonb().array(),
  features: jsonb(),
});

export type Place = typeof places.$inferSelect;

export const fsqCategories = createTable("fsq_categories", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  category_id: integer().notNull().unique(),
  category_name: varchar({ length: 255 }).notNull(),
});

export type InsertPlace = typeof places.$inferInsert;

export const localReviews = createTable("local_reviews", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  property_id: varchar({ length: 255 }).notNull().unique(),
  minResponseCount: integer().notNull().default(0),
  stats: jsonb().array().notNull().$type<TruliaReviewStats[]>(),
});

export type InsertLocalReview = typeof localReviews.$inferInsert;
