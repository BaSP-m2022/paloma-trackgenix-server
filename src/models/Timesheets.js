import mongoose from 'mongoose';

const { Schema } = mongoose;
const timeSheetSchema = new Schema(
  {
    startDate: {
      type: Date,
      required: true,
    },
    finishDate: {
      type: Date,
      required: true,
    },
    regularHours: {
      type: Number,
      required: true,
    },
    overtimeHours: {
      type: Number,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Projects',
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tasks',
    },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'employee',
    },
  },
  {
    collection: 'Timesheet',
    versionKey: false,
  },
);

export default mongoose.model('Timesheet', timeSheetSchema);
