DROP DATABASE IF EXISTS launchstore;
CREATE DATABASE launchstore;

CREATE TABLE "products" (
	"id" SERIAL PRIMARY KEY,
  "category_id" int NOT NULL,
  "user_id" int,
  "name" text NOT NULL,
  "description" text NOT NULL,
  "old_price" int,
  "price" int NOT NULL,
  "quantity" int DEFAULT 0,
  "status" int DEFAULT 1,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);
  
CREATE TABLE "categories" (
	"id" SERIAL PRIMARY KEY,
  "name" text NOT NULL
);
    
CREATE TABLE "files" (
	"id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "path" text NOT NULL,
  "product_id" int NOT NULL
);

CREATE TABLE "users" (
	"id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "email" text UNIQUE NOT NULL,
  "password" text NOT NULL,
  "cpf_cnpj" int UNIQUE NOT NULL,
  "cep" text,
  "address" text,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

ALTER TABLE "products" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");
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
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

INSERT INTO categories(name) VALUES('Eletrônicos');
INSERT INTO categories(name) VALUES('Roupas');
INSERT INTO categories(name) VALUES('Móveis');
INSERT INTO categories(name) VALUES('Comida');