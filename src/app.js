// Use import to import libraries
import express from 'express';

import employees from './controllers/employees';
import employeesValidations from './validations/employees';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/employees', employees.getAllEmployees);
app.get('/employees/:id', employees.getEmployeesById);
app.post('/employees', employeesValidations.validateEmployee, employees.createEmployees);
app.put('/employees/:id', employeesValidations.validateUdEmplpoyee, employees.updateEmployee);
app.delete('/employees/:id', employees.deleteEmployee);

export default app;
