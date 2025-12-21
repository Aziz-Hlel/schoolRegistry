import { asyncHandler } from '@/core/async-handler';
import { Router, Request, Response } from 'express';
import { directorController } from './director.controller';

const router = Router();

router.put(
  '/:id',
  asyncHandler((req: Request, res: Response) => directorController.updateDirector(req, res)),
);
router.delete(
  '/:id',
  asyncHandler((req: Request, res: Response) => directorController.deleteDirector(req, res)),
);

export const directorRouter = router;
