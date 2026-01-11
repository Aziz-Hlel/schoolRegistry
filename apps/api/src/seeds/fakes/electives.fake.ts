import { prisma } from '@/bootstrap/db.init';
import { CurriculumComponentKind } from '@/generated/prisma/enums';

const fakeElectivesNames = ['music', 'spanish', 'germany', 'math', 'chinese', 'art'];

const fakeElectives = fakeElectivesNames.map((name, index) => ({
  name: name,
  kind: CurriculumComponentKind.ELECTIVE,
  sortOrder: index,
}));
export const seedElectives = async () => {
  for (const elective of fakeElectives) {
    await prisma.curriculumComponent.upsert({
      where: {
        name_kind: {
          name: elective.name,
          kind: CurriculumComponentKind.ELECTIVE,
        },
      },
      create: elective,
      update: {},
    });
  }
};
