/*
  Warnings:

  - The values [OUTRO] on the enum `Especie` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."Especie_new" AS ENUM ('CACHORRO', 'GATO', 'PEIXE', 'TARTARUGA');
ALTER TABLE "public"."pets" ALTER COLUMN "especie" TYPE "public"."Especie_new" USING ("especie"::text::"public"."Especie_new");
ALTER TYPE "public"."Especie" RENAME TO "Especie_old";
ALTER TYPE "public"."Especie_new" RENAME TO "Especie";
DROP TYPE "public"."Especie_old";
COMMIT;
