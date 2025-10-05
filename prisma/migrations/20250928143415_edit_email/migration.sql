/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `adotantes` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."adotantes" ALTER COLUMN "email" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "adotantes_email_key" ON "public"."adotantes"("email");
