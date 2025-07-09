import * as model from '../models/taskModel.js';

export function getAll(req, res) {
  res.json(model.getAllTasks());
}

export function create(req, res) {
  const { id, title, description, completed, priority } = req.body;

  if (!id || !title || !description || priority === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (!model.isIdUnique(id)) {
    return res.status(409).json({ error: 'ID must be unique' });
  }

  if (priority < 1 || priority > 5) {
    return res.status(400).json({ error: 'Priority must be between 1 and 5' });
  }

  model.createTask({
    id,
    title,
    description,
    completed: Boolean(completed),
    priority: Number(priority),
  });

  res.status(201).json({ id }); // Para que el test espere el id devuelto
}

export function update(req, res) {
  const id = req.params.id;
  const { completed } = req.body;

  const updated = model.updateTask(id, { completed: Boolean(completed) });
  if (!updated) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const updatedTask = model.getTaskById(id);
  res.json(updatedTask); // El test espera el objeto con propiedad completed
}

export function remove(req, res) {
  const id = req.params.id;
  const deleted = model.deleteTask(id);
  if (!deleted) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json({ message: 'Task deleted successfully' });
}

export function summary(req, res) {
  const data = model.getSummary();
  res.json({
    total: data.total,
    completed: data.completed,
    averagePriority: parseFloat(data.avgPriority),
  });
}
