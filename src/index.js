// use "import" to import libraries
import express from 'express';

// use "require" to import JSON files
const admins = require('./data/admins.json');
const employeesRouter = require('./resources/employees');

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  res.send('Hello World!');
});
const employeeRouter = require('./resources/employees');

app.use('/employees', employeeRouter);
app.get('/admins', (req, res) => {
  res.status(200).json({
    data: admins,
  });
});

app.use('/employees', employeesRouter);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
