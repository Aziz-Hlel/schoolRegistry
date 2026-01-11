import { prisma } from '@/bootstrap/db.init';
import { SchoolType } from '@/generated/prisma/enums';
import { createFakeDirector } from './directors.fake';
import { retreiveFakeRegionName } from './regions.fake';
import { faker } from '@faker-js/faker';

faker.seed(2);

const fakerMiddleSchoolNames = [
  'مدرسة النور الإعدادية',
  'مدرسة الفجر الإعدادية',
  'مدرسة السلام الإعدادية',
  'مدرسة الهدى الإعدادية',
  'مدرسة الزهراء الإعدادية',
  'مدرسة الأمل الإعدادية',
  'مدرسة الربيع الإعدادية',
  'مدرسة البدر الإعدادية',
  'مدرسة الياسمين الإعدادية',
  'مدرسة الكوثر الإعدادية',
  'مدرسة الندى الإعدادية',
  'مدرسة السعادة الإعدادية',
  'مدرسة الطموح الإعدادية',
  'مدرسة الوفاء الإعدادية',
  'مدرسة الرضا الإعدادية',
  'مدرسة الفرح الإعدادية',
  'مدرسة البسمة الإعدادية',
  'مدرسة النجوم الإعدادية',
  'مدرسة السحاب الإعدادية',
  'مدرسة الغدير الإعدادية',
  'مدرسة النسيم الإعدادية',
];

const upsertFakeMiddleSchool = async (fakeMiddleSchoolName: string) => {
  const fakeMiddleSchool = await prisma.school.upsert({
    where: {
      name_type: {
        name: fakeMiddleSchoolName,
        type: SchoolType.MIDDLE,
      },
    },
    create: {
      name: fakeMiddleSchoolName,
      type: SchoolType.MIDDLE,
      isPublic: faker.datatype.boolean(),
      staffCount: faker.number.int({ min: 10, max: 100 }),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      region: {
        connect: {
          name: retreiveFakeRegionName(),
        },
      },
      director: createFakeDirector(),
      secondarySchool: {
        create: {},
      },
    },
    update: {
      name: fakeMiddleSchoolName,
      region: {
        connect: {
          name: retreiveFakeRegionName(),
        },
      },
    },
  });

  return fakeMiddleSchool;
};

export const seedMiddleSchools = async () => {
  const fakeMiddleSchools = [];
  for (const middleSchoolName of fakerMiddleSchoolNames) {
    const fakeMiddleSchool = upsertFakeMiddleSchool(middleSchoolName);
    fakeMiddleSchools.push(fakeMiddleSchool);
  }
  await Promise.all(fakeMiddleSchools);
};
