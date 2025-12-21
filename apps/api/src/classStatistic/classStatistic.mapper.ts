import { ClassStatistic } from '@/generated/prisma/client';
import { ClassStatisticResponse } from '@contracts/schemas/classStatistic/classStatisticResponse';

export class ClassStatisticMapper {
  static toRequest(data: ClassStatistic): ClassStatisticResponse {
    return {
      id: data.id,
      maleStudents: data.maleStudents,
      femaleStudents: data.femaleStudents,
    };
  }
  static toResponses(data: ClassStatistic[]): ClassStatisticResponse[] {
    return data.map(this.toRequest);
  }
}
