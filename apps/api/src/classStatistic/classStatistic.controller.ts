import { createClassStatisticRequestSchema } from '@contracts/schemas/classStatistic/createClassStatisticRequest';
import { Request, Response } from 'express';
import { classStatisticService } from './classStatistic.service';
import { SimpleApiResponse } from '@contracts/types/api/SimpleApiResponse.dto';

class ClassStatisticController {
  async updateById(req: Request, res: Response) {
    const parsedBody = createClassStatisticRequestSchema.parse(req.body);
    const classStatisticId = req.params.id;

    const updatedClassStatistic = await classStatisticService.updateClassStatistic(classStatisticId, parsedBody);
    res.status(200).json(updatedClassStatistic);
  }
  async getById(req: Request, res: Response) {
    const classStatisticId = req.params.id;

    const classStatistic = await classStatisticService.getById(classStatisticId);
    res.status(200).json(classStatistic);
  }

  async deleteById(req: Request, res: Response<SimpleApiResponse>) {
    const classStatisticId = req.params.id;

    await classStatisticService.deleteById(classStatisticId);
    res.status(200).json({ message: 'Class statistic deleted successfully' });
  }
}

export const classStatisticController = new ClassStatisticController();
