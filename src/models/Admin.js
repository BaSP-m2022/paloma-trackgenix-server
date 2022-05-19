import mongoose from 'mongoose';

const { Schema } = mongoose;

// eslint-disable-next-line no-unused-vars
const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female'],
    },
    active: {
      type: Boolean,
      required: true,
    },
  },
);

export default mongoose.model('Admin', adminSchema);
