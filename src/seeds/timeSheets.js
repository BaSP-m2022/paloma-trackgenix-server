import mongoose from 'mongoose';

const addDays = (days) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d;
};

// Generate ObjetId on https://observablehq.com/@hugodf/mongodb-objectid-generator
export default [{
  _id: mongoose.Types.ObjectId('6287be8ffe1a69c4beb07aec'),
  employee: mongoose.Types.ObjectId('6287be7cddac0eb284448d89'),
  startDate: new Date(),
  finishDate: addDays(10),
  regularHours: 15,
  overtimeHours: 20,
  rate: 10,
  project: mongoose.Types.ObjectId('6287c0e3b74c24e95ba445c3'),
  task: mongoose.Types.ObjectId('6287c0e92362f86561a44540'),
}, {
  _id: mongoose.Types.ObjectId('1117be8ffe1a69c4beb07aec'),
  employee: mongoose.Types.ObjectId('6287be7cddac0eb284448d89'),
  startDate: new Date(),
  finishDate: addDays(5),
  regularHours: 1,
  overtimeHours: 2,
  rate: 1,
  project: mongoose.Types.ObjectId('6287c0e3b74c24e95ba445c3'),
  task: mongoose.Types.ObjectId('6287c0e92362f86561a44540'),
}];
export const relatedEmployee = {
  _id: mongoose.Types.ObjectId('6287be7cddac0eb284448d89'),
  name: 'Ana',
  lastname: 'Miller',
  email: 'anamiller@gmail.com',
  password: 'asdasdasd123',
  assignedRole: 'QA',
  assignedTask: 'TASK ASSIGNED',
};
export const relatedProject = {
  _id: mongoose.Types.ObjectId('6287c0e3b74c24e95ba445c3'),
  projectName: 'trackgenix',
  totalHours: 2,
  projectDescription: 'asdasdasd',
  startDate: new Date(),
  finishDate: addDays(10),
  rate: 2,
  employeeID: 'asd222',
  role: 'QA',
  state: 'finished',
};
export const relatedTask = {
  _id: mongoose.Types.ObjectId('6287c0e92362f86561a44540'),
  taskName: 'task number 1',
  taskDescription: '{ type: String, required: true }',
  status: ' { type: String, required: true }',
  employeeID: 2,
};
