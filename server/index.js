import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';

// It allows us to pull all the environment variables from .env files
dotenv.config();

// Initialize express
const app = express();

// middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.get('/', async (req, res) => {
  res.send('Hello from DELL A API');
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(9000, () => {
      console.log('App is running on https://localhost:9000');
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
