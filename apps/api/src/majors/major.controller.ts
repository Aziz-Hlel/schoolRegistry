import { createMajorRequestSchema } from '@contracts/schemas/major/createMajorRequest';
import { MajorResponse } from '@contracts/schemas/major/majorResponse';
import { Request, Response } from 'express';
import { majorService } from './major.service';
import { updateMajorRequestSchema } from '@contracts/schemas/major/updateMajorRequest';
import { SimpleApiResponse } from '@contracts/types/api/SimpleApiResponse.dto';
import { orderMajorRequestSchema } from '@contracts/schemas/major/orderMajorRequest';

class MajorController {
  async createMajor(req: Request, res: Response<MajorResponse>) {
    const parsedBody = createMajorRequestSchema.parse(req.body);

    const major = await majorService.createMajor(parsedBody);

    res.status(201).json(major);
  }

  async updateMajor(req: Request, res: Response<MajorResponse>) {
    const majorId = req.params.id;
    const parsedBody = updateMajorRequestSchema.parse(req.body);
    const updatedMajor = await majorService.updateMajor(majorId, parsedBody);
    res.status(200).json(updatedMajor);
  }

  async getMajor(req: Request, res: Response<MajorResponse>) {
    const majorId = req.params.id;

    const major = await majorService.getMajorById(majorId);

    res.status(200).json(major);
  }

  async getMajors(req: Request, res: Response<MajorResponse[]>) {
    const majors = await majorService.getAll();

    res.status(200).json(majors);
  }

  async deleteMajor(req: Request, res: Response<SimpleApiResponse>) {
    const majorId = req.params.id;
    await majorService.deleteMajor(majorId);

    res.status(200).json({ message: 'Major deleted successfully' });
  }

  async orderMajors(req: Request, res: Response<SimpleApiResponse>) {
    const parsedBody = orderMajorRequestSchema.parse(req.body);

    await majorService.orderMajors(parsedBody.majors);

    res.status(200).json({ message: 'Majors ordered successfully' });
  }
}

export const majorController = new MajorController();
