//importit
const request = require("supertest");
const app = require("../../src/app");

describe("POST /tasks", () => {
  test("creating a task with valid data succeeds", async () => {
    const response = await request(app)
      .post("/tasks")
      .send({ title: "Test Task", status: "todo" });

    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe("Test Task");
  });

  test("creating a task with invalid status fails", async () => {
    const response = await request(app)
      .post("/tasks")
      .send({ title: "Test Task", status: "finished" });
    expect(response.statusCode).toBe(400);
  });
});

test("GET /tasks returns an array", async () => {
  const response = await request(app).get("/tasks");
  expect(response.statusCode).toBe(200);
  expect(Array.isArray(response.body)).toBe(true);
  expect(response.headers["content-type"]).toMatch(/json/);
});

test("POST then GET /tasks returns the created task", async () => {
  await request(app)
    .post("/tasks")
    .send({ title: "Persist me", status: "todo" })
    .expect(201);

  const response = await request(app).get("/tasks");

  expect(response.statusCode).toBe(200);
  expect(response.body.length).toBeGreaterThan(0);
  expect(response.body.some((task) => task.title === "Persist me")).toBe(true);
});

test("Get /tasks/:id returns created task", async () => {
  const postResponse = await request(app)
    .post("/tasks")
    .send({ title: "Find me", status: "todo" })
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
    .send({ title: "Update me", status: "todo" })
    .expect(201);
  const taskId = createdResponse.body.id;

  const patchResponse = await request(app)
    .patch(`/tasks/${taskId}`)
    .send({ status: "done" })
    .expect(200);

  expect(patchResponse.body.status).toBe("done");
});

test("PATCH /tasks/:id with invalid status returns 400 with error message", async () => {
  const createdResponse = await request(app)
    .post("/tasks")
    .send({ title: "Test Task", status: "todo" })
    .expect(201);

  const taskId = createdResponse.body.id;

  const patchResponse = await request(app)
    .patch(`/tasks/${taskId}`)
    .send({ status: "completed" })
    .expect(400);

  expect(patchResponse.body).toHaveProperty("error");
  expect(patchResponse.body.error).toMatch(/[Ii]nvalid|[Ss]tatus/);
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

  await request(app).delete(`/tasks/${id}`).expect(204);

  // varmistus: task ei enää löydy
  await request(app).get(`/tasks/${id}`).expect(404);
});

test("DELETE /tasks/:id returns 404 for missing id", async () => {
  await request(app).delete("/tasks/999999").expect(404);
});

test("Full CRUD flow works end-to-end", async () => {
  const created = await request(app)
    .post("/tasks")
    .send({ title: "Flow", status: "todo" })
    .expect(201);

  const id = created.body.id;

  await request(app).get(`/tasks/${id}`).expect(200);

  await request(app).patch(`/tasks/${id}`).send({ status: "done" }).expect(200);

  await request(app).delete(`/tasks/${id}`).expect(204);

  await request(app).get(`/tasks/${id}`).expect(404);
});

test("GET /health returns status ok", async () => {
  const response = await request(app)
    .get("/health")
    .expect(200);

  expect(response.body).toEqual({ status: "ok" });
  expect(response.body.status).toBe("ok");
});

test("POST /tasks with invalid status returns 400 with error message", async () => {
  const response = await request(app)
    .post("/tasks")
    .send({ title: "Test Task", status: "invalid_status" })
    .expect(400);

  expect(response.body).toHaveProperty("error");
  expect(response.body.error).toBeTruthy();
  expect(typeof response.body.error).toBe("string");
  expect(response.body.error).toMatch(/[Ii]nvalid|[Ss]tatus/);
});

test("GET /tasks/:id with non-existing id returns 404 with error message", async () => {
  const response = await request(app)
    .get("/tasks/non-existing-id-xyz")
    .expect(404);

  expect(response.body).toHaveProperty("error");
  expect(response.body.error).toBeTruthy();
  expect(response.body.error).toContain("not found");
});

test("PATCH /tasks/:id with non-existing id returns 404 with error message", async () => {
  const response = await request(app)
    .patch("/tasks/non-existing-patch-id")
    .send({ status: "done" })
    .expect(404);

  expect(response.body).toHaveProperty("error");
  expect(response.body.error).toBeTruthy();
  expect(response.body.error).toContain("not found");
});

test("DELETE /tasks/:id with non-existing id returns 404 with error message", async () => {
  const response = await request(app)
    .delete("/tasks/non-existing-delete-id")
    .expect(404);

  expect(response.body).toHaveProperty("error");
  expect(response.body.error).toBeTruthy();
  expect(response.body.error).toContain("not found");
});

test("ValidationError (400) and NotFoundError (404) are handled differently", async () => {
  // ValidationError returns 400
  const validationResponse = await request(app)
    .post("/tasks")
    .send({ title: "Test", status: "invalid" })
    .expect(400);

  expect(validationResponse.status).toBe(400);
  expect(validationResponse.body.error).toBeTruthy();

  // NotFoundError returns 404
  const notFoundResponse = await request(app)
    .get("/tasks/missing-id-456")
    .expect(404);

  expect(notFoundResponse.status).toBe(404);
  expect(notFoundResponse.body.error).toBeTruthy();

  // Make sure ValidationError doesn't return 404
  expect(validationResponse.status).not.toBe(404);
});

test("POST /tasks with in_progress status succeeds", async () => {
  const response = await request(app)
    .post("/tasks")
    .send({ title: "In Progress Task", status: "in_progress" })
    .expect(201);

  expect(response.body.status).toBe("in_progress");
});
