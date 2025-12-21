import { prisma } from '@/bootstrap/db.init';
import { HighSchool } from '@/generated/prisma/client';
import { HighSchoolGetPayload, HighSchoolInclude } from '@/generated/prisma/models';
import { CreateHighSchoolRequest } from '@contracts/schemas/highSchool/createHighSchoolRequest';
import { UpdateHighSchoolRequest } from '@contracts/schemas/highSchool/updateHighSchoolRequest';
import { SchoolType } from '@contracts/types/enums/enums';
import { DefaultArgs } from '@prisma/client/runtime/client';

export type HighSchoolWithRelations = HighSchoolGetPayload<{
  include: {
    school: {
      include: {
        region: true;
        director: true;
      };
    };
    classStatistics: true;
  };
}>;

class HighSchoolRepo {
  private includeDirectorRegionAndClassStatistics() {
    return {
      school: {
        include: {
          region: true,
          director: true,
        },
      },
      classStatistics: true,
    } as const satisfies HighSchoolInclude<DefaultArgs>;
  }

  async isHighSchoolNameTaken(name: string): Promise<boolean> {
    const highSchool = await prisma.school.findFirst({
      where: {
        name: name,
        type: SchoolType.HIGH,
      },
    });
    return highSchool !== null;
  }

  async create(schema: CreateHighSchoolRequest): Promise<HighSchoolWithRelations> {
    return await prisma.highSchool.create({
      data: {
        school: {
          create: {
            ...schema,
            type: SchoolType.HIGH,
            regionId: schema.regionId,
            director: {
              create: schema.director,
            },
          },
        },
        classStatistics: {
          createMany: {
            data: schema.classStatistics,
          },
        },
      },
      include: this.includeDirectorRegionAndClassStatistics(),
    });
  }

  async updateById(id: string, schema: UpdateHighSchoolRequest): Promise<HighSchoolWithRelations> {
    const newStats = schema.classStatistics
      .filter((stat) => stat.kind === 'new')
      .map((stat) => ({
        maleStudents: stat.maleStudents,
        femaleStudents: stat.femaleStudents,
        componentId: stat.componentId,
        schoolId: id,
      }));
    const updatedStats = schema.classStatistics
      .filter((stat) => stat.kind === 'existing')
      .map((stat) => ({
        id: stat.id,
        maleStudents: stat.maleStudents,
        femaleStudents: stat.femaleStudents,
      }));

    return await prisma.$transaction(async (tx) => {
      const existingIds = updatedStats.map((stat) => stat.id);
      await tx.classStatistic.deleteMany({
        where: {
          schoolId: id,
          id: {
            notIn: existingIds,
          },
        },
      });

      const createStats = tx.classStatistic.createMany({
        data: newStats,
      });

      const updateStats = updatedStats.map((stat) =>
        tx.classStatistic.update({
          where: {
            id: stat.id,
          },
          data: stat,
        }),
      );
      await Promise.all([createStats, ...updateStats]);

      const updateHighSchool = await tx.highSchool.update({
        where: {
          schoolId: id,
        },
        data: {
          school: {
            update: {
              director: {
                ...(schema.director
                  ? {
                      upsert: {
                        create: schema.director,
                        update: schema.director,
                      },
                    }
                  : { delete: true }),
              },
              regionId: schema.regionId ?? null,
            },
          },
        },
        include: this.includeDirectorRegionAndClassStatistics(),
      });
      return updateHighSchool;
    });
  }

  async getById(id: string): Promise<HighSchoolWithRelations | null> {
    return await prisma.highSchool.findUnique({
      where: {
        schoolId: id,
      },
      include: this.includeDirectorRegionAndClassStatistics(),
    });
  }

  async getAll(): Promise<HighSchoolWithRelations[]> {
    return await prisma.highSchool.findMany({
      include: this.includeDirectorRegionAndClassStatistics(),
    });
  }

  async deleteById(id: string) {
    await prisma.highSchool.delete({
      where: {
        schoolId: id,
      },
    });
  }
}

export const highSchoolRepo = new HighSchoolRepo();
