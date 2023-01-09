import { Router } from 'express';

import * as userComponent from '../components/user/routes';

const router: Router = Router();

router.use(userComponent.meta.baseUrl, userComponent.router)

export default router;