/*
  Warnings:

  - A unique constraint covering the columns `[name,kind]` on the table `CurriculumComponent` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "CurriculumComponent_name_idx" ON "CurriculumComponent"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CurriculumComponent_name_kind_key" ON "CurriculumComponent"("name", "kind");
