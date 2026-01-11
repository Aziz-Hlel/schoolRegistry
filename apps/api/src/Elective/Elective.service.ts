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

    const sortOrder = await electiveRepo.getNewElectiveSortOrder();

    const newOptionalSubject = await electiveRepo.create(optionalSubject, sortOrder);

    const optionalSubjectResponse = ElectiveMapper.toResponse(newOptionalSubject);

    return optionalSubjectResponse;
  }

  async updateOptionalSubject(id: string, schema: UpdateElectiveRequest): Promise<ElectiveResponse> {
    const optionalSubjectRecord = await electiveRepo.getById(id);

    if (!optionalSubjectRecord) {
      throw new NotFoundError('Optional Subject id not found');
    }

    const updatedOptionalSubject = await electiveRepo.update(id, schema);

    const optionalSubjectResponse = ElectiveMapper.toResponse(updatedOptionalSubject);

    return optionalSubjectResponse;
  }

  async getOptionalSubjectById(id: string): Promise<ElectiveResponse> {
    const optionalSubjectRecord = await electiveRepo.getById(id);

    if (!optionalSubjectRecord) {
      throw new NotFoundError('Optional Subject id not found');
    }

    const optionalSubjectResponse = ElectiveMapper.toResponse(optionalSubjectRecord);

    return optionalSubjectResponse;
  }

  async getAllOptionalSubjects(): Promise<ElectiveResponse[]> {
    const optionalSubjects = await electiveRepo.getAll();

    const optionalSubjectResponses = ElectiveMapper.toResponses(optionalSubjects);

    return optionalSubjectResponses;
  }

  async deleteOptionalSubject(id: string): Promise<void> {
    const optionalSubjectRecord = await electiveRepo.getById(id);

    if (!optionalSubjectRecord) {
      throw new NotFoundError('Optional Subject id not found');
    }

    await electiveRepo.deleteOptionalSubject(id);
  }

  async orderElectives(electiveIdsInOrder: string[]): Promise<void> {
    const existingElectives = await electiveRepo.getAll();
    const existingElectiveIds = new Set(existingElectives.map((elective) => elective.id));

    const invalidIds = electiveIdsInOrder.filter((id) => !existingElectiveIds.has(id));
    if (invalidIds.length > 0) {
      throw new BadRequestError(`Elective IDs not found : ${invalidIds.join(', ')}`);
    }

    if (new Set(electiveIdsInOrder).size !== electiveIdsInOrder.length) {
      throw new BadRequestError('Duplicate Elective IDs found in the order request');
    }

    await electiveRepo.orderElectives(electiveIdsInOrder);
  }
}

export const electiveService = new ElectiveService();
