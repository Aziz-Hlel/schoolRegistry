import { prisma } from '@/bootstrap/db.init';
import { CurriculumComponentKind } from '@/generated/prisma/enums';

const majorsName = ['literature', 'economics', 'science', 'technique', 'computer science', 'sport'];

const fakeMajors = majorsName.map((name, index) => ({
  name: name,
  kind: CurriculumComponentKind.MAJOR,
  sortOrder: index,
}));

export const seedMajors = async () => {
  for (const major of fakeMajors) {
    await prisma.curriculumComponent.upsert({
      where: {
        name_kind: {
          name: major.name,
          kind: CurriculumComponentKind.MAJOR,
        },
      },
      create: major,
      update: {},
    });
  }
};
