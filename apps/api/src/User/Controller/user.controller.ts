import { Response } from 'express';
import { AuthenticatedRequest } from '../../types/auth/AuthenticatedRequest';
import { userService } from '../Service/user.service';
import { UserRowResponse } from '@contracts/types/user/UserRowResponse';
import { queryParamsSchema } from '@contracts/types/user/UserPageQuery';
import { Page } from '@contracts/types/page/Page';

class UserController {
  async getUserPage(req: AuthenticatedRequest, res: Response<Page<UserRowResponse>>) {
    const parsedQuery = queryParamsSchema.parse(req.query);

    const response = await userService.getUserPage(parsedQuery);
    res.json(response);
  }
}

export const userController = new UserController();
