import mongoose from 'mongoose';

export default [{
  _id: mongoose.Types.ObjectId('628bc4a3a60db4d71c872757'),
  projectName: 'Project 2345',
  totalHours: '48',
  projectDescription: 'TEST Description 2',
  startDate: '2022-03-12T03:00:00.000+00:00',
  finishDate: '2022-05-01T03:00:00.000+00:00',
  state: 'finished',
  employee: [{
    role: 'QA',
    rate: '25',
    employeeId: '628a6a4d9397655c03855a13',
  }],
}];
