/*
  Warnings:

  - You are about to drop the `Machine` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'Staff', 'Worker');

-- DropForeignKey
ALTER TABLE "Machine" DROP CONSTRAINT "Machine_modelId_fkey";

-- DropTable
DROP TABLE "Machine";

-- CreateTable
CREATE TABLE "Machines" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "isOperational" BOOLEAN NOT NULL,
    "modelId" INTEGER,
    "outletId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Machines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TroubleShoots" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "TroubleShoots_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Machines_name_key" ON "Machines"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Machines_number_key" ON "Machines"("number");

-- AddForeignKey
ALTER TABLE "Machines" ADD CONSTRAINT "Machines_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Machines" ADD CONSTRAINT "Machines_outletId_fkey" FOREIGN KEY ("outletId") REFERENCES "Outlets"("id") ON DELETE SET NULL ON UPDATE CASCADE;
