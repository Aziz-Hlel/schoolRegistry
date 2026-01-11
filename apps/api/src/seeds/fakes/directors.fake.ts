import { DirectorCreateNestedOneWithoutSchoolInput } from '@/generated/prisma/models';
import { faker } from '@faker-js/faker';

export const createFakeDirector: () => DirectorCreateNestedOneWithoutSchoolInput = () => ({
  create: {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
  },
});
