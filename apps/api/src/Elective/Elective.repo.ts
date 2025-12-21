import { prisma } from '@/bootstrap/db.init';
import { CurriculumComponent } from '@/generated/prisma/client';
import { CreateElectiveRequest } from '@contracts/schemas/elective/createElectiveRequest';
import { CurriculumComponentKind } from '@contracts/types/enums/enums';

class ElectiveRepo {
  async isElectiveNameTaken(name: string): Promise<boolean> {
    const optionalSubject = await prisma.curriculumComponent.count({
      where: {
        name: name,
        kind: CurriculumComponentKind.ELECTIVE,
      },
    });
    return optionalSubject !== null;
  }

  async createOptionalSubject(schema: CreateElectiveRequest): Promise<CurriculumComponent> {
    const newOptionalSubject = await prisma.curriculumComponent.create({
      data: {
        ...schema,
        kind: CurriculumComponentKind.ELECTIVE,
      },
    });
    return newOptionalSubject;
  }

  async updateOptionalSubject(id: string, schema: CreateElectiveRequest): Promise<CurriculumComponent> {
    const updatedOptionalSubject = await prisma.curriculumComponent.update({
      where: {
        id: id,
      },
      data: {
        ...schema,
        kind: CurriculumComponentKind.ELECTIVE,
      },
    });
    return updatedOptionalSubject;
  }
  async getOptionalSubjectById(id: string) {
    const optionalSubject = await prisma.curriculumComponent.findUnique({
      where: {
        id: id,
        kind: CurriculumComponentKind.ELECTIVE,
      },
    });
    return optionalSubject;
  }

  async getAllOptionalSubjects(): Promise<CurriculumComponent[]> {
    const optionalSubjects = await prisma.curriculumComponent.findMany({
      where: {
        kind: CurriculumComponentKind.ELECTIVE,
      },
    });
    return optionalSubjects;
  }

  async deleteOptionalSubject(id: string): Promise<void> {
    await prisma.curriculumComponent.delete({
      where: {
        id: id,
      },
    });
  }
}

export const electiveRepo = new ElectiveRepo();
