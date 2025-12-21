/*
  Warnings:

  - You are about to drop the `SecondarySchool` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ClassStatistic" DROP CONSTRAINT "ClassStatistic_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "Director" DROP CONSTRAINT "Director_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "School" DROP CONSTRAINT "School_regionId_fkey";

-- DropForeignKey
ALTER TABLE "SecondarySchool" DROP CONSTRAINT "SecondarySchool_schoolId_fkey";

-- DropIndex
DROP INDEX "CurriculumComponent_name_key";

-- DropTable
DROP TABLE "SecondarySchool";

-- CreateTable
CREATE TABLE "MiddleSchool" (
    "schoolId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MiddleSchool_pkey" PRIMARY KEY ("schoolId")
);

-- AddForeignKey
ALTER TABLE "Director" ADD CONSTRAINT "Director_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "School" ADD CONSTRAINT "School_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MiddleSchool" ADD CONSTRAINT "MiddleSchool_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassStatistic" ADD CONSTRAINT "ClassStatistic_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "MiddleSchool"("schoolId") ON DELETE RESTRICT ON UPDATE CASCADE;
