/*
  Warnings:

  - You are about to drop the column `data` on the `adocoes` table. All the data in the column will be lost.
  - Added the required column `data_adocao` to the `adocoes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."adocoes" DROP COLUMN "data",
ADD COLUMN     "data_adocao" TIMESTAMP(3) NOT NULL;
