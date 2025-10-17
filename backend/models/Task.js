import mongoose from 'mongoose';
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, enum: ['To Do','In Progress','Done'], default: 'To Do' },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.model('Task', taskSchema);
