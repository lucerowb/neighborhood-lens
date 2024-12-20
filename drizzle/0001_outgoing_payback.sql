CREATE TABLE "neighborhood_lens_places" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "neighborhood_lens_places_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"fsq_id" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"property_list" varchar(255)[] NOT NULL,
	"category_name" varchar(255) NOT NULL,
	"location" "point" NOT NULL,
	"distance" numeric,
	"rating" numeric(2, 1),
	"address" varchar(255),
	"photos" jsonb[],
	CONSTRAINT "neighborhood_lens_places_fsq_id_unique" UNIQUE("fsq_id")
);
