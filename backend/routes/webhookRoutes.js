import { Router } from 'express';
import Tracking from '../models/trackingModel.js';

const router = new Router();

router.post('/', async (req, res) => {
  // Extract data from webhook payload
  const { trackingNumber, status } = req.body;

  // Process webhook payload (e.g., update tracking status in database)
  // Example: Update status of trackingNumber in MongoDB
  try {
    await Tracking.findOneAndUpdate({ trackingNumber }, { status });
    console.log('Tracking status updated successfully');
    res.status(200).json({ message: 'Webhook received successfully' });
  } catch (error) {
    console.error('Error updating tracking status:', error);
    res.status(500).send('Internal server error');
  }
});

export default router;
