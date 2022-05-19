
import mongoose from 'mongoose';

const { Schema } = mongoose;

const employee = new Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  assignedRole: { type: String, required: true },
  assignedTask: { type: String, required: true },
}, {
  collection: 'Employees',
  versionkey: false,
});

export default mongoose.model('employee', employee);

