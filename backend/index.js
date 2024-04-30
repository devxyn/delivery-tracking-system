import express from 'express';
import bodyParser from 'body-parser';
import trackingRoutes from './routes/trackingRoutes.js';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/api/tracking', trackingRoutes);

app.listen(port, () => {
  console.log(`Server is running in port ${port}`);
});
