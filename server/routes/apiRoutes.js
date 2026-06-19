import express from "express";
import { createId, normalizeText, readDatabase, writeDatabase } from "../database/store.js";

const router = express.Router();
const allowedCollections = new Set([
  "machines",
  "technicians",
  "schedules",
  "breakdowns",
  "history",
  "users",
]);

function notFoundResponse(res, message) {
  return res.status(404).json({ message });
}

function validateCollection(name) {
  return allowedCollections.has(name);
}

function upsertItem(collection, payload, id) {
  if (id) {
    return collection.map((item) =>
      String(item.id) === String(id)
        ? { ...item, ...payload, id: item.id }
        : item
    );
  }

  const nextItem = {
    id: createId(collection),
    ...payload,
  };

  return [...collection, nextItem];
}

router.get("/health", (_req, res) => {
  res.json({ ok: true, service: "maintenance-scheduler-api" });
});

router.get("/summary", async (_req, res) => {
  const database = await readDatabase();
  const completedSchedules = database.schedules.filter((item) => item.status === "Completed").length;
  const pendingSchedules = database.schedules.filter((item) => item.status === "Pending").length;
  const openBreakdowns = database.breakdowns.filter((item) => item.status === "Open").length;

  res.json({
    machines: database.machines.length,
    technicians: database.technicians.length,
    schedules: database.schedules.length,
    completedSchedules,
    pendingSchedules,
    openBreakdowns,
  });
});

router.post("/login", async (req, res) => {
  const { department, password } = req.body || {};
  const database = await readDatabase();
  const user = database.users.find(
    (item) =>
      normalizeText(item.department).toLowerCase() === normalizeText(department).toLowerCase() &&
      normalizeText(item.password).toLowerCase() === normalizeText(password).toLowerCase()
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid department or password" });
  }

  res.json({
    id: user.id,
    department: user.department,
  });
});

router.get("/:collection", async (req, res) => {
  const { collection } = req.params;

  if (!validateCollection(collection)) {
    return notFoundResponse(res, "Unknown collection");
  }

  const database = await readDatabase();
  res.json(database[collection]);
});

router.post("/:collection", async (req, res) => {
  const { collection } = req.params;

  if (!validateCollection(collection)) {
    return notFoundResponse(res, "Unknown collection");
  }

  const payload = req.body || {};
  const database = await readDatabase();
  const nextCollection = upsertItem(database[collection], payload);
  const nextDatabase = await writeDatabase({
    ...database,
    [collection]: nextCollection,
  });

  res.status(201).json(nextDatabase[collection][nextDatabase[collection].length - 1]);
});

router.put("/:collection/:id", async (req, res) => {
  const { collection, id } = req.params;

  if (!validateCollection(collection)) {
    return notFoundResponse(res, "Unknown collection");
  }

  const database = await readDatabase();
  const exists = database[collection].some((item) => String(item.id) === String(id));

  if (!exists) {
    return notFoundResponse(res, "Item not found");
  }

  const nextCollection = upsertItem(database[collection], req.body || {}, id);
  const nextDatabase = await writeDatabase({
    ...database,
    [collection]: nextCollection,
  });
  const updatedItem = nextDatabase[collection].find((item) => String(item.id) === String(id));

  res.json(updatedItem);
});

router.delete("/:collection/:id", async (req, res) => {
  const { collection, id } = req.params;

  if (!validateCollection(collection)) {
    return notFoundResponse(res, "Unknown collection");
  }

  const database = await readDatabase();
  const initialLength = database[collection].length;
  const nextCollection = database[collection].filter((item) => String(item.id) !== String(id));

  if (nextCollection.length === initialLength) {
    return notFoundResponse(res, "Item not found");
  }

  await writeDatabase({
    ...database,
    [collection]: nextCollection,
  });

  res.status(204).send();
});

export default router;