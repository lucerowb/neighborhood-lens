import { decimal, integer, jsonb, pgTable, pgTableCreator, point, varchar } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `neighborhood_lens_${name}`);

export const places = pgTable("neighborhood_lens_places", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  fsq_id: varchar({ length: 255 }).notNull().unique(),
  name: varchar({ length: 255 }).notNull(),
  property_ids: varchar("property_list", { length: 255 }).array().notNull(),
  category_name: varchar({ length: 255 }).notNull(),
  coordinates: point("location", { mode: "xy" }).notNull(),
  distance: decimal(),
  rating: decimal({ precision: 2, scale: 1 }),
  address: varchar({ length: 255 }),
  photos: jsonb().array(),
});

export type InsertPlace = typeof places.$inferInsert;
