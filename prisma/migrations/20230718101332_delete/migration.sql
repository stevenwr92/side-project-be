-- DropForeignKey
ALTER TABLE "Machine" DROP CONSTRAINT "Machine_modelId_fkey";

-- AlterTable
ALTER TABLE "Machine" ALTER COLUMN "modelId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Machine" ADD CONSTRAINT "Machine_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model"("id") ON DELETE SET NULL ON UPDATE CASCADE;
