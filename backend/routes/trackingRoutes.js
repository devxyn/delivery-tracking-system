import { Router } from 'express';
import { addTrackingNumber, getTrackingNumbers } from '../controllers/trackingController.js';

const router = new Router();

router.post('/add', addTrackingNumber);
router.get('/', getTrackingNumbers);

export default router;
