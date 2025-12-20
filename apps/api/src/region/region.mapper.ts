import { Region } from '@/generated/prisma/client';
import { RegionResponse } from '@contracts/schemas/regions/regionResponse';

export class RegionMapper {
  static toRegionResponse(region: Region): RegionResponse {
    return {
      id: region.id,
      name: region.name,
    };
  }

  static toRegionResponses(regions: Region[]): RegionResponse[] {
    return regions.map(this.toRegionResponse);
  }
}
