CREATE TABLE "neighborhood_lens_nearby_attractions" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "neighborhood_lens_nearby_attractions_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"fsq_id" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"category_id" integer NOT NULL,
	"sub_category_id" integer NOT NULL,
	"property_id" varchar(255) NOT NULL,
	"category_icon" jsonb,
	"location" "point" NOT NULL,
	"distance" numeric,
	"rating" numeric(2, 1),
	"address" varchar(255),
	"photos" jsonb[],
	"features" jsonb
);
