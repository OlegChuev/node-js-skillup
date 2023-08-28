/*
  Warnings:

  - Added the required column `country` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postal_code` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "country" VARCHAR(255) NOT NULL,
ADD COLUMN     "postal_code" VARCHAR(255) NOT NULL;
