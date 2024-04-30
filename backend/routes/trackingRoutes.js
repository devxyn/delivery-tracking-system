import { Router } from 'express';

const router = new Router();
const list = [];

router.post('/add', (req, res) => {
  const { trackingNumber, courier } = req.body;

  try {
    const tracking = { trackingNumber, courier, status: 'Pending' };
    list.push(tracking);

    res.status(201).json({ message: 'Tracking number added successfully!', data: tracking });
  } catch (error) {
    res.status(500).json({
      message: `Error adding tracking number, ${error}`,
    });
  }
});

router.get('/', (req, res) => {
  try {
    res.status(200).json({ list });
  } catch (error) {
    res.status(500).json({ message: `Error fetching tracking numbers, ${error}` });
  }
});

export default router;
