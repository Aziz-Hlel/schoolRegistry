-- CreateEnum
CREATE TYPE "SchoolType" AS ENUM ('HIGH', 'SECONDARY');

-- CreateEnum
CREATE TYPE "CurriculumComponentKind" AS ENUM ('MAJOR', 'ELECTIVE');

-- CreateTable
CREATE TABLE "Region" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Director" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "schoolId" TEXT NOT NULL,

    CONSTRAINT "Director_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "School" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "SchoolType" NOT NULL,
    "regionId" TEXT,
    "staffCount" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "School_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HighSchool" (
    "schoolId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HighSchool_pkey" PRIMARY KEY ("schoolId")
);

-- CreateTable
CREATE TABLE "SecondarySchool" (
    "schoolId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SecondarySchool_pkey" PRIMARY KEY ("schoolId")
);

-- CreateTable
CREATE TABLE "CurriculumComponent" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "kind" "CurriculumComponentKind" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CurriculumComponent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassStatistic" (
    "id" TEXT NOT NULL,
    "maleStudents" INTEGER NOT NULL,
    "femaleStudents" INTEGER NOT NULL,
    "componentId" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,

    CONSTRAINT "ClassStatistic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Region_name_key" ON "Region"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Director_schoolId_key" ON "Director"("schoolId");

-- CreateIndex
CREATE UNIQUE INDEX "School_name_key" ON "School"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CurriculumComponent_name_key" ON "CurriculumComponent"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ClassStatistic_schoolId_componentId_key" ON "ClassStatistic"("schoolId", "componentId");

-- AddForeignKey
ALTER TABLE "Director" ADD CONSTRAINT "Director_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "School" ADD CONSTRAINT "School_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HighSchool" ADD CONSTRAINT "HighSchool_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SecondarySchool" ADD CONSTRAINT "SecondarySchool_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassStatistic" ADD CONSTRAINT "ClassStatistic_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "CurriculumComponent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassStatistic" ADD CONSTRAINT "ClassStatistic_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "SecondarySchool"("schoolId") ON DELETE RESTRICT ON UPDATE CASCADE;
