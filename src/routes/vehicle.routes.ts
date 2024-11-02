import { Router } from 'express';
import { createVehicle, deleteVehicle, getAll, getVehicle, update } from '../controllers';
import { validateToken } from '../middlewares';

const router = Router();

router.post('/', validateToken, createVehicle);
router.get('/', validateToken, getAll);
router.get('/:id', validateToken, getVehicle);
router.put('/:id', validateToken, update);
router.delete('/:id', validateToken, deleteVehicle);
export default router;