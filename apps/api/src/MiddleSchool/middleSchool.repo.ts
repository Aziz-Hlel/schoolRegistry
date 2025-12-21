import { prisma } from '@/bootstrap/db.init';
import { SchoolType } from '@/generated/prisma/enums';
import { MiddleSchoolInclude } from '@/generated/prisma/models';
import { CreateMiddleSchoolRequest } from '@contracts/schemas/middleSchool/createMiddleSchoolRequest';
import { UpdateMiddleSchoolRequest } from '@contracts/schemas/middleSchool/updateMiddleSchoolRequest';
import { DefaultArgs } from '@prisma/client/runtime/client';

class MiddleSchoolRepo {
  includeDirectorRegion() {
    const include = {
      school: {
        include: {
          region: true,
          director: true,
        },
      },
    } as const satisfies MiddleSchoolInclude<DefaultArgs>;

    return include;
  }
  async isMiddleSchoolNameTaken(name: string): Promise<boolean> {
    const middleSchool = await prisma.school.findFirst({
      where: {
        name: name,
        type: SchoolType.MIDDLE,
      },
    });
    return middleSchool !== null;
  }

  async getMiddleSchoolById(id: string) {
    return await prisma.middleSchool.findUnique({
      where: {
        schoolId: id,
      },
      include: {
        school: {
          include: {
            region: true,
            director: true,
          },
        },
      },
    });
  }
  async createMiddleSchool(schema: CreateMiddleSchoolRequest) {
    return await prisma.middleSchool.create({
      data: {
        school: {
          create: {
            ...schema,
            type: SchoolType.MIDDLE,
            regionId: schema.regionId,
            director: {
              create: schema.director,
            },
          },
        },
      },
      include: this.includeDirectorRegion(),
    });
  }

  async updateMiddleSchool(id: string, schema: UpdateMiddleSchoolRequest) {
    return await prisma.middleSchool.update({
      where: {
        schoolId: id,
      },
      data: {
        school: {
          update: {
            ...schema,
            type: SchoolType.MIDDLE,
            director: schema.director
              ? {
                  upsert: {
                    create: schema.director,
                    update: schema.director,
                  },
                }
              : {
                  delete: true,
                },
            regionId: schema.regionId,
          },
        },
      },
      include: this.includeDirectorRegion(),
    });
  }

  async getMiddleSchools() {
    return await prisma.middleSchool.findMany({
      include: this.includeDirectorRegion(),
    });
  }

  async deleteMiddleSchool(id: string) {
    return await prisma.middleSchool.delete({
      where: {
        schoolId: id,
      },
      include: this.includeDirectorRegion(),
    });
  }
}

export const middleSchoolRepo = new MiddleSchoolRepo();
