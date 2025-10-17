import Task from '../models/Task.js';
export const createTask = async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, project: req.params.projectId });
    res.status(201).json(task);
  } catch (err) { res.status(400).json({ error: err.message }); }
};
export const getTasks = async (req, res) => {
  const tasks = await Task.find({ project: req.params.projectId }).sort({ createdAt: -1 });
  res.json(tasks);
};
export const updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
};
export const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
};
