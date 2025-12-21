/*
  Warnings:

  - A unique constraint covering the columns `[kind,sortOrder]` on the table `CurriculumComponent` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sortOrder` to the `CurriculumComponent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CurriculumComponent" ADD COLUMN     "sortOrder" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CurriculumComponent_kind_sortOrder_key" ON "CurriculumComponent"("kind", "sortOrder");
