import mongoose, { mongo } from "mongoose";
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    taskID: {type: Number, required: true},
    taskName: {type: String, required: true},
    taskDescription: {type: String, required: true},
    status: {type: String, required: true},
    employeeID: {type: Number, required: false}
});

export default mongoose.model('Task', taskSchema)