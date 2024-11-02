import { Router } from 'express';
import { login, register, verify } from '../controllers';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/verify', verify);

export default router;