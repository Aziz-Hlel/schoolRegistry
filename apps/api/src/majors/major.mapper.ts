import { CurriculumComponent } from '@/generated/prisma/client';
import { MajorResponse } from '@contracts/schemas/major/majorResponse';

export class MajorMapper {
  static toMajorResponse(major: CurriculumComponent): MajorResponse {
    return {
      id: major.id,
      name: major.name,
      kind: major.kind,
    };
  }

  static toMajorResponses(majors: CurriculumComponent[]): MajorResponse[] {
    return majors.map(this.toMajorResponse);
  }
}
