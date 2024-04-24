import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

import cors from 'cors';
import statusMonitor from 'express-status-monitor';
import cookieParser from 'cookie-parser';
import path from 'path';
const __dirname = path.resolve(); //path.resolve() will return the absolute path of the current working directory where your script is executed. This is often useful when you need to reference files or directories relative to the location of your script.

const app = express();
//'/client/dist': This is a relative path that specifies the directory from which to serve static files. It assumes that there is a directory named client in the same directory as your script, and within that directory, there's a subdirectory named dist.express.static(): This is a built-in middleware function in Express that serves static files, such as HTML, CSS, images, etc., from the specified directory.

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
// app.use(cors());
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://mern-auth-app1-80228.firebaseapp.com',
    ],
    credentials: true,
  })
);

app.use(cookieParser());
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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});
// this code ensures that when a client makes a request to your server for any URL path that doesn't match a specific route defined earlier in your Express application, the server will respond by serving the index.html file from the client/dist directory.

//This pattern is frequently used in single-page applications (SPAs) where the client-side JavaScript handles routing and navigation within the application. The server-side routing is typically minimal, and the server primarily serves the initial HTML file. Subsequent navigation and routing within the application are handled by the client-side code.

//By serving the index.html file for all unmatched routes, the client-side application can take control and handle the routing internally, providing a seamless and responsive user experience without requiring additional server requests for each route change.
// Use express-status-monitor middleware

//By placing the wildcard route handler (app.get('*')) at the end of your route handlers, you ensure that requests to /api/auth/signout and other API endpoints are handled by their designated route handlers before falling back to serving the index.html file for other routes. This should resolve the issue with the /auth/signout route being intercepted by the wildcard route handler.

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(status).json({ success: false, status, error: message });
});
