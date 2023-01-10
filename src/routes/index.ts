import { Router } from 'express';

import * as authComponent from '../components/auth/routes';
import * as userComponent from '../components/user/routes';

const router: Router = Router();

router.use(authComponent.meta.baseUrl, authComponent.router);
router.use(userComponent.meta.baseUrl, userComponent.router);

export default router;