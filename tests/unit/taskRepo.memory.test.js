const { createTaskRepoMemory } = require("../../src/tasks/taskRepo.memory.js");

/*
Testataan taskien muistia, niiden id, ja status, titlet
ja timestampit, sekä update, remove ja lista kaikista taskeista
*/
describe("TaskRepoMemory", () => {
  test("create() stores and returns a task with id", async () => {
    const repo = createTaskRepoMemory();

    const created = await repo.create({ title: "First" });

    expect(created.id).toBeDefined();
    expect(created.title).toBe("First");
    expect(created.status).toBe("todo");
    expect(created.createdAt).toBeDefined();
    expect(created.updatedAt).toBeDefined();
  });

  test("findById() returns the task, or null if missing", async () => {
    const repo = createTaskRepoMemory();

    const created = await repo.create({ title: "Find me" });

    expect(await repo.findById(created.id)).toEqual(created);
    expect(await repo.findById("does-not-exist")).toBeNull();
  });

  test("list() returns all created tasks", async () => {
    const repo = createTaskRepoMemory();

    await repo.create({ title: "A" });
    await repo.create({ title: "B" });

    const all = await repo.list();
    expect(all).toHaveLength(2);
    expect(all.map(t => t.title)).toEqual(["A", "B"]);
  });

  test("update() updates fields and returns updated task; null if missing", async () => {
    const repo = createTaskRepoMemory();

    const created = await repo.create({ title: "Old" });

    const updated = await repo.update(created.id, { title: "New", status: "done" });

    expect(updated.title).toBe("New");
    expect(updated.status).toBe("done");
    expect(updated.id).toBe(created.id);

    expect(await repo.update("missing", { title: "x" })).toBeNull();
  });

  test("remove() returns true if deleted, false if missing", async () => {
    const repo = createTaskRepoMemory();

    const created = await repo.create({ title: "Delete me" });

    expect(await repo.remove(created.id)).toBe(true);
    expect(await repo.remove(created.id)).toBe(false);
  });

  
});