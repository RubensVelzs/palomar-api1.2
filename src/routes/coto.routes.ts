import { Router } from 'express';
import { create } from '../controllers';
import { validateToken } from '../middlewares';

const router = Router();

router.post('/', validateToken, create);

export default router;