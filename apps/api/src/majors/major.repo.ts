import { prisma } from '@/bootstrap/db.init';
import { CreateMajorRequest } from '@contracts/schemas/major/createMajorRequest';
import { UpdateMajorRequest } from '@contracts/schemas/major/updateMajorRequest';
import { CurriculumComponentKind } from '@contracts/types/enums/enums';

class MajorRepo {
  async isMajorNameTaken(name: string): Promise<boolean> {
    const major = await prisma.curriculumComponent.findUnique({
      where: {
        name: name,
        kind: CurriculumComponentKind.MAJOR,
      },
    });
    return major !== null;
  }

  async getMajorById(id: string) {
    return await prisma.curriculumComponent.findUnique({
      where: {
        id: id,
        kind: CurriculumComponentKind.MAJOR,
      },
    });
  }

  async createMajor(parsedSchema: CreateMajorRequest) {
    return await prisma.curriculumComponent.create({
      data: {
        ...parsedSchema,
        kind: CurriculumComponentKind.MAJOR,
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

  async deleteMajor(id: string): Promise<void> {
    await prisma.curriculumComponent.delete({
      where: { id, kind: CurriculumComponentKind.MAJOR },
    });
  }
}

export const majorRepo = new MajorRepo();
