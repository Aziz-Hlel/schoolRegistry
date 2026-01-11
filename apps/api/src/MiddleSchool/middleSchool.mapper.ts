import { DirectorMapper } from '@/director/director.mapper';
import { Prisma } from '@/generated/prisma/client';
import { RegionMapper } from '@/region/region.mapper';
import { MiddleSchoolPageQuery } from '@contracts/schemas/middleSchool/MiddleSchoolPageQuery';
import { MiddleSchoolResponse } from '@contracts/schemas/middleSchool/middleSchoolResponse';
import { MiddleSchoolRowResponse } from '@contracts/schemas/middleSchool/middleSchoolRowResponse';
import { Page } from '@contracts/types/page/Page';

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

  static toRowResponse(middleSchool: MiddleSchoolWithSchool): MiddleSchoolRowResponse {
    return {
      id: middleSchool.schoolId,
      name: middleSchool.school.name,
      staffCount: middleSchool.school.staffCount,
      isPublic: middleSchool.school.isPublic,
      type: middleSchool.school.type,
      region: middleSchool.school.region,
      director: middleSchool.school.director,
      createdAt: middleSchool.school.createdAt.toISOString(),
      updatedAt: middleSchool.school.updatedAt.toISOString(),
    };
  }

  static toPageResponse({
    middleSchools,
    queryParams,
    totalElements,
  }: {
    middleSchools: MiddleSchoolWithSchool[];
    queryParams: MiddleSchoolPageQuery;
    totalElements: number;
  }): Page<MiddleSchoolRowResponse> {
    const middleSchoolsDto = middleSchools.map(this.toRowResponse);
    return {
      content: middleSchoolsDto,
      pagination: {
        number: queryParams.page,
        size: queryParams.size,
        totalElements: totalElements,
        totalPages: Math.ceil(totalElements / queryParams.size),
        offset: (queryParams.page - 1) * queryParams.size,
        pageSize: queryParams.size,
      },
    };
  }
}

export { MiddleSchoolMapper };
