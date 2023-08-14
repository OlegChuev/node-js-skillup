/*
  Warnings:

  - Made the column `stripe_subscription_is_active` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - A unique constraint covering the columns `[stripe_customer_id]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stripe_subscription_id]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "stripe_subscription_is_active" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Users_stripe_customer_id_key" ON "Users"("stripe_customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_stripe_subscription_id_key" ON "Users"("stripe_subscription_id");
