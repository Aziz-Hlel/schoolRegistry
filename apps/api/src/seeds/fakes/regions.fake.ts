import { prisma } from '@/bootstrap/db.init';
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

export const seedRegions = async () => {
  fakeRegions.forEach(async (region) => {
    await prisma.region.upsert({
      where: { name: region.name },
      create: region,
      update: {},
    });
  });
};
