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

describe("GET /tasks", () => {
test("GET /tasks returns an array", async () => {   
    
    const response = await request(app).get("/tasks");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);  
    expect(response.headers['content-type']).toMatch(/json/);  
});

test("POST then GET /tasks returns the created task", async () => {
    await request(app)
    .post("/tasks")
    .send({ title: "Persist me", status:"todo"})
    .expect(201);

    const response = await request(app).get("/tasks");

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body.some(task => task.title === "Persist me")).toBe(true);
    });
    
});