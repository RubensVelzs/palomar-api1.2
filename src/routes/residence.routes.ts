import { Router } from 'express';
import { createResidence, getResidence, getResidences, updateResidence } from '../controllers';
import { validateToken } from '../middlewares';

const router = Router();

router.post('/', validateToken, createResidence);
router.get('/:id', validateToken, getResidence);
router.get('/', validateToken, getResidences);
router.patch('/:id', validateToken, updateResidence);


export default router;