import { prisma } from '@/bootstrap/db.init';
import { CreateMajorRequest } from '@contracts/schemas/major/createMajorRequest';
import { UpdateMajorRequest } from '@contracts/schemas/major/updateMajorRequest';
import { CurriculumComponentKind } from '@contracts/types/enums/enums';

class MajorRepo {
  async isMajorNameTaken(name: string): Promise<boolean> {
    const major = await prisma.curriculumComponent.findUnique({
      where: {
        name_kind: {
          name: name,
          kind: CurriculumComponentKind.MAJOR,
        },
      },
    });
    return !!major;
  }

  async getNewMajorSortOrder() {
    const major = await prisma.curriculumComponent.findFirst({
      where: {
        kind: CurriculumComponentKind.MAJOR,
      },
      orderBy: { sortOrder: 'desc' },
    });
    return major ? major.sortOrder + 1 : 0;
  }

  async getMajorById(id: string) {
    return await prisma.curriculumComponent.findUnique({
      where: {
        id: id,
        kind: CurriculumComponentKind.MAJOR,
      },
    });
  }

  async createMajor(parsedSchema: CreateMajorRequest, newMajorSortOrder: number) {
    return await prisma.curriculumComponent.create({
      data: {
        ...parsedSchema,
        kind: CurriculumComponentKind.MAJOR,
        sortOrder: newMajorSortOrder,
      },
    });
  }

  async updateMajor(id: string, parsedSchema: UpdateMajorRequest) {
    return await prisma.curriculumComponent.update({
      where: { id },
      data: {
        ...parsedSchema,
        kind: CurriculumComponentKind.MAJOR,
      },
    });
  }

  async getAll() {
    return await prisma.curriculumComponent.findMany({
      where: {
        kind: CurriculumComponentKind.MAJOR,
      },
      orderBy: {
        sortOrder: 'asc',
      },
    });
  }

  async deleteMajor(id: string): Promise<void> {
    await prisma.curriculumComponent.delete({
      where: { id, kind: CurriculumComponentKind.MAJOR },
    });
  }

  async orderMajors(majorIdsInOrder: string[]) {
    await prisma.$transaction(async (tx) => {
      // Phase 1: move everything out of the way
      await tx.curriculumComponent.updateMany({
        where: { kind: CurriculumComponentKind.MAJOR },
        data: {
          sortOrder: { increment: 1000 },
        },
      });

      // Phase 2: apply correct order
      for (let i = 0; i < majorIdsInOrder.length; i++) {
        await tx.curriculumComponent.update({
          where: { id: majorIdsInOrder[i] },
          data: { sortOrder: i },
        });
      }
    });
  }
}

export const majorRepo = new MajorRepo();
