const {ValidationError,NotFoundError }=require("./errors");

/*
Tarkastaa onko task kirjoitettu oikein, muuten antaa validationError
*/
function validateTask(task){
    //yrittää lukea titlen JOS task on olemassa
    const title=task?.title;

    //jos title ei ole string, on tyhjä tulee error viesti
    if (typeof title !== "string" || title.trim().length===0){
        throw new ValidationError("Task title must be non-empty string");
    }
}
/*
Logiikka puoli taskeille
*/
function createTaskService({ taskRepo }) {
  return {
    //luo taski, jos se on validi
    async createTask(task) {
      validateTask(task);
      return taskRepo.create(task);
    },

    //etsi taski id perusteella
    async getTask(id) {
      const task = await taskRepo.findById(id);
      if (!task) {
        throw new NotFoundError(`Task with id ${id} not found`);
      }
      return task;
    },
    //listaa taskit
    async listTasks() {
      return taskRepo.list();
    },
    //update taski id perusteella
    async updateTask(id, patch) {
      validateTask(patch);
      const updated = await taskRepo.update(id, patch);
      if (!updated) {
        throw new NotFoundError(`Task with id ${id} not found`);
      }
      return updated;
    },
    //poista taski id perusteella
    async deleteTask(id) {
      const removed = await taskRepo.remove(id);
      if (!removed) {
        throw new NotFoundError(`Task with id ${id} not found`);
      }
    },
  };
}

module.exports={
    validateTask,
    createTaskService
};