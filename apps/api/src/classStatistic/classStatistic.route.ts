import { asyncHandler } from '@/core/async-handler';
import { Router, Request, Response } from 'express';
import { classStatisticController } from './classStatistic.controller';

const router = Router();

router.put(
  '/:id',
  asyncHandler((req: Request, res: Response) => classStatisticController.updateById(req, res)),
);
router.get(
  '/:id',
  asyncHandler((req: Request, res: Response) => classStatisticController.getById(req, res)),
);
router.delete(
  '/:id',
  asyncHandler((req: Request, res: Response) => classStatisticController.deleteById(req, res)),
);

export const classStatisticRouter = router;
