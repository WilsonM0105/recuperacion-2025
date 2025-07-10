import {
  getAllTasks,
  createTask,
  updateTaskStatus,
  deleteTask,
  getSummary,
  searchTasksByTitle,
} from "../models/taskModel.js";

export const listTasks = (req, res) => {
  res.status(200).json(getAllTasks());
};

export const createNewTask = (req, res) => {
  const { id, title, description, priority } = req.body;

  if (!id || !title || !description || typeof priority !== "number") {
    return res.status(400).json({ error: "Campos incompletos o inválidos" });
  }

  if (priority < 1 || priority > 5) {
    return res.status(400).json({ error: "Prioridad fuera de rango" });
  }

  try {
    const newTask = createTask({ id, title, description, priority });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateTask = (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  if (typeof completed !== "boolean") {
    return res.status(400).json({ error: 'Campo "completed" inválido' });
  }

  try {
    const task = updateTaskStatus(id, completed);
    res.status(200).json(task);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const deleteTaskById = (req, res) => {
  const { id } = req.params;

  try {
    deleteTask(id);
    res.status(200).json({ message: "Tarea eliminada" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getTaskSummary = (req, res) => {
  const summary = getSummary();
  res.status(200).json(summary);
};

export const searchTasks = (req, res) => {
  const { title } = req.query;

  if (!title) {
    return res.status(400).json({ error: 'Falta el parámetro "title"' });
  }

  const results = searchTasksByTitle(title);
  res.status(200).json(results);
};
