import { prisma } from '@/bootstrap/db.init';

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
}

export const RegionRepo = new RegionRepoClass();
