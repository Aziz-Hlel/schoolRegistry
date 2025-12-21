import { CreateMiddleSchoolRequest } from '@contracts/schemas/middleSchool/createMiddleSchoolRequest';
import { middleSchoolRepo } from './middleSchool.repo';
import { BadRequestError, NotFoundError } from '@/err/customErrors';
import { MiddleSchoolMapper } from './middleSchool.mapper';
import { MiddleSchoolResponse } from '@contracts/schemas/middleSchool/middleSchoolResponse';
import { RegionRepo } from '@/region/region.repo';
import { UpdateMiddleSchoolRequest } from '@contracts/schemas/middleSchool/updateMiddleSchoolRequest';

class MiddleSchoolService {
  async createMiddleSchool(schema: CreateMiddleSchoolRequest): Promise<MiddleSchoolResponse> {
    const { name } = schema;
    const isNameTaken = await middleSchoolRepo.isMiddleSchoolNameTaken(name);

    if (isNameTaken) {
      throw new BadRequestError('Middle school name is already taken');
    }

    const regionId = schema.regionId;

    const region = await RegionRepo.getRegionById(regionId);

    if (!region) {
      throw new NotFoundError('Region id not found');
    }

    const middleSchool = await middleSchoolRepo.createMiddleSchool(schema);

    const middleSchoolResponse = MiddleSchoolMapper.toResponse(middleSchool);

    return middleSchoolResponse;
  }

  async updateMiddleSchool(id: string, schema: UpdateMiddleSchoolRequest): Promise<MiddleSchoolResponse> {
    const middleSchool = await middleSchoolRepo.getMiddleSchoolById(id);
    if (!middleSchool) {
      throw new NotFoundError('Middle school not found');
    }

    if (schema.name !== middleSchool.school.name) {
      const isNameTaken = await middleSchoolRepo.isMiddleSchoolNameTaken(schema.name);
      if (isNameTaken) {
        throw new BadRequestError('Middle school name is already taken');
      }
    }

    if (schema.regionId && schema.regionId !== middleSchool.school.regionId) {
      const region = await RegionRepo.getRegionById(schema.regionId);
      if (!region) {
        throw new NotFoundError('Region id not found');
      }
    }

    const updatedMiddleSchool = await middleSchoolRepo.updateMiddleSchool(id, schema);
    const middleSchoolResponse = MiddleSchoolMapper.toResponse(updatedMiddleSchool);
    return middleSchoolResponse;
  }

  async getMiddleSchoolById(id: string): Promise<MiddleSchoolResponse> {
    const middleSchool = await middleSchoolRepo.getMiddleSchoolById(id);
    if (!middleSchool) {
      throw new NotFoundError('Middle school not found');
    }
    const middleSchoolResponse = MiddleSchoolMapper.toResponse(middleSchool);
    return middleSchoolResponse;
  }

  async getMiddleSchools() {
    const middleSchools = await middleSchoolRepo.getMiddleSchools();
    const middleSchoolResponses = MiddleSchoolMapper.toResponses(middleSchools);
    return middleSchoolResponses;
  }

  async deleteMiddleSchool(id: string): Promise<void> {
    const middleSchool = await middleSchoolRepo.getMiddleSchoolById(id);
    if (!middleSchool) {
      throw new NotFoundError('Middle school not found');
    }
    await middleSchoolRepo.deleteMiddleSchool(id);
  }
}

export const middleSchoolService = new MiddleSchoolService();
