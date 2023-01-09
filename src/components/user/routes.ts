import { Router } from "express"

import * as userController from './controller';

export const meta = {
  baseUrl: '/users',
  routes: {
    getAllUsers: '/',
  }
};

const userRouter: Router = Router();

userRouter.get(meta.routes.getAllUsers, userController.getAllUsers);

export const router: Router = userRouter;