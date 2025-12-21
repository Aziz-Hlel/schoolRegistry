import z from 'zod';
import { createSchoolSchema } from '../school/createSchoolSchema';
import { SchoolType } from '../../types/enums/enums';
import { createClassStatisticRequestSchema } from '../classStatistic/createClassStatisticRequest';

const createHighSchoolRequestSchema = createSchoolSchema.extend({
  type: z.literal(SchoolType.HIGH).catch(SchoolType.HIGH),
  classStatistics: z.array(createClassStatisticRequestSchema),
});
type CreateHighSchoolRequest = z.infer<typeof createHighSchoolRequestSchema>;

export { createHighSchoolRequestSchema };
export type { CreateHighSchoolRequest };
