import { CurriculumComponent } from '@/generated/prisma/client';
import { OptionalSubjectResponse } from '@contracts/schemas/optionalSubject/OptionalSubjectResponse';

export class ElectiveMapper {
  static toResponse(optionalSubject: CurriculumComponent): OptionalSubjectResponse {
    return {
      id: optionalSubject.id,
      name: optionalSubject.name,
      kind: optionalSubject.kind,
    };
  }

  static toResponses(optionalSubjects: CurriculumComponent[]): OptionalSubjectResponse[] {
    return optionalSubjects.map(this.toResponse);
  }
}
