import { string } from 'joi';
import mongoose from 'mongoose';

const { Schema } = mongoose;

const employee = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  assignedRole: { type: string, required: true },
  assignedTask: { type: string, required: true },
});

export default mongoose.model('employee', employee);
