import { Schema, model } from 'mongoose';

const trackingSchema = new Schema({
  trackingNumber: String,
  courier: String,
  status: String,
});

const Tracking = model('Tracking', trackingSchema);

export default Tracking;
