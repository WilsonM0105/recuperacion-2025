let tasks = [];

function getAllTasks() {
  return tasks;
}

function getTaskById(id) {
  return tasks.find(t => t.id === id);
}

function createTask(task) {
  tasks.push(task);
}

function updateTask(id, updates) {
  const task = getTaskById(id);
  if (task) {
    Object.assign(task, updates);
    return true;
  }
  return false;
}

function deleteTask(id) {
  const index = tasks.findIndex(t => t.id === id);
  if (index !== -1) {
    tasks.splice(index, 1);
    return true;
  }
  return false;
}

function getSummary() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = tasks.filter(t => !t.completed);
  const avgPriority = pending.length
    ? pending.reduce((sum, t) => sum + t.priority, 0) / pending.length
    : 0;
  return { total, completed, avgPriority: avgPriority.toFixed(2) };
}

function isIdUnique(id) {
  return !tasks.some(t => t.id === id);
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getSummary,
  isIdUnique,
};

// Solo paso 4 pruebas de 6, entotal dio 2 errores