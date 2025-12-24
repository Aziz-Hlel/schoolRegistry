import { prisma } from '@/bootstrap/db.init';
import { CreateRegionRequest } from '@contracts/schemas/regions/createRegionRequest';
import { UpdateRegionRequest } from '@contracts/schemas/regions/updateRegionRequest';

class RegionRepoClass {
  async isRegionNameTaken(name: string): Promise<boolean> {
    const region = await prisma.region.findUnique({
      where: { name },
    });
    return !!region;
  }

  async getRegionById(regionId: string) {
    const region = await prisma.region.findUnique({
      where: { id: regionId },
    });
    return region;
  }

  async updateRegion(id: string, schema: UpdateRegionRequest) {
    return await prisma.region.update({
      where: { id },
      data: schema,
    });
  }
  async getNewRegionSortOrder() {
    const region = await prisma.region.findFirst({
      orderBy: { sortOrder: 'desc' },
    });
    return region ? region.sortOrder + 1 : 0;
  }

  async createRegion(schema: CreateRegionRequest, sortOrder: number) {
    return await prisma.region.create({
      data: { ...schema, sortOrder },
    });
  }

  async getAll() {
    return await prisma.region.findMany({
      orderBy: {
        sortOrder: 'asc',
      },
    });
  }

  async orderRegions(regionIdsInOrder: string[]) {
    await prisma.$transaction(async (tx) => {
      // Phase 1: move everything out of the way
      await tx.region.updateMany({
        data: {
          sortOrder: { increment: 1000 },
        },
      });

      // Phase 2: apply correct order
      for (let i = 0; i < regionIdsInOrder.length; i++) {
        await tx.region.update({
          where: { id: regionIdsInOrder[i] },
          data: { sortOrder: i },
        });
      }
    });
  }
}

export const RegionRepo = new RegionRepoClass();
