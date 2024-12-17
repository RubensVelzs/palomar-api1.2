import { Router } from 'express';
import { getUsers, login, register, verify } from '../controllers';
import { validateToken } from '../middlewares';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/verify', verify);
router.post('/all', validateToken, getUsers)

export default router;