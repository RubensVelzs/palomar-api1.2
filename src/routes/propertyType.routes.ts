import { Router } from 'express';
import { createPropertyType } from '../controllers';
import { validateToken } from '../middlewares';

const router = Router();

router.post('/', validateToken, createPropertyType);

export default router;