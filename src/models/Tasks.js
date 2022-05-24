import mongoose from 'mongoose';

const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    taskName: { type: String, required: true },
    taskDescription: { type: String, required: true },
    status: { type: String, required: true },
    employeeID: { type: Number, required: false },
  },
  {
    collection: 'Task',
    versionKey: false,
  },
);

export default mongoose.model('Tasks', taskSchema);
