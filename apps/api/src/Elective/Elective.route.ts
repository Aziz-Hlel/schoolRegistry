import { asyncHandler } from '@/core/async-handler';
import { Router, Request, Response } from 'express';
import { electiveController } from './Elective.controller';

const router = Router();

router.post(
  '/',
  asyncHandler((req: Request, res: Response) => electiveController.createOptionalSubject(req, res)),
);
router.put(
  '/:id',
  asyncHandler((req: Request, res: Response) => electiveController.updateOptionalSubject(req, res)),
);
router.delete(
  '/:id',
  asyncHandler((req: Request, res: Response) => electiveController.deleteOptionalSubject(req, res)),
);
router.get(
  '/:id',
  asyncHandler((req: Request, res: Response) => electiveController.getOptionalSubject(req, res)),
);
router.get(
  '/',
  asyncHandler((req: Request, res: Response) => electiveController.getOptionalSubjects(req, res)),
);

export const electiveRouter = router;
