/*
  Warnings:

  - You are about to drop the column `number` on the `Machines` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Machines_number_key";

-- AlterTable
ALTER TABLE "Machines" DROP COLUMN "number";
