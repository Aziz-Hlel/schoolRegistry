import { CreateMajorRequest } from '@contracts/schemas/major/createMajorRequest';
import { MajorResponse } from '@contracts/schemas/major/majorResponse';
import { majorRepo } from './major.repo';
import { BadRequestError, NotFoundError } from '@/err/customErrors';
import { prisma } from '@/bootstrap/db.init';
import { CurriculumComponentKind } from '@contracts/types/enums/enums';
import { MajorMapper } from './major.mapper';
import { UpdateMajorRequest } from '@contracts/schemas/major/updateMajorRequest';

class MajorService {
  async createMajor(major: CreateMajorRequest): Promise<MajorResponse> {
    const majorName = major.name;

    const isMajorNameTaken = await majorRepo.isMajorNameTaken(majorName);

    if (isMajorNameTaken) {
      throw new BadRequestError('Major name is already taken');
    }

    const newMajorSortOrder = await majorRepo.getNewMajorSortOrder();
    const createdMajor = await majorRepo.createMajor(major, newMajorSortOrder);

    const majorResponse = MajorMapper.toMajorResponse(createdMajor);

    return majorResponse;
  }

  async updateMajor(id: string, parsedSchema: UpdateMajorRequest): Promise<MajorResponse> {
    const major = await majorRepo.getMajorById(id);
    if (!major) {
      throw new NotFoundError('Major not found');
    }
    const updatedMajor = await majorRepo.updateMajor(id, parsedSchema);
    return MajorMapper.toMajorResponse(updatedMajor);
  }

  async getMajorById(id: string): Promise<MajorResponse> {
    const major = await majorRepo.getMajorById(id);
    if (!major) {
      throw new NotFoundError('Major not found');
    }
    const majorResponse = MajorMapper.toMajorResponse(major);
    return majorResponse;
  }

  async getAll(): Promise<MajorResponse[]> {
    const majors = await majorRepo.getAll();
    return MajorMapper.toMajorResponses(majors);
  }

  async deleteMajor(id: string): Promise<void> {
    const major = await majorRepo.getMajorById(id);
    if (!major) {
      throw new NotFoundError('Major not found');
    }

    await majorRepo.deleteMajor(id);
  }

  async orderMajors(majorIdsInOrder: string[]): Promise<void> {
    const existingMajors = await majorRepo.getAll();
    const existingMajorIds = new Set(existingMajors.map((major) => major.id));

    const invalidIds = majorIdsInOrder.filter((id) => !existingMajorIds.has(id));
    if (invalidIds.length > 0) {
      throw new BadRequestError(`Major IDs not found : ${invalidIds.join(', ')}`);
    }

    if (new Set(majorIdsInOrder).size !== majorIdsInOrder.length) {
      throw new BadRequestError('Duplicate Major IDs found in the order request');
    }

    await majorRepo.orderMajors(majorIdsInOrder);
  }
}
export const majorService = new MajorService();
