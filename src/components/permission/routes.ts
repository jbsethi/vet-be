import { Router } from 'express';
import passport from 'passport';
import Helper from '../../shared/helper';

import authenticate from '../../shared/passport';
import * as permissionController from './controller';

export const meta = {
  baseUrl: '/permissions',
  routes: {
    getAllPermissions: '/',
  }
};

authenticate(passport);

const helper = new Helper();
const permissionRouter: Router = Router();

permissionRouter.get(
  meta.routes.getAllPermissions,
  passport.authenticate(
    'jwt',
    { session: false },
  ),
  helper.checkPermissionWithCb('permission_get'),
  helper.catchAsync(permissionController.getAllPermissions)
);

export const router: Router = permissionRouter;