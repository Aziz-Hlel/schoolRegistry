import { createMiddleSchoolRequestSchema } from '@contracts/schemas/middleSchool/createMiddleSchoolRequest';
import { Request, Response } from 'express';
import { middleSchoolService } from './middleSchool.service';
import { MiddleSchoolResponse } from '@contracts/schemas/middleSchool/middleSchoolResponse';
import { SimpleApiResponse } from '@contracts/types/api/SimpleApiResponse.dto';

class MiddleSchoolController {
  async createMiddleSchool(req: Request, res: Response<MiddleSchoolResponse>) {
    const parsedBody = createMiddleSchoolRequestSchema.parse(req.body);
    const middleSchool = await middleSchoolService.createMiddleSchool(parsedBody);
    res.status(201).json(middleSchool);
  }

  async updateMiddleSchool(req: Request, res: Response<MiddleSchoolResponse>) {
    const middleSchoolId = req.params.id;
    const parsedBody = createMiddleSchoolRequestSchema.parse(req.body);

    const updatedMiddleSchool = await middleSchoolService.updateMiddleSchool(middleSchoolId, parsedBody);
    res.status(200).json(updatedMiddleSchool);
  }

  async getMiddleSchoolById(req: Request, res: Response<MiddleSchoolResponse>) {
    const middleSchoolId = req.params.id;

    const middleSchool = await middleSchoolService.getMiddleSchoolById(middleSchoolId);
    res.status(200).json(middleSchool);
  }

  async getMiddleSchools(_: Request, res: Response<MiddleSchoolResponse[]>) {
    const middleSchools = await middleSchoolService.getMiddleSchools();
    res.status(200).json(middleSchools);
  }

  async deleteMiddleSchool(req: Request, res: Response<SimpleApiResponse>) {
    const middleSchoolId = req.params.id;

    await middleSchoolService.deleteMiddleSchool(middleSchoolId);
    res.status(200).json({ message: 'Middle school deleted successfully' });
  }
}

export const middleSchoolController = new MiddleSchoolController();
