import { Router, Request, Response } from 'express';
import { majorController } from './major.controller';
import { asyncHandler } from '@/core/async-handler';

const router = Router();

router.post(
  '/',
  asyncHandler((req: Request, res: Response) => majorController.createMajor(req, res)),
);
router.put(
  '/:id',
  asyncHandler((req: Request, res: Response) => majorController.updateMajor(req, res)),
);
router.delete(
  '/:id',
  asyncHandler((req: Request, res: Response) => majorController.deleteMajor(req, res)),
);
router.get(
  '/:id',
  asyncHandler((req: Request, res: Response) => majorController.getMajor(req, res)),
);
router.get(
  '/',
  asyncHandler((req: Request, res: Response) => majorController.getMajors(req, res)),
);

export const majorRouter = router;
