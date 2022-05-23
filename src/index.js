import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';

dotenv.config();

const port = process.env.PORT || 3000;

const mongoDBURL = process.env.DATABASE_URL;

mongoose.connect(mongoDBURL, () => {
  console.log('Connected to the database');
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}, (error) => console.log(`Failed to connect to the database ${error}`));
