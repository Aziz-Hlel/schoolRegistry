/*
  Warnings:

  - The values [SECONDARY] on the enum `SchoolType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SchoolType_new" AS ENUM ('HIGH', 'MIDDLE');
ALTER TABLE "School" ALTER COLUMN "type" TYPE "SchoolType_new" USING ("type"::text::"SchoolType_new");
ALTER TYPE "SchoolType" RENAME TO "SchoolType_old";
ALTER TYPE "SchoolType_new" RENAME TO "SchoolType";
DROP TYPE "public"."SchoolType_old";
COMMIT;
