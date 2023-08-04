/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Outlets` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Outlets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Outlets" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Outlets_userId_key" ON "Outlets"("userId");

-- AddForeignKey
ALTER TABLE "Outlets" ADD CONSTRAINT "Outlets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
