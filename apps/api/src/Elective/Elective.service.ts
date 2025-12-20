import { CreateOptionalSubjectRequest } from '@contracts/schemas/optionalSubject/createOptionalSubjectRequest';
import { electiveRepo } from './Elective.repo';
import { BadRequestError, NotFoundError } from '@/err/customErrors';
import { OptionalSubjectResponse } from '@contracts/schemas/optionalSubject/OptionalSubjectResponse';
import { ElectiveMapper } from './Elective.mapper';
import { UpdateOptionalSubjectRequest } from '@contracts/schemas/optionalSubject/updateOptionalSubjectRequest';

class ElectiveService {
  async createOptionalSubject(optionalSubject: CreateOptionalSubjectRequest): Promise<OptionalSubjectResponse> {
    const { name } = optionalSubject;

    const isOptionalSubjectNameTaken = await electiveRepo.isOptionalSubjectNameTaken(name);

    if (isOptionalSubjectNameTaken) {
      throw new BadRequestError('Optional Subject name is already taken');
    }
    const newOptionalSubject = await electiveRepo.createOptionalSubject(optionalSubject);

    const optionalSubjectResponse = ElectiveMapper.toResponse(newOptionalSubject);

    return optionalSubjectResponse;
  }

  async updateOptionalSubject(id: string, schema: UpdateOptionalSubjectRequest): Promise<OptionalSubjectResponse> {
    const optionalSubjectRecord = await electiveRepo.getOptionalSubjectById(id);

    if (!optionalSubjectRecord) {
      throw new NotFoundError('Optional Subject id not found');
    }

    const updatedOptionalSubject = await electiveRepo.updateOptionalSubject(id, schema);

    const optionalSubjectResponse = ElectiveMapper.toResponse(updatedOptionalSubject);

    return optionalSubjectResponse;
  }

  async getOptionalSubjectById(id: string): Promise<OptionalSubjectResponse> {
    const optionalSubjectRecord = await electiveRepo.getOptionalSubjectById(id);

    if (!optionalSubjectRecord) {
      throw new NotFoundError('Optional Subject id not found');
    }

    const optionalSubjectResponse = ElectiveMapper.toResponse(optionalSubjectRecord);

    return optionalSubjectResponse;
  }

  async getAllOptionalSubjects(): Promise<OptionalSubjectResponse[]> {
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
