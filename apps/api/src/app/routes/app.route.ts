import { Router } from 'express';
import { RootRouter } from '../../root/router/root.router';
import { AuthRouter } from '../../User/router/auth.router';
import { UserPage } from '../../User/router/user.router';
import { RegionRouter } from '@/region/region.route';
import { majorRouter } from '@/majors/major.route';
import { electiveRouter } from '@/Elective/Elective.route';
import { directorRouter } from '@/director/director.route';
import { middleSchoolRouter } from '@/MiddleSchool/middleSchool.route';

const router = Router();

router.use('/', RootRouter);

router.use('/auth', AuthRouter);
router.use('/users', UserPage);
router.use('/regions', RegionRouter);
router.use('/majors', majorRouter);
router.use('/electives', electiveRouter);
router.use('/directors', directorRouter);
router.use('/middle-schools', middleSchoolRouter);

export const AppRouter = router;
