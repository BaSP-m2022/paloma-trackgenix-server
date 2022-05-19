import mongoose from 'mongoose';

const { Schema } = mongoose;

const SuperAdminSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },

}, {
  collection: 'SuperAdmin',
  versionKey: false,
});
export default mongoose.model('SuperAdmin', SuperAdminSchema);
