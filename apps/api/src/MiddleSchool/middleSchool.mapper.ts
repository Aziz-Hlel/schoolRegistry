import { DirectorMapper } from '@/director/director.mapper';
import { Prisma } from '@/generated/prisma/client';
import { RegionMapper } from '@/region/region.mapper';
import { MiddleSchoolResponse } from '@contracts/schemas/middleSchool/middleSchoolResponse';

type MiddleSchoolWithSchool = Prisma.MiddleSchoolGetPayload<{
  include: {
    school: {
      include: { region: true; director: true };
    };
  };
}>;

class MiddleSchoolMapper {
  static toResponse(middleSchool: MiddleSchoolWithSchool): MiddleSchoolResponse {
    return {
      id: middleSchool.schoolId,
      name: middleSchool.school.name,
      type: middleSchool.school.type,
      region: middleSchool.school.region ? RegionMapper.toResponse(middleSchool.school.region) : null,
      director: middleSchool.school.director ? DirectorMapper.toResponse(middleSchool.school.director) : null,
      staffCount: middleSchool.school.staffCount,
      isPublic: middleSchool.school.isPublic,
      createdAt: middleSchool.school.createdAt.toISOString(),
      updatedAt: middleSchool.school.updatedAt.toISOString(),
    };
  }

  static toResponses(middleSchools: MiddleSchoolWithSchool[]): MiddleSchoolResponse[] {
    return middleSchools.map(this.toResponse);
  }
}

export { MiddleSchoolMapper };
