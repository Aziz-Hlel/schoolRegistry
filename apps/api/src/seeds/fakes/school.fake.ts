import { prisma } from '@/bootstrap/db.init';
import { Region } from '@/generated/prisma/client';
import { DirectorCreateInput, HighSchoolCreateInput } from '@/generated/prisma/models';
import { SchoolType } from '@contracts/types/enums/enums';
import { faker } from '@faker-js/faker';

faker.seed(1); // Ensure consistent fake data across runs

const fakeRegionsNames: readonly string[] = [
  'Sousse Ville',
  'Hammam Sousse',
  'Akouda',
  'Kondar',
  'Sidi Bou Ali',
  'Msaken',
  'Enfidha',
  'Kalaa Kebira',
  'Kalaa Sghira',
  'Sidi El Heni',
  'Bouficha',
] as const;

const fakeRegions = fakeRegionsNames.map((regionName, index) => ({
  id: faker.string.uuid(),
  name: regionName,
  sortOrder: index,
}));

const fakeDirector = () => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
});

const fakeSchool = ({
  id,
  type,
  director,
  region,
}: {
  id: string;
  type: string;
  director: ReturnType<typeof fakeDirector>;
  region: Region;
}) => ({
  id: id,
  name: faker.company.name(),
  type: type,
  regionId: region.id,
  staffCount: faker.number.int({ min: 10, max: 200 }),

  director: director,
});

const fakeHighSchool = ({ region }: { region: Region }) => {
  const schoolId = faker.string.uuid();
  return {
    schoolId: schoolId,
    school: fakeSchool({
      id: schoolId,
      type: SchoolType.HIGH,
      director: fakeDirector(),
      region: region,
    }),
  };
};

const createFakeHighSchools: () => HighSchoolCreateInput = () => {
  return {
    school: {
      create: {
        id: faker.string.uuid(),
        name: faker.company.name(),
        type: SchoolType.HIGH,
        staffCount: faker.number.int({ min: 10, max: 200 }),
        region: {
          connect: {
            name: faker.helpers.arrayElement(fakeRegionsNames),
          },
        },
        director: {
          create: {
            id: faker.string.uuid(),
            name: faker.person.fullName(),
            email: faker.internet.email(),
            phone: faker.phone.number(),
          },
        },
      },
    },
  };
};

export const seedRegions = async () => {
  fakeRegions.forEach(async (region) => {
    await prisma.region.upsert({
      where: { name: region.name },
      create: region,
      update: {},
    });
  });
};

export const seedHighSchools = async () => {
  const regions = await prisma.region.createManyAndReturn({
    data: fakeRegions,
    skipDuplicates: true,
  });

  const fakeHighSchools = faker.helpers.multiple(createFakeHighSchools, {
    count: 10,
  });
  for (const highSchool of fakeHighSchools) {
    await prisma.highSchool.upsert({
      where: { schoolId: highSchool.school.create!.id },
      create: highSchool,
      update: highSchool,
    });
  }
};
