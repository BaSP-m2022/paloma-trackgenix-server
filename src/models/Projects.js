import mongoose from 'mongoose';

const { Schema } = mongoose;

const projects = new Schema({
  projectName: { type: String, required: true },
  totalHours: { type: Number, required: true },
  projectDescription: { type: String, required: true },
  startDate: { type: Date, required: true },
  finishDate: { type: Date, required: false },
  rate: { type: Number, required: true },
  employeeID: { type: String, required: true },
  role: { type: String, required: true },
  state: { type: String, required: true },
}, {
  collection: 'Projects',
  versionKey: false,
});

export default mongoose.model('Projects', projects);
