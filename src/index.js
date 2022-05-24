import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import router from './routes';

dotenv.config();

const mongoDBURL = 'mongodb+srv://BaSP:BaSP2022@cluster0.caoft.mongodb.net/BaSP-database?appName=mongosh+1.3.1';
mongoose.connect(mongoDBURL, () => {
  console.log('Connected to the database');
}, (error) => console.log(`Failed to connect to the database ${error}`));

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/*
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const port = process.env.PORT || 3000;

const mongoDBURL = 'mongodb+srv://BaSP:BaSP2022@cluster0.caoft.mongodb.net/BaSP-database?appName=mongosh+1.3.1';
mongoose.connect(mongoDBURL, () => {
  console.log('Connected to the database');
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}, (error) => console.log(`Failed to connect to the database ${error}`));
*/
