/*
  Warnings:

  - You are about to drop the column `deliveryAddress` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `Orders` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_userId_userName_deliveryAddress_fkey";

-- DropIndex
DROP INDEX "Users_id_name_address_key";

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "deliveryAddress",
DROP COLUMN "userName";

-- CreateIndex
CREATE UNIQUE INDEX "Users_id_key" ON "Users"("id");

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
