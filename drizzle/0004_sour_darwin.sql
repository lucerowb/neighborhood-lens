CREATE TABLE "neighborhood_lens_fsq_categories" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "neighborhood_lens_fsq_categories_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"category_id" integer NOT NULL,
	"category_name" varchar(255) NOT NULL,
	CONSTRAINT "neighborhood_lens_fsq_categories_category_id_unique" UNIQUE("category_id")
);
