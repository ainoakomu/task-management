//import taskin luonti ja virheet

const {createTaskService} =require("../../src/tasks/taskService");
const {ValidationError, NotFoundError}=require("../../src/tasks/errors");

//yhdistä samat testit
describe("TaskService", ()=>{

    test("createTask() calls repo.create and returns created task", async()=>{
        const fakeRepo={
            create: jest.fn(async (task)=>({id:"1", ...task})),
        };

        const service = createTaskService({taskRepo:fakeRepo});

        const result = await service.createTask({title:"Hello"});

        expect(fakeRepo.create).toHaveBeenCalledTimes(1);
        expect(fakeRepo.create).toHaveBeenCalledWith({title:"Hello"});
        expect(result).toEqual({id:"1",title:"Hello"});
    });

    test("createTask() throws ValidationError when title is empty", async() =>{

        const fakeRepo={create: jest.fn()};
        const service =createTaskService({taskRepo:fakeRepo});

        await expect(service.createTask({title:""})).rejects.toBeInstanceOf(ValidationError);
        expect(fakeRepo.create).not.toHaveBeenCalled();
    });

    test("getTask() returns task when found", async()=>{
        const fakeRepo={
            findById: jest.fn(async (id)=>({id, title:"Found"})),
        };

        const service=createTaskService({taskRepo:fakeRepo});
        const result=await service.getTask("123");
        expect(fakeRepo.findById).toHaveBeenCalledWith("123");
        expect(result).toEqual({id:"123",title:"Found"});
    });
    
    test("getTask() throws NotFoundError when missing", async()=>{
        const fakeRepo={
            findById:jest.fn(async()=> null),
       };

       const service=createTaskService({taskRepo:fakeRepo});
       await expect(service.getTask("Missing")).rejects.toBeInstanceOf(NotFoundError);
    });

     test("listTasks() returns repo.list()", async () => {
    const fakeRepo = {
      list: jest.fn(async () => [{ id: "1", title: "A" }]),
    };

    const service = createTaskService({ taskRepo: fakeRepo });

    const result = await service.listTasks();
    expect(fakeRepo.list).toHaveBeenCalledTimes(1);
    expect(result).toEqual([{ id: "1", title: "A" }]);
  });

  test("updateTask() updates when found", async () => {
    const fakeRepo = {
      update: jest.fn(async (id, patch) => ({ id, title: patch.title, status: patch.status })),
    };

    const service = createTaskService({ taskRepo: fakeRepo });

    const result = await service.updateTask("1", { title: "New", status: "done" });

    expect(fakeRepo.update).toHaveBeenCalledWith("1", { title: "New", status: "done" });
    expect(result).toEqual({ id: "1", title: "New", status: "done" });
  });

  test("updateTask() throws ValidationError if patch title is invalid", async () => {
    const fakeRepo = { update: jest.fn() };
    const service = createTaskService({ taskRepo: fakeRepo });

    await expect(service.updateTask("1", { title: "   " })).rejects.toBeInstanceOf(ValidationError);
    expect(fakeRepo.update).not.toHaveBeenCalled();
  });

  test("updateTask() throws NotFoundError when task does not exist", async () => {
    const fakeRepo = {
      update: jest.fn(async () => null),
    };

    const service = createTaskService({ taskRepo: fakeRepo });

    await expect(service.updateTask("missing", { title: "Ok" })).rejects.toBeInstanceOf(NotFoundError);
  });

  test("deleteTask() calls repo.remove when found", async () => {
    const fakeRepo = {
      remove: jest.fn(async () => true),
    };

    const service = createTaskService({ taskRepo: fakeRepo });

    await service.deleteTask("1");
    expect(fakeRepo.remove).toHaveBeenCalledWith("1");
  });

  test("deleteTask() throws NotFoundError when missing", async () => {
    const fakeRepo = {
      remove: jest.fn(async () => false),
    };

    const service = createTaskService({ taskRepo: fakeRepo });

    await expect(service.deleteTask("missing")).rejects.toBeInstanceOf(NotFoundError);
  });

});