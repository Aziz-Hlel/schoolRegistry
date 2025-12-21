import { HighSchoolResponse } from '@contracts/schemas/highSchool/highSchoolResponse';
import { HighSchoolWithRelations } from './highSchool.repo';
import { RegionMapper } from '@/region/region.mapper';
import { DirectorMapper } from '@/director/director.mapper';
import { ClassStatisticMapper } from '@/classStatistic/classStatistic.mapper';

export class HighSchoolMapper {
  static toResponse(entity: HighSchoolWithRelations): HighSchoolResponse {
    return {
      id: entity.schoolId,
      name: entity.school.name,
      type: entity.school.type,
      region: entity.school.region ? RegionMapper.toResponse(entity.school.region) : null,
      director: entity.school.director ? DirectorMapper.toResponse(entity.school.director) : null,
      staffCount: entity.school.staffCount,
      createdAt: entity.school.createdAt.toISOString(),
      updatedAt: entity.school.updatedAt.toISOString(),
      classStatistics: ClassStatisticMapper.toResponses(entity.classStatistics),
    };
  }
}
