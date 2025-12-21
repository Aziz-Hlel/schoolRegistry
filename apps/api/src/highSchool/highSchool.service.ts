import { CreateHighSchoolRequest } from '@contracts/schemas/highSchool/createHighSchoolRequest';
import { HighSchoolResponse } from '@contracts/schemas/highSchool/highSchoolResponse';
import { highSchoolRepo } from './highSchool.repo';
import { BadRequestError, NotFoundError } from '@/err/customErrors';
import { HighSchoolMapper } from './highSchool.mapper';
import { UpdateHighSchoolRequest } from '@contracts/schemas/highSchool/updateHighSchoolRequest';

class HighSchoolService {
  async createHighSchool(schema: CreateHighSchoolRequest): Promise<HighSchoolResponse> {
    const highSchoolName = schema.name;

    const isNameTaken = await highSchoolRepo.isHighSchoolNameTaken(highSchoolName);
    if (isNameTaken) {
      throw new BadRequestError('High school name is already taken');
    }

    const highSchool = await highSchoolRepo.create(schema);

    const highSchoolResponse = HighSchoolMapper.toResponse(highSchool);

    return highSchoolResponse;
  }
  async updateById(id: string, schema: UpdateHighSchoolRequest): Promise<HighSchoolResponse> {
    const highSchool = await highSchoolRepo.getById(id);
    if (!highSchool) {
      throw new NotFoundError('High school not found');
    }

    if (schema.name !== highSchool.school.name) {
      const isNameTaken = await highSchoolRepo.isHighSchoolNameTaken(schema.name);
      if (isNameTaken) {
        throw new BadRequestError('High school name is already taken');
      }
    }

    const updatedHighSchool = await highSchoolRepo.updateById(id, schema);

    const highSchoolResponse = HighSchoolMapper.toResponse(updatedHighSchool);

    return highSchoolResponse;
  }

  async getById(id: string): Promise<HighSchoolResponse> {
    const highSchool = await highSchoolRepo.getById(id);
    if (!highSchool) {
      throw new NotFoundError('High school not found');
    }

    const highSchoolResponse = HighSchoolMapper.toResponse(highSchool);

    return highSchoolResponse;
  }

  async getAll(): Promise<HighSchoolResponse[]> {
    const highSchools = await highSchoolRepo.getAll();

    return highSchools.map(HighSchoolMapper.toResponse);
  }

  async deleteById(id: string): Promise<void> {
    const highSchool = await highSchoolRepo.getById(id);
    if (!highSchool) {
      throw new NotFoundError('High school not found');
    }

    await highSchoolRepo.deleteById(id);
  }
}

export const highSchoolService = new HighSchoolService();
