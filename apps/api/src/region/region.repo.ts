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

  async updateRegionsortOrder(id: string, sortOrder: number) {
    return await prisma.region.update({
      where: { id },
      data: { sortOrder },
    });
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
}

export const RegionRepo = new RegionRepoClass();
