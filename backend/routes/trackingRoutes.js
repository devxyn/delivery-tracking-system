import { Router } from 'express';
import { addTrackingNumber, getTrackingNumbers, refreshTrackingNumber } from '../controllers/trackingController.js';

const router = new Router();

router.post('/add', addTrackingNumber);
router.get('/', getTrackingNumbers);
router.put('/:trackingNumber/refresh', refreshTrackingNumber);

export default router;
