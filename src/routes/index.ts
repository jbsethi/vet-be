import { Router } from 'express';

import * as authComponent from '../components/auth/routes';
import * as userComponent from '../components/user/routes';
import * as roleComponent from '../components/role/routes';
import * as permissionComponent from '../components/permission/routes';

const router: Router = Router();

router.use(authComponent.meta.baseUrl, authComponent.router);
router.use(permissionComponent.meta.baseUrl, permissionComponent.router);
router.use(userComponent.meta.baseUrl, userComponent.router);
router.use(roleComponent.meta.baseUrl, roleComponent.router);

export default router;