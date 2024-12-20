CREATE TABLE "neighborhood_lens_local_reviews" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "neighborhood_lens_local_reviews_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"property_id" varchar(255) NOT NULL,
	"minResponseCount" integer DEFAULT 0 NOT NULL,
	"stats" jsonb[] NOT NULL,
	CONSTRAINT "neighborhood_lens_local_reviews_property_id_unique" UNIQUE("property_id")
);
