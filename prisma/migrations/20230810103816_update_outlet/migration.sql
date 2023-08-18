-- DropForeignKey
ALTER TABLE "Outlets" DROP CONSTRAINT "Outlets_userId_fkey";

-- AlterTable
ALTER TABLE "Outlets" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Outlets" ADD CONSTRAINT "Outlets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
