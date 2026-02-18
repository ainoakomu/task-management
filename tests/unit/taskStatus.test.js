//ns importit
const { ValidationError } = require("../../src/tasks/errors");
const {validateTask} = require("../../src/tasks/taskService");

//testit task status validoinnille
describe("Task status validation", () => {
  test("task with invalid status is rejected", () => {
    const task = {
      title: "Test task",
      status: "finished", 
    };
    expect(() => validateTask(task)).toThrow(ValidationError);
  });
});