import { Region } from '@/generated/prisma/client';
import { RegionResponse } from '@contracts/schemas/regions/regionResponse';

export class RegionMapper {
  static toResponse(region: Region): RegionResponse {
    return {
      id: region.id,
      name: region.name,
    };
  }

  static toResponses(regions: Region[]): RegionResponse[] {
    return regions.map(this.toResponse);
  }
}
