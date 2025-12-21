import { NotFoundError } from '@/err/customErrors';
import { DirectorResponse } from '@contracts/schemas/director/DirectorResponse';
import { UpdateDirectorRequest } from '@contracts/schemas/director/updateDirectorRequest';
import { directorRepo } from './director.repo';
import { DirectorMapper } from './director.mapper';

class DirectorService {
  async updateDirector(id: string, schema: UpdateDirectorRequest): Promise<DirectorResponse> {
    const directorRecord = await directorRepo.getDirectorById(id);

    if (!directorRecord) {
      throw new NotFoundError('Director id not found');
    }

    const updatedDirector = await directorRepo.updateDirector(id, schema);

    const directorResponse = DirectorMapper.toResponse(updatedDirector);

    return directorResponse;
  }

  async deleteDirector(id: string): Promise<void> {
    const directorRecord = await directorRepo.getDirectorById(id);

    if (!directorRecord) {
      throw new NotFoundError('Director id not found');
    }

    await directorRepo.deleteDirector(id);
  }
}
export const directorService = new DirectorService();
