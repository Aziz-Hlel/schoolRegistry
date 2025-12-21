import { CurriculumComponent } from '@/generated/prisma/client';
import { ElectiveResponse } from '@contracts/schemas/elective/ElectiveResponse';

export class ElectiveMapper {
  static toResponse(optionalSubject: CurriculumComponent): ElectiveResponse {
    return {
      id: optionalSubject.id,
      name: optionalSubject.name,
      kind: optionalSubject.kind,
    };
  }

  static toResponses(optionalSubjects: CurriculumComponent[]): ElectiveResponse[] {
    return optionalSubjects.map(this.toResponse);
  }
}
