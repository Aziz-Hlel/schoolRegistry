/*
  Warnings:

  - A unique constraint covering the columns `[sortOrder]` on the table `Region` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sortOrder` to the `Region` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Region" ADD COLUMN     "sortOrder" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Region_sortOrder_key" ON "Region"("sortOrder");
