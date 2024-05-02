import Tracking from '../models/trackingModel.js';

export const addTrackingNumber = async (req, res) => {
  const { trackingNumber, courier } = req.body;

  try {
    const existingTracking = await Tracking.findOne({ trackingNumber });
    if (existingTracking) {
      return res.status(409).json({ message: 'Tracking number already exists' });
    }

    const tracking = await Tracking.create({ trackingNumber, courier, status: 'Pending' });

    res.status(201).json({ message: 'Tracking number added successfully!', data: tracking });
  } catch (error) {
    res.status(500).json({
      message: `Error adding tracking number, ${error}`,
    });
  }
};

export const getTrackingNumbers = async (req, res) => {
  try {
    const trackingNumbers = await Tracking.find({});
    res.status(200).json(trackingNumbers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Error fetching tracking numbers,` });
  }
};

export const refreshTrackingNumber = async (req, res) => {
  const { trackingNumber } = req.params;

  try {
    const latestStatus = await fetchLatestStatus(trackingNumber);
    await Tracking.findOneAndUpdate({ trackingNumber }, { status: latestStatus });

    res.status(200).json({ message: 'Tracking status refreshed successfully' });
  } catch (error) {
    console.error('Error refreshing tracking status:', error);
    res.status(500).send('Internal server error');
  }
};

const fetchLatestStatus = async (trackingNumber) => {
  const currentStatus = await Tracking.findOne({ trackingNumber });
  return currentStatus.status;
};
