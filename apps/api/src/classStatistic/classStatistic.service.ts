import { NotFoundError } from '@/err/customErrors';
import { ClassStatisticResponse } from '@contracts/schemas/classStatistic/classStatisticResponse';
import { UpdateClassStatisticRequest } from '@contracts/schemas/classStatistic/updateClassStatisticRequest';
import { ClassStatisticMapper } from './classStatistic.mapper';
import { classStatisticRepo } from './classStatistic.repo';

class ClassStatisticService {
  async updateClassStatistic(id: string, schema: UpdateClassStatisticRequest): Promise<ClassStatisticResponse> {
    const classStatistic = await classStatisticRepo.getById(id);
    if (!classStatistic) {
      throw new NotFoundError('Class statistic not found');
    }

    const updatedClassStatistic = await classStatisticRepo.updateById(id, schema);
    const classStatisticResponse = ClassStatisticMapper.toRequest(updatedClassStatistic);
    return classStatisticResponse;
  }

  async getById(id: string): Promise<ClassStatisticResponse> {
    const classStatistic = await classStatisticRepo.getById(id);
    if (!classStatistic) {
      throw new NotFoundError('Class statistic not found');
    }
    const classStatisticResponse = ClassStatisticMapper.toRequest(classStatistic);
    return classStatisticResponse;
  }
  async deleteById(id: string): Promise<void> {
    const classStatistic = await classStatisticRepo.getById(id);
    if (!classStatistic) {
      throw new NotFoundError('Class statistic not found');
    }
    await classStatisticRepo.deleteById(id);
  }
}

export const classStatisticService = new ClassStatisticService();
