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

    const createdMajor = await majorRepo.createMajor(major);

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

  async getAllMajors(): Promise<MajorResponse[]> {
    const majors = await prisma.curriculumComponent.findMany({
      where: {
        kind: CurriculumComponentKind.MAJOR,
      },
    });
    return MajorMapper.toMajorResponses(majors);
  }

  async deleteMajor(id: string): Promise<void> {
    const major = await majorRepo.getMajorById(id);
    if (!major) {
      throw new NotFoundError('Major not found');
    }

    await majorRepo.deleteMajor(id);
  }
}
export const majorService = new MajorService();
