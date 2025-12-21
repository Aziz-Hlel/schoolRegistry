import { prisma } from '@/bootstrap/db.init';
import { BadRequestError, NotFoundError } from '@/err/customErrors';
import { CreateRegionRequest } from '@contracts/schemas/regions/createRegionRequest';
import { RegionRepo } from './region.repo';
import { RegionResponse } from '@contracts/schemas/regions/regionResponse';
import { RegionMapper } from './region.mapper';

class RegionService {
  async createRegion(data: CreateRegionRequest): Promise<RegionResponse> {
    const { name } = data;

    const isRegionNameTaken = await RegionRepo.isRegionNameTaken(name);

    if (isRegionNameTaken) {
      throw new BadRequestError('Region name is already taken');
    }

    const region = await prisma.region.create({
      data: {
        name,
      },
    });

    const regionRepsonse = RegionMapper.toResponse(region);

    return regionRepsonse;
  }

  async updateRegion(regionId: string, data: CreateRegionRequest): Promise<RegionResponse> {
    const { name } = data;

    const isRegionNameTaken = await RegionRepo.isRegionNameTaken(name);

    if (isRegionNameTaken) {
      throw new BadRequestError('Region name is already taken');
    }

    const region = await RegionRepo.getRegionById(regionId);

    if (!region) {
      throw new BadRequestError('Region id not found');
    }

    const updatedRegion = await prisma.region.update({
      where: { id: regionId },
      data: {
        name,
      },
    });

    const regionResponse = RegionMapper.toResponse(updatedRegion);

    return regionResponse;
  }

  async getRegionById(regionId: string): Promise<RegionResponse> {
    const region = await RegionRepo.getRegionById(regionId);

    if (!region) {
      throw new NotFoundError('Region id not found');
    }

    const regionResponse = RegionMapper.toResponse(region);

    return regionResponse;
  }

  async getRegions(): Promise<RegionResponse[]> {
    const regions = await prisma.region.findMany();

    const regionResponses = RegionMapper.toResponses(regions);

    return regionResponses;
  }

  async deleteRegion(regionId: string): Promise<void> {
    const schoolCountAssociatedWithRegion = await prisma.school.count({
      where: { regionId: regionId },
    });

    if (schoolCountAssociatedWithRegion > 0) {
      throw new BadRequestError('Cannot delete region with associated schools');
    }

    await prisma.region.delete({
      where: { id: regionId },
    });
  }
}

export const regionService = new RegionService();
