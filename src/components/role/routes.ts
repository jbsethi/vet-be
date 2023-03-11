import { Router } from 'express';
import passport from 'passport';
import Helper from '../../shared/helper';

import authenticate from '../../shared/passport';
import * as userController from './controller';

export const meta = {
  baseUrl: '/roles',
  routes: {
    getAllRoles: '/',
    createRole: '/',
  }
};

authenticate(passport);

const helper = new Helper();
const roleRouter: Router = Router();

roleRouter.get(
  meta.routes.getAllRoles,
  passport.authenticate(
    'jwt',
    { session: false },
  ),
  helper.checkPermissionWithCb('role_get'),
  helper.catchAsync(userController.getAllRoles),
);

export const router: Router = roleRouter;