import { createElectiveRequestSchema } from '@contracts/schemas/elective/createElectiveRequest';
import { Request, Response } from 'express';
import { electiveService } from './Elective.service';
import { updateElectiveRequestSchema } from '@contracts/schemas/elective/updateElectiveRequest';
import { ElectiveResponse } from '@contracts/schemas/elective/ElectiveResponse';
import { SimpleApiResponse } from '@contracts/types/api/SimpleApiResponse.dto';

class ElectiveController {
  async createOptionalSubject(req: Request, res: Response<ElectiveResponse>) {
    const parsedBody = createElectiveRequestSchema.parse(req.body);

    const optionalSubject = await electiveService.createOptionalSubject(parsedBody);

    res.status(201).json(optionalSubject);
  }

  async updateOptionalSubject(req: Request, res: Response) {
    const parsedBody = updateElectiveRequestSchema.parse(req.body);
    const optionalSubjectId = req.params.id;
    const updatedOptionalSubject = await electiveService.updateOptionalSubject(optionalSubjectId, parsedBody);
    res.status(200).json(updatedOptionalSubject);
  }

  async getOptionalSubject(req: Request, res: Response<ElectiveResponse>) {
    const optionalSubjectId = req.params.id;

    const optionalSubject = await electiveService.getOptionalSubjectById(optionalSubjectId);

    res.status(200).json(optionalSubject);
  }

  async getOptionalSubjects(req: Request, res: Response<ElectiveResponse[]>) {
    const optionalSubjects = await electiveService.getAllOptionalSubjects();

    res.status(200).json(optionalSubjects);
  }

  async deleteOptionalSubject(req: Request, res: Response<SimpleApiResponse>) {
    const optionalSubjectId = req.params.id;
    await electiveService.deleteOptionalSubject(optionalSubjectId);

    res.status(200).json({ message: 'Optional Subject deleted successfully' });
  }
}

export const electiveController = new ElectiveController();
