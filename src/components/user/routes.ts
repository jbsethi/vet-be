/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import passport from 'passport';
import Helper from '../../shared/helper';

import authenticate from '../../shared/passport';
import * as userController from './controller';

export const meta = {
  baseUrl: '/users',
  routes: {
    getAllUsers: '/',
    createUser: '/',
  }
};

authenticate(passport);

const helper = new Helper();
const userRouter: Router = Router();

userRouter.get(
  meta.routes.getAllUsers,
  passport.authenticate(
    'jwt',
    { session: false },
  ),
  helper.checkPermissionWithCb('user_get_all', userController.getAllUsers)
);


userRouter.post(
  meta.routes.createUser,
  passport.authenticate(
    'jwt',
    { session: false },
  ),
  helper.checkPermissionWithCb('user_add', userController.registerNewUser)
);

export const router: Router = userRouter;