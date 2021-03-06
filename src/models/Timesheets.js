import mongoose from 'mongoose';

const { Schema } = mongoose;
const timeSheetSchema = new Schema(
  {
    name: { type: String, required: true },
    surName: { type: String, required: true },
    role: { type: String, required: true },
    startDate: { type: Date, required: true },
    finishDate: { type: Date, required: true },
    regularHours: { type: Number, required: true },
    overtimeHours: { type: Number, required: true },
    rate: { type: Number, required: true },
    project: { type: String, required: true },
    task: { type: String, required: true },
  },
  {
    collection: 'Timesheet',
    versionKey: false,
  },
);

export default mongoose.model('Timesheet', timeSheetSchema);
