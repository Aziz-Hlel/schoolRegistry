import { asyncHandler } from '@/core/async-handler';
import { Router, Request, Response } from 'express';
import { highSchoolController } from './highSchool.controller';

const router = Router();

router.post(
  '/',
  asyncHandler((req: Request, res: Response) => highSchoolController.create(req, res)),
);
router.put(
  '/:id',
  asyncHandler((req: Request, res: Response) => highSchoolController.updateById(req, res)),
);
router.get(
  '/:id',
  asyncHandler((req: Request, res: Response) => highSchoolController.getById(req, res)),
);
router.get(
  '/',
  asyncHandler((req: Request, res: Response) => highSchoolController.getAll(req, res)),
);
router.delete(
  '/:id',
  asyncHandler((req: Request, res: Response) => highSchoolController.deleteById(req, res)),
);

export const highSchoolRouter = router;
