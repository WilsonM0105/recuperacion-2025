let tasks = [];

export const getAllTasks = () => tasks;

export const createTask = (task) => {
  if (tasks.find((t) => t.id === task.id)) {
    throw new Error("ID duplicado");
  }
  tasks.push({ ...task, completed: task.completed ?? false });
  return task;
};

export const updateTaskStatus = (id, completed) => {
  const task = tasks.find((t) => t.id == id);
  if (!task) throw new Error("Tarea no encontrada");
  task.completed = completed;
  return task;
};

export const deleteTask = (id) => {
  const index = tasks.findIndex((t) => t.id == id);
  if (index === -1) throw new Error("Tarea no encontrada");
  tasks.splice(index, 1);
};

export const getSummary = () => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = tasks.filter((t) => !t.completed);
  const averagePriority = pending.length
    ? pending.reduce((sum, t) => sum + t.priority, 0) / pending.length
    : 0;

  return {
    total,
    completed,
    averagePriority: Number(averagePriority.toFixed(2)),
  };
};

export const searchTasksByTitle = (query) => {
  const lowerQuery = query.toLowerCase();
  return tasks.filter((task) => task.title.toLowerCase().includes(lowerQuery));
};
