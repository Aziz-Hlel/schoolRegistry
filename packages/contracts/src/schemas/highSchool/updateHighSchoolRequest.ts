import z from 'zod';
import { SchoolType } from '../../types/enums/enums';
import { createSchoolSchema } from '../school/createSchoolSchema';
import { updateClassStatisticFromSchoolSchema } from '../classStatistic/updateClassStatisticFromSchool';

export const updateHighSchoolRequestSchema = createSchoolSchema.extend({
  type: z.literal(SchoolType.HIGH).catch(SchoolType.HIGH),
  classStatistics: z.array(updateClassStatisticFromSchoolSchema),
});

export type UpdateHighSchoolRequest = z.infer<typeof updateHighSchoolRequestSchema>;
