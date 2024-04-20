import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

import cors from 'cors';
import statusMonitor from 'express-status-monitor';

const app = express();
// Use express-status-monitor middleware
app.use(statusMonitor());
app.use(express.urlencoded({ extended: false }));

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to mongodb');
  })
  .catch((err) => {
    console.log(err);
  });

// Enable CORS for all routes
app.use(cors());

app.use(express.json()); // to allow json as an input

app.listen(3001, () => {
  console.log('listening on port 3001!');
});

// app.get('/', (req, res) => {
//   res.json({ message: 'API is working' });
// });

// instead use

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(status).json({ success: false, status, error: message });
});
