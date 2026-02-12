//importit
const request = require("supertest");
const app = require("../../src/app");

describe("POST /tasks", () => {

    test("creating a task with valid data succeeds", async () => {
        const response = await request(app)
        .post("/tasks")
        .send({ title: "Test Task",
            status:"todo"
        });

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe("Test Task");
    

    });

    test("creating a task with invalid status fails", async () => {
        const response = await request(app)
        .post("/tasks")
        .send({ title: "Test Task",
            status:"finished"
        });
        expect(response.statusCode).toBe(400);
    });
});