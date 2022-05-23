import mongoose from 'mongoose';
import app from './app';

const port = process.env.PORT || 3000;

const mongoDBURL = 'mongodb+srv://BaSP:BaSP2022@cluster0.caoft.mongodb.net/BaSP-database?appName=mongosh+1.3.1';
mongoose.connect(mongoDBURL, () => {
  console.log('Connected to the database');
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}, (error) => console.log(`Failed to connect to the database ${error}`));
