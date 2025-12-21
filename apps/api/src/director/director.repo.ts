import { prisma } from '@/bootstrap/db.init';
import { UpdateDirectorRequest } from '@contracts/schemas/director/updateDirectorRequest';

class DirectorRepo {
  async getDirectorById(id: string) {
    const director = await prisma.director.findUnique({
      where: {
        id: id,
      },
    });
    return director;
  }
  async updateDirector(id: string, schema: UpdateDirectorRequest) {
    const updatedDirector = await prisma.director.update({
      where: {
        id: id,
      },
      data: schema,
    });
    return updatedDirector;
  }

  async deleteDirector(id: string): Promise<void> {
    await prisma.director.delete({
      where: {
        id: id,
      },
    });
  }
}

export const directorRepo = new DirectorRepo();
