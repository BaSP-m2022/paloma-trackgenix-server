// use "import" to import libraries
import express from 'express';

// use "require" to import JSON files
const admins = require('./data/admins.json');

const adminsRouter = require('./resources/administrator');

const app = express();
const port = process.env.PORT || 3000;

// With this line and the body parser the server can obtain info from postman
app.use(express.json());

app.use('/administrator', adminsRouter);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.get('/admins', (req, res) => {
  res.status(200).json({
    data: admins,
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
