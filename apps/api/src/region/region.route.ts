import { Router, Request, Response, NextFunction } from 'express';
import { regionController } from './region.controller';
import { asyncHandler } from '@/core/async-handler';

const router = Router();

router.post(
  '/',
  asyncHandler((req: Request, res: Response) => regionController.createRegion(req, res)),
);
router.put(
  '/:id',
  asyncHandler((req: Request, res: Response) => regionController.updateRegion(req, res)),
);
router.delete(
  '/:id',
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    await regionController.deleteRegion(req, res, next);
    res.status(204).send();
  }),
);
router.get(
  '/',
  asyncHandler((req: Request, res: Response) => regionController.getRegions(req, res)),
);
router.get(
  '/:id',
  asyncHandler((req: Request, res: Response) => regionController.getRegion(req, res)),
);

export const RegionRouter = router;
