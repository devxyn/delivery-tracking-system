import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import trackingRoutes from './routes/trackingRoutes.js';

const app = express();
const port = 3000;

try {
  await mongoose.connect('mongodb://localhost:27017');
  console.log('Connected to MongoDB');
} catch (error) {
  console.error('MongoDB connection error:', error);
}

app.use(bodyParser.json());
app.use(cors());
app.use('/api/tracking', trackingRoutes);

app.listen(port, () => {
  console.log(`Server is running in port ${port}`);
});
