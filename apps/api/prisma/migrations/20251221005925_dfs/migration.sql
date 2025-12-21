/*
  Warnings:

  - A unique constraint covering the columns `[name,type]` on the table `School` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "School_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "School_name_type_key" ON "School"("name", "type");
