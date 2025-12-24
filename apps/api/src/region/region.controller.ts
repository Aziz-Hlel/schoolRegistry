import { createRegionRequestSchema } from '@contracts/schemas/regions/createRegionRequest';
import { NextFunction, Request, Response } from 'express';
import { regionService } from './region.service';
import { SimpleApiResponse } from '@contracts/types/api/SimpleApiResponse.dto';
import { updateRegionRequestSchema } from '@contracts/schemas/regions/updateRegionRequest';
import { RegionResponse } from '@contracts/schemas/regions/regionResponse';
import { OrderRegionRequestSchema } from '@contracts/schemas/regions/orderRegionRequest';

class RegionController {
  async createRegion(req: Request, res: Response<RegionResponse>) {
    const parsedBody = createRegionRequestSchema.parse(req.body);

    const region = await regionService.createRegion(parsedBody);

    res.status(201).json(region);
  }

  async updateRegion(req: Request, res: Response<RegionResponse>) {
    const parsedBody = updateRegionRequestSchema.parse(req.body);
    const regionId = req.params.id;
    const updatedRegion = await regionService.updateRegion(regionId, parsedBody);
    res.status(200).json(updatedRegion);
  }

  async deleteRegion(req: Request, res: Response<SimpleApiResponse>, next: NextFunction) {
    const regionId = req.params.id;

    await regionService.deleteRegion(regionId);

    res.status(200).json({ message: 'Region deleted successfully' });
  }

  async getRegion(req: Request, res: Response<RegionResponse>) {
    const regionId = req.params.id;

    const region = await regionService.getRegionById(regionId);

    res.status(200).json(region);
  }

  async getRegions(req: Request, res: Response<RegionResponse[]>) {
    const regions = await regionService.getRegions();

    res.status(200).json(regions);
  }

  async orderRegions(req: Request, res: Response<SimpleApiResponse>) {
    const parsedBody = OrderRegionRequestSchema.parse(req.body);

    await regionService.orderRegions(parsedBody);

    res.status(200).json({ message: 'Regions sorted successfully' });
  }
}

export const regionController = new RegionController();
