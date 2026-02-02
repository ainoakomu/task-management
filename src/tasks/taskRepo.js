/*
Moduulin tarkoitus on säilöä ja hakea taskeja
// Task Repository contract
// This file defines what a TaskRepo must be able to do.
// Implementations (memory, file, database) must follow this shape.

// create(task)        -> Promise<Task>
// findById(id)        -> Promise<Task | null>
// list(filter?)       -> Promise<Task[]>
// update(id, patch)   -> Promise<Task | null>
// remove(id)          -> Promise<boolean>

*/

export { createTaskRepoMemory as createTaskRepo } from "./taskRepo.memory.js";