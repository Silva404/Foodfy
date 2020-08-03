DROP DATABASE IF EXISTS foodfy;
CREATE DATABASE foodfy;

CREATE TABLE "recipes" (
	"id" SERIAL PRIMARY KEY,
  "title" text NOT NULL,
  "chef_id" int NOT NULL,
  "ingredients" text[] NOT NULL,
  "preparation" text[] NOT NULL,
  "information" text NOT NULL,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);
  
CREATE TABLE "recipe_files" (
	"id" SERIAL PRIMARY KEY,
  "recipe_id" int NOT NULL,
  "file_id" int NOT NULL 
);

CREATE TABLE "files" (
	"id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "path" text NOT NULL
);

CREATE TABLE "chefs" (
	"id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "file_id" int UNIQUE NOT NULL,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

ALTER TABLE "recipes" ADD FOREIGN KEY ("chef_id") REFERENCES "chefs" ("id");
ALTER TABLE "files" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");
ALTER TABLE "products" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

CREATE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW ();
  RETURN NEW;	
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON recipes
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON chefs
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

INSERT INTO categories(name) VALUES('Eletrônicos');