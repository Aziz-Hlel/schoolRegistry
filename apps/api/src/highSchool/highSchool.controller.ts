import { createHighSchoolRequestSchema } from '@contracts/schemas/highSchool/createHighSchoolRequest';
import { Request, Response } from 'express';
import { highSchoolService } from './highSchool.service';
import { updateHighSchoolRequestSchema } from '@contracts/schemas/highSchool/updateHighSchoolRequest';
import { SimpleApiResponse } from '@contracts/types/api/SimpleApiResponse.dto';

class HighSchoolController {
  async create(req: Request, res: Response) {
    const parsedBody = createHighSchoolRequestSchema.parse(req.body);
    const highSchool = await highSchoolService.createHighSchool(parsedBody);
    res.status(201).json(highSchool);
  }
  async updateById(req: Request, res: Response) {
    const highSchoolId = req.params.id;
    const parsedBody = updateHighSchoolRequestSchema.parse(req.body);

    const updatedHighSchool = await highSchoolService.updateById(highSchoolId, parsedBody);
    res.status(200).json(updatedHighSchool);
  }
  async getById(req: Request, res: Response) {
    const highSchoolId = req.params.id;

    const highSchool = await highSchoolService.getById(highSchoolId);
    res.status(200).json(highSchool);
  }
  async getAll(_: Request, res: Response) {
    const highSchools = await highSchoolService.getAll();
    res.status(200).json(highSchools);
  }
  async deleteById(req: Request, res: Response<SimpleApiResponse>) {
    const highSchoolId = req.params.id;

    await highSchoolService.deleteById(highSchoolId);
    res.status(200).json({ message: 'High school deleted successfully' });
  }
}

export const highSchoolController = new HighSchoolController();
