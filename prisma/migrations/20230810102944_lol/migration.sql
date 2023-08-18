-- DropForeignKey
ALTER TABLE "Outlets" DROP CONSTRAINT "Outlets_userId_fkey";

-- AddForeignKey
ALTER TABLE "Outlets" ADD CONSTRAINT "Outlets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
