import { Router } from 'express';
import { createControllAccess, getAllControllAccess } from '../controllers';
import { validateToken } from '../middlewares';

const router = Router();

router.post('/', createControllAccess);
router.get('/', getAllControllAccess);

export default router;