// use "import" to import libraries
import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import router from './routes';
// use "require" to import JSON files
// mongodb+srv://BaSP:<password>@cluster0.caoft.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// mongosh "mongodb+srv://cluster0.caoft.mongodb.net/myFirstDatabase" --apiVersion 1 --username BaSP
const mongoDBURL = 'mongodb+srv://BaSP:BaSP2022@cluster0.caoft.mongodb.net/BaSP-database?appName=mongosh+1.3.1';

mongoose.connect(mongoDBURL, () => {
  console.log('Connected to the database');
}, (error) => console.log(`Failed to connect to the database ${error}`));

const app = express();

const port = process.env.PORT || 3000;

// With this line and the body parser the server can obtain info from postman
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
