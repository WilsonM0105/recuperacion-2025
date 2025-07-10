import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "./app.js";

describe("API de Tareas Avanzadas", () => {
  let id;

  it("Debe crear una tarea nueva", async () => {
    const res = await request(app).post("/tasks").send({
      id: 1,
      title: "Primera tarea",
      description: "Esta es la descripción",
      priority: 3,
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    id = res.body.id;
  });

  it("Debe rechazar prioridad inválida", async () => {
    const res = await request(app).post("/tasks").send({
      id: 2,
      title: "Tarea inválida",
      description: "Prueba",
      priority: 7,
    });
    expect(res.status).toBe(400);
  });

  it("Debe listar tareas", async () => {
    const res = await request(app).get("/tasks");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("Debe actualizar tarea a completada", async () => {
    const res = await request(app)
      .put(`/tasks/${id}`)
      .send({ completed: true });
    expect(res.status).toBe(200);
    expect(res.body.completed).toBe(true);
  });

  it("Debe generar resumen", async () => {
    const res = await request(app).get("/tasks/summary");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("total");
    expect(res.body).toHaveProperty("completed");
    expect(res.body).toHaveProperty("averagePriority");
  });

  it("Debe eliminar tarea", async () => {
    const res = await request(app).delete(`/tasks/${id}`);
    expect(res.status).toBe(200);
  });
});

it("Debe buscar tareas por título (parcial, sin mayúsculas)", async () => {
  await request(app).post("/tasks").send({
    id: 3,
    title: "Revisar informe semanal",
    description: "Resumen del lunes",
    priority: 2,
  });

  const res = await request(app).get("/tasks/search?title=SEman");
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
  expect(res.body.length).toBeGreaterThan(0);
});

it("Debe responder 400 si no se envía el parámetro title", async () => {
  const res = await request(app).get("/tasks/search");
  expect(res.status).toBe(400);
});
