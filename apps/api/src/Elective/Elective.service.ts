import { CreateElectiveRequest } from '@contracts/schemas/elective/createElectiveRequest';
import { electiveRepo } from './Elective.repo';
import { BadRequestError, NotFoundError } from '@/err/customErrors';
import { ElectiveResponse } from '@contracts/schemas/elective/ElectiveResponse';
import { ElectiveMapper } from './Elective.mapper';
import { UpdateElectiveRequest } from '@contracts/schemas/elective/updateElectiveRequest';

class ElectiveService {
  async createOptionalSubject(optionalSubject: CreateElectiveRequest): Promise<ElectiveResponse> {
    const { name } = optionalSubject;

    const isOptionalSubjectNameTaken = await electiveRepo.isElectiveNameTaken(name);

    if (isOptionalSubjectNameTaken) {
      throw new BadRequestError('Optional Subject name is already taken');
    }
    const newOptionalSubject = await electiveRepo.createOptionalSubject(optionalSubject);

    const optionalSubjectResponse = ElectiveMapper.toResponse(newOptionalSubject);

    return optionalSubjectResponse;
  }

  async updateOptionalSubject(id: string, schema: UpdateElectiveRequest): Promise<ElectiveResponse> {
    const optionalSubjectRecord = await electiveRepo.getOptionalSubjectById(id);

    if (!optionalSubjectRecord) {
      throw new NotFoundError('Optional Subject id not found');
    }

    const updatedOptionalSubject = await electiveRepo.updateOptionalSubject(id, schema);

    const optionalSubjectResponse = ElectiveMapper.toResponse(updatedOptionalSubject);

    return optionalSubjectResponse;
  }

  async getOptionalSubjectById(id: string): Promise<ElectiveResponse> {
    const optionalSubjectRecord = await electiveRepo.getOptionalSubjectById(id);

    if (!optionalSubjectRecord) {
      throw new NotFoundError('Optional Subject id not found');
    }

    const optionalSubjectResponse = ElectiveMapper.toResponse(optionalSubjectRecord);

    return optionalSubjectResponse;
  }

  async getAllOptionalSubjects(): Promise<ElectiveResponse[]> {
    const optionalSubjects = await electiveRepo.getAllOptionalSubjects();

    const optionalSubjectResponses = ElectiveMapper.toResponses(optionalSubjects);

    return optionalSubjectResponses;
  }

  async deleteOptionalSubject(id: string): Promise<void> {
    const optionalSubjectRecord = await electiveRepo.getOptionalSubjectById(id);

    if (!optionalSubjectRecord) {
      throw new NotFoundError('Optional Subject id not found');
    }

    await electiveRepo.deleteOptionalSubject(id);
  }
}

export const electiveService = new ElectiveService();
