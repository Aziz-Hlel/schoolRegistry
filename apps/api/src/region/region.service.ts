import { prisma } from '@/bootstrap/db.init';
import { BadRequestError, NotFoundError } from '@/err/customErrors';
import { CreateRegionRequest } from '@contracts/schemas/regions/createRegionRequest';
import { RegionRepo } from './region.repo';
import { RegionResponse } from '@contracts/schemas/regions/regionResponse';
import { RegionMapper } from './region.mapper';
import { UpdateRegionRequest } from '@contracts/schemas/regions/updateRegionRequest';
import { OrderRegionRequest } from '@contracts/schemas/regions/orderRegionRequest';

class RegionService {
  async createRegion(schema: CreateRegionRequest): Promise<RegionResponse> {
    const { name } = schema;

    const isRegionNameTaken = await RegionRepo.isRegionNameTaken(name);

    if (isRegionNameTaken) {
      throw new BadRequestError('Region name is already taken');
    }

    const sortOrder = await RegionRepo.getNewRegionSortOrder();
    const region = await RegionRepo.createRegion(schema, sortOrder);

    const regionRepsonse = RegionMapper.toResponse(region);

    return regionRepsonse;
  }

  async updateRegion(regionId: string, data: UpdateRegionRequest): Promise<RegionResponse> {
    const { name } = data;

    const isRegionNameTaken = await RegionRepo.isRegionNameTaken(name);

    if (isRegionNameTaken) {
      throw new BadRequestError('Region name is already taken');
    }

    const region = await RegionRepo.getRegionById(regionId);

    if (!region) {
      throw new BadRequestError('Region id not found');
    }

    const updatedRegion = await RegionRepo.updateRegion(regionId, data);

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
    const regions = await RegionRepo.getAll();

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

  async orderRegions(regionIdsInOrder: OrderRegionRequest): Promise<void> {
    const existingRegions = await RegionRepo.getAll();
    const existingRegionIds = new Set<string>();
    existingRegions.forEach((region) => existingRegionIds.add(region.id));

    const uniqueRegionIds = new Set(regionIdsInOrder.regions);

    // Validate that all provided IDs exist
    for (const regionId of uniqueRegionIds) {
      if (!existingRegionIds.has(regionId)) {
        throw new BadRequestError(`Region ID ${regionId} does not exist`);
      }
    }

    // Validate that no IDs are missing
    if (regionIdsInOrder.regions.length !== existingRegionIds.size) {
      throw new BadRequestError('Some region IDs are missing in the order request');
    }
    await RegionRepo.orderRegions(regionIdsInOrder.regions);
  }
}

export const regionService = new RegionService();
