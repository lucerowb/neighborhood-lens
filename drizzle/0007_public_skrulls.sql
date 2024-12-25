CREATE TABLE "neighborhood_lens_places_main_category" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "neighborhood_lens_places_main_category_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"category_id" uuid DEFAULT gen_random_uuid(),
	"category_name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "neighborhood_lens_places_sub_category" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "neighborhood_lens_places_sub_category_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"main_category_id" integer NOT NULL
);
