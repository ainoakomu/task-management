/*
Taskien data access
*/
function now() {
  return new Date().toISOString();
}

 function createTaskRepoMemory() {
    //internal storage
  const tasksById = new Map();
  let nextId = 1;

  return {
    async create(task) {
      const id = String(nextId);
      nextId = nextId + 1;

      const createdTask = {
        id,
        title: task.title,
        status: task.status ?? "todo",//use default only if null
        createdAt: now(),
        updatedAt: now(),
      };

      tasksById.set(id, createdTask);
      return createdTask;
    },

    async findById(id) {
        //use default only if null
      return tasksById.get(id) ?? null;
    },

    async list() {
      return Array.from(tasksById.values());
    },

    async update(id, patch) {
      const current = tasksById.get(id);
      if (!current) return null;

      const updated = {
        ...current,
        ...patch,
        id: current.id, // protect id
        updatedAt: now(),
      };

      tasksById.set(id, updated);
      return updated;
    },

    async remove(id) {
      return tasksById.delete(id);
    },
  };
}

module.exports = { createTaskRepoMemory };
