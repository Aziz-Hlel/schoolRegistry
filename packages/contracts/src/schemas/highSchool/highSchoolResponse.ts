import { Prettify } from 'zod/v4/core/util';
import { ClassStatisticResponse } from '../classStatistic/classStatisticResponse';
import { SchoolResponse } from '../school/schoolResponse';

export type HighSchoolResponse = Prettify<
  SchoolResponse & {
    classStatistics: ClassStatisticResponse[];
  }
>;
