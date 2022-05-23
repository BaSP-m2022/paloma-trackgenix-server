import mongoose from 'mongoose';

const { Schema } = mongoose;

const projects = new Schema({
  projectName: { type: String, required: true },
  totalHours: { type: Number, required: true },
  projectDescription: { type: String, required: true },
  startDate: { type: Date, required: true },
  finishDate: { type: Date, required: false },
  state: {
    type: String,
    required: true,
    enum: ['finished', 'started'],
  },
  employee: [{
    role: String,
    rate: Number,
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'employee',
    },
  }],
}, {
  collection: 'Projects',
  versionKey: false,
});

export default mongoose.model('Projects', projects);
