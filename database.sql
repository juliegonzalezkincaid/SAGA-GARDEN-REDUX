CREATE DATABASE "garden";

CREATE TABLE "plant" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (100) NOT NULL,
    "kingdom" VARCHAR (100),
    "clade" VARCHAR (100),
    "order" VARCHAR (100),
    "family" VARCHAR (100),
    "subfamily" VARCHAR (100),
    "genus" VARCHAR (100)
);

INSERT INTO "plant" ("name", "kingdom", "clade", "order", "family", "subfamily", "genus")
VALUES ('Rose', 'Plantae', 'Angiosperms', 'Rosales', 'Rosaceae', 'Rosoideae', 'Rosa'),
('Tulip', 'Plantae', 'Angiosperms', 'Liliales', 'Liliaceae', 'Lilieae', 'Tulipa'),
('Oak', 'Plantae', 'Angiosperms', 'Fagales', 'Fagaceae', NULL, 'Quercus');
