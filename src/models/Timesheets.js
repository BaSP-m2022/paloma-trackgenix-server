import mongoose from 'mongoose';

const { Schema } = mongoose;
const timeSheetSchema = new Schema(
  {
    employee: { type: Schema.Types.ObjectId, ref: 'employee' },
    startDate: { type: Date, required: true },
    finishDate: { type: Date, required: true },
    regularHours: { type: Number, required: true },
    overtimeHours: { type: Number, required: true },
    rate: { type: Number, required: true },
    project: { type: Schema.Types.ObjectId, ref: 'Projects' },
    task: { type: Schema.Types.ObjectId, ref: 'Tasks' },
  },
  {
    collection: 'Timesheet',
    versionKey: false,
  },
);

export default mongoose.model('Timesheet', timeSheetSchema);
