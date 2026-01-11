import { prisma } from '@/bootstrap/db.init';
import { CurriculumComponent } from '@/generated/prisma/client';
import { CreateElectiveRequest } from '@contracts/schemas/elective/createElectiveRequest';
import { CurriculumComponentKind } from '@contracts/types/enums/enums';

class ElectiveRepo {
  async isElectiveNameTaken(name: string): Promise<boolean> {
    const optionalSubject = await prisma.curriculumComponent.findUnique({
      where: {
        name_kind: {
          name: name,
          kind: CurriculumComponentKind.ELECTIVE,
        },
      },
    });
    return !!optionalSubject;
  }

  async getNewElectiveSortOrder() {
    const optionalSubject = await prisma.curriculumComponent.findFirst({
      where: {
        kind: CurriculumComponentKind.ELECTIVE,
      },
      orderBy: { sortOrder: 'desc' },
    });
    return optionalSubject ? optionalSubject.sortOrder + 1 : 0;
  }

  async create(schema: CreateElectiveRequest, newElectiveSortOrder: number): Promise<CurriculumComponent> {
    const newOptionalSubject = await prisma.curriculumComponent.create({
      data: {
        ...schema,
        kind: CurriculumComponentKind.ELECTIVE,
        sortOrder: newElectiveSortOrder,
      },
    });
    return newOptionalSubject;
  }

  async update(id: string, schema: CreateElectiveRequest): Promise<CurriculumComponent> {
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
  async getById(id: string) {
    const optionalSubject = await prisma.curriculumComponent.findUnique({
      where: {
        id: id,
        kind: CurriculumComponentKind.ELECTIVE,
      },
    });
    return optionalSubject;
  }

  async getAll(): Promise<CurriculumComponent[]> {
    const optionalSubjects = await prisma.curriculumComponent.findMany({
      where: {
        kind: CurriculumComponentKind.ELECTIVE,
      },
      orderBy: {
        sortOrder: 'asc',
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

  async orderElectives(electivesInOrder: string[]) {
    await prisma.$transaction(async (tx) => {
      // Phase 1: move everything out of the way
      await tx.curriculumComponent.updateMany({
        where: { kind: CurriculumComponentKind.ELECTIVE },
        data: {
          sortOrder: { increment: 1000 },
        },
      });

      // Phase 2: apply correct order
      for (let i = 0; i < electivesInOrder.length; i++) {
        await tx.curriculumComponent.update({
          where: { id: electivesInOrder[i] },
          data: { sortOrder: i },
        });
      }
    });
  }
}

export const electiveRepo = new ElectiveRepo();
