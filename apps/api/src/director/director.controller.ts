import { Request, Response } from 'express';
import { directorService } from './director.service';
import { SimpleApiResponse } from '@contracts/types/api/SimpleApiResponse.dto';
import { DirectorResponse } from '@contracts/schemas/director/DirectorResponse';

class DirectorController {
  async updateDirector(req: Request, res: Response<DirectorResponse>) {
    const directorId = req.params.id;
    const schema = req.body;

    const updatedDirector = await directorService.updateDirector(directorId, schema);

    res.status(200).json(updatedDirector);
  }

  async deleteDirector(req: Request, res: Response<SimpleApiResponse>) {
    const directorId = req.params.id;
    await directorService.deleteDirector(directorId);

    res.status(200).json({ message: 'Director deleted successfully' });
  }
}

export const directorController = new DirectorController();
