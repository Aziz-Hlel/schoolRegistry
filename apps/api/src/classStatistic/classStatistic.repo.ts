import { prisma } from '@/bootstrap/db.init';
import { UpdateClassStatisticRequest } from '@contracts/schemas/classStatistic/updateClassStatisticRequest';

class ClassStatisticRepo {
  async updateById(id: string, schema: UpdateClassStatisticRequest) {
    return await prisma.classStatistic.update({
      where: {
        id: id,
      },
      data: {
        maleStudents: schema.maleStudents,
        femaleStudents: schema.femaleStudents,
      },
    });
  }

  async getById(id: string) {
    return await prisma.classStatistic.findUnique({
      where: {
        id: id,
      },
    });
  }

  async deleteById(id: string) {
    await prisma.classStatistic.delete({
      where: {
        id: id,
      },
    });
  }
}

export const classStatisticRepo = new ClassStatisticRepo();
