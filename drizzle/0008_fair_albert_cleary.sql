ALTER TABLE "neighborhood_lens_places_sub_category" ADD COLUMN "fsq_category_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "neighborhood_lens_places_sub_category" ADD COLUMN "fsq_category_name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "neighborhood_lens_places_sub_category" ADD CONSTRAINT "neighborhood_lens_places_sub_category_fsq_category_id_unique" UNIQUE("fsq_category_id");