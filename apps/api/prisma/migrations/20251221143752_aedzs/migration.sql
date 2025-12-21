-- DropForeignKey
ALTER TABLE "ClassStatistic" DROP CONSTRAINT "ClassStatistic_componentId_fkey";

-- DropForeignKey
ALTER TABLE "ClassStatistic" DROP CONSTRAINT "ClassStatistic_schoolId_fkey";

-- AddForeignKey
ALTER TABLE "ClassStatistic" ADD CONSTRAINT "ClassStatistic_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "CurriculumComponent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassStatistic" ADD CONSTRAINT "ClassStatistic_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "HighSchool"("schoolId") ON DELETE CASCADE ON UPDATE CASCADE;
