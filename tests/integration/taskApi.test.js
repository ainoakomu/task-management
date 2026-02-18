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
    
test("Get /tasks/:id returns created task", async () => {
    const postResponse = await request(app)
    .post("/tasks")
    .send({ title: "Find me", status:"todo"})
    .expect(201);
    const taskId = postResponse.body.id;

    const getResponse = await request(app).get(`/tasks/${taskId}`);
    expect(getResponse.statusCode).toBe(200);
    expect(getResponse.body.id).toBe(taskId);
    expect(getResponse.body.title).toBe("Find me");
});

test("Get /tasks/:id with non-existing id returns 404", async () => {
    const response = await request(app).get("/tasks/non-existing-id");
    expect(response.statusCode).toBe(404);  
});

test("PATCH /tasks/:id updates task status", async () => {
    const createdResponse = await request(app)
    .post("/tasks")
    .send({ title: "Update me", status:"todo"})
    .expect(201);
    const taskId = createdResponse.body.id;
    
    const patchResponse = await request(app)
    .patch(`/tasks/${taskId}`)
    .send({ status: "done" })
    .expect(200);

    expect(patchResponse.body.status).toBe("done"); 
    console.log("PATCH status:", patchResponse.statusCode, patchResponse.body);
});

    test("PATCH /tasks/:id returns 404 for missing id", async () => {
        await request(app)
        .patch("/tasks/non-existing-id")
        .send({ status: "done" })
        .expect(404);
    });

    test("DELETE /tasks/:id deletes an existing task", async () => {
  const created = await request(app)
    .post("/tasks")
    .send({ title: "Delete me", status: "todo" })
    .expect(201);

  const id = created.body.id;

  await request(app)
    .delete(`/tasks/${id}`)
    .expect(204);

  // varmistus: task ei enää löydy
  await request(app)
    .get(`/tasks/${id}`)
    .expect(404);
});

test("DELETE /tasks/:id returns 404 for missing id", async () => {
  await request(app)
    .delete("/tasks/999999")
    .expect(404);
});

test("Full CRUD flow works end-to-end", async () => {
  const created = await request(app)
    .post("/tasks")
    .send({ title: "Flow", status: "todo" })
    .expect(201);

  const id = created.body.id;

  await request(app).get(`/tasks/${id}`).expect(200);

  await request(app)
    .patch(`/tasks/${id}`)
    .send({ status: "done" })
    .expect(200);

  await request(app).delete(`/tasks/${id}`).expect(204);

  await request(app).get(`/tasks/${id}`).expect(404);
});