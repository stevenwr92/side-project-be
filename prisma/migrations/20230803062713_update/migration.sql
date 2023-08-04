/*
  Warnings:

  - You are about to drop the column `modelId` on the `Machines` table. All the data in the column will be lost.
  - You are about to drop the `Model` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Machines" DROP CONSTRAINT "Machines_modelId_fkey";

-- AlterTable
ALTER TABLE "Machines" DROP COLUMN "modelId";

-- DropTable
DROP TABLE "Model";
