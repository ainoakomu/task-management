const { createTaskService } = require("../../src/tasks/taskService");
const { ValidationError, NotFoundError } = require("../../src/tasks/errors");

//testataan taskien luontia, hakua, listaa, päivitystä ja poistoa taskServicessä
describe("TaskService", () => {
  //testataan taskien luontia 
  describe("createTask()", () => {
    test("calls repo.create and returns created task", async () => {
      const fakeRepo = {
        create: jest.fn(async (task) => ({ id: "1", ...task })),
      };

      const service = createTaskService({ taskRepo: fakeRepo });
      const result = await service.createTask({ title: "Hello" });

      expect(fakeRepo.create).toHaveBeenCalledTimes(1);
      expect(fakeRepo.create).toHaveBeenCalledWith({ title: "Hello" });
      expect(result).toEqual({ id: "1", title: "Hello" });
    });

    test("throws ValidationError when title is empty", async () => {
      const fakeRepo = { create: jest.fn() };
      const service = createTaskService({ taskRepo: fakeRepo });

      await expect(service.createTask({ title: "" })).rejects.toBeInstanceOf(ValidationError);
      expect(fakeRepo.create).not.toHaveBeenCalled();
    });
  });

  //testataan taskien hakua id:llä
  describe("getTask()", () => {
    test("returns task when found", async () => {
      const fakeRepo = {
        findById: jest.fn(async (id) => ({ id, title: "Found" })),
      };

      const service = createTaskService({ taskRepo: fakeRepo });
      const result = await service.getTask("123");

      expect(fakeRepo.findById).toHaveBeenCalledWith("123");
      expect(result).toEqual({ id: "123", title: "Found" });
    });

    test("throws NotFoundError when missing", async () => {
      const fakeRepo = {
        findById: jest.fn(async () => null),
      };

      const service = createTaskService({ taskRepo: fakeRepo });

      await expect(service.getTask("Missing")).rejects.toBeInstanceOf(NotFoundError);
    });
  });
  //testataan taskien listan toimintaa
  describe("listTasks()", () => {
    test("returns repo.list()", async () => {
      const fakeRepo = {
        list: jest.fn(async () => [{ id: "1", title: "A" }]),
      };

      const service = createTaskService({ taskRepo: fakeRepo });
      const result = await service.listTasks();

      expect(fakeRepo.list).toHaveBeenCalledTimes(1);
      expect(result).toEqual([{ id: "1", title: "A" }]);
    });
  });
  //testataan taskien päivitystä
  describe("updateTask()", () => {
    test("updates when found", async () => {
      const fakeRepo = {
        update: jest.fn(async (id, patch) => ({ id, title: patch.title, status: patch.status })),
      };

      const service = createTaskService({ taskRepo: fakeRepo });
      const result = await service.updateTask("1", { title: "New", status: "done" });

      expect(fakeRepo.update).toHaveBeenCalledWith("1", { title: "New", status: "done" });
      expect(result).toEqual({ id: "1", title: "New", status: "done" });
    });

    test("throws ValidationError if patch title is invalid", async () => {
      const fakeRepo = { update: jest.fn() };
      const service = createTaskService({ taskRepo: fakeRepo });

      await expect(service.updateTask("1", { title: "   " })).rejects.toBeInstanceOf(ValidationError);
      expect(fakeRepo.update).not.toHaveBeenCalled();
    });

    test("throws ValidationError if patch status is invalid", async () => {
      const fakeRepo = { update: jest.fn() };
      const service = createTaskService({ taskRepo: fakeRepo });

      await expect(service.updateTask("1", { status: "invalid_status" }))
        .rejects
        .toBeInstanceOf(ValidationError);

      expect(fakeRepo.update).not.toHaveBeenCalled();
    });

    test("allows PATCH with only valid status", async () => {
      const fakeRepo = {
        update: jest.fn(async (id, patch) => ({ id, title: "Keep", status: patch.status })),
      };

      const service = createTaskService({ taskRepo: fakeRepo });
      const result = await service.updateTask("1", { status: "done" });

      expect(fakeRepo.update).toHaveBeenCalledWith("1", { status: "done" });
      expect(result).toEqual({ id: "1", title: "Keep", status: "done" });
    });

    test("allows PATCH with only valid title", async () => {
      const fakeRepo = {
        update: jest.fn(async (id, patch) => ({ id, title: patch.title, status: "todo" })),
      };

      const service = createTaskService({ taskRepo: fakeRepo });
      const result = await service.updateTask("1", { title: "New title" });

      expect(fakeRepo.update).toHaveBeenCalledWith("1", { title: "New title" });
      expect(result).toEqual({ id: "1", title: "New title", status: "todo" });
    });

    test("allows empty patch and forwards to repo", async () => {
      const fakeRepo = {
        update: jest.fn(async (id, patch) => ({ id, title: "Keep", status: "todo", ...patch })),
      };

      const service = createTaskService({ taskRepo: fakeRepo });
      const result = await service.updateTask("1", {});

      expect(fakeRepo.update).toHaveBeenCalledWith("1", {});
      expect(result).toEqual({ id: "1", title: "Keep", status: "todo" });
    });

    test("throws NotFoundError when task does not exist", async () => {
      const fakeRepo = {
        update: jest.fn(async () => null),
      };

      const service = createTaskService({ taskRepo: fakeRepo });

      await expect(service.updateTask("missing", { title: "Ok" })).rejects.toBeInstanceOf(NotFoundError);
    });

    test("throws NotFoundError when validation passes but task does not exist", async () => {
      const fakeRepo = {
        update: jest.fn(async () => null),
      };

      const service = createTaskService({ taskRepo: fakeRepo });

      await expect(service.updateTask("missing", { status: "done" }))
        .rejects
        .toBeInstanceOf(NotFoundError);
    });
  });
  //testataan taskien poistoa taskServicessä
  describe("deleteTask()", () => {
    test("calls repo.remove when found", async () => {
      const fakeRepo = {
        remove: jest.fn(async () => true),
      };

      const service = createTaskService({ taskRepo: fakeRepo });

      await service.deleteTask("1");
      expect(fakeRepo.remove).toHaveBeenCalledWith("1");
    });

    test("throws NotFoundError when missing", async () => {
      const fakeRepo = {
        remove: jest.fn(async () => false),
      };

      const service = createTaskService({ taskRepo: fakeRepo });

      await expect(service.deleteTask("missing")).rejects.toBeInstanceOf(NotFoundError);
    });
  });
});