const request = require("supertest");
const app = require("../../src/app");

describe("Smoke Tests", () => {
  describe("Smoke 1: CRUD Happy Path", () => {
    test("POST creates task → GET finds it → PATCH updates status → DELETE removes → GET confirms deleted", async () => {
      // POST /tasks luo tehtävä
      const postResp = await request(app)
        .post("/tasks")
        .send({ title: "Smoke Task", status: "todo" })
        .expect(201);

      const taskId = postResp.body.id;
      expect(postResp.body.title).toBe("Smoke Task");
      expect(postResp.body.status).toBe("todo");

      // GET /tasks varmistaa että se löytyy listasta
      const listResp = await request(app)
        .get("/tasks")
        .expect(200);

      expect(Array.isArray(listResp.body)).toBe(true);
      expect(listResp.body.some(t => t.id === taskId)).toBe(true);

      // PATCH /tasks/:id päivitä status
      const patchResp = await request(app)
        .patch(`/tasks/${taskId}`)
        .send({ status: "done" })
        .expect(200);

      expect(patchResp.body.status).toBe("done");

      // DELETE /tasks/:id poista
      await request(app)
        .delete(`/tasks/${taskId}`)
        .expect(204);

      // GET /tasks varmistaa että poistui
      const finalResp = await request(app)
        .get("/tasks")
        .expect(200);

      expect(finalResp.body.some(t => t.id === taskId)).toBe(false);
    });
  });

  describe("Smoke 2: Error Path", () => {
    test("POST /tasks ilman titleä → 400 + järkevä virheviesti", async () => {
      const response = await request(app)
        .post("/tasks")
        .send({ status: "todo" })
        .expect(400);

      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toBeTruthy();
    });

    test("PATCH väärällä statuksella → 400", async () => {
  const created = await request(app)
    .post("/tasks")
    .send({ title: "Test", status: "todo" })
    .expect(201);

  const taskId = created.body.id;

  try {
    await request(app)
      .patch(`/tasks/${taskId}`)
      .send({ status: "invalid_status" })
      .expect(400);
  } finally {
    await request(app).delete(`/tasks/${taskId}`);
  }
    });
  });
});
