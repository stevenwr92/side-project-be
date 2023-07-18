/*
  Warnings:

  - Added the required column `status` to the `Machine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Machine" ADD COLUMN     "status" TEXT NOT NULL;
