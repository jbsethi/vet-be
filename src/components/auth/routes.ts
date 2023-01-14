/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import passport from 'passport';

import authenticate from '../../shared/passport';
import * as authController from './controller';

export const meta = {
  baseUrl: '/auth',
  routes: {
    login: '/login',
    me: '/me',
  }
};

authenticate(passport);

const authRouter: Router = Router();

authRouter.post(
    meta.routes.login,
    authController.login
);

authRouter.get(
    meta.routes.me,
    passport.authenticate(
      'jwt',
      { session: false },
    ),
    authController.me
)

export const router: Router = authRouter;