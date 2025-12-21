import { asyncHandler } from '@/core/async-handler';
import { Router, Request, Response } from 'express';
import { middleSchoolController } from './middleSchool.controller';

const router = Router();

router.post(
  '/',
  asyncHandler((req: Request, res: Response) => middleSchoolController.createMiddleSchool(req, res)),
);
router.put(
  '/:id',
  asyncHandler((req: Request, res: Response) => middleSchoolController.updateMiddleSchool(req, res)),
);
router.get(
  '/:id',
  asyncHandler((req: Request, res: Response) => middleSchoolController.getMiddleSchoolById(req, res)),
);
router.get(
  '/',
  asyncHandler((req: Request, res: Response) => middleSchoolController.getMiddleSchools(req, res)),
);
router.delete(
  '/:id',
  asyncHandler((req: Request, res: Response) => middleSchoolController.deleteMiddleSchool(req, res)),
);

export const middleSchoolRouter = router;
