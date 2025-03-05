const express = require("express");
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  assignUserToTask,
  unassignUserFromTask,
  getTasksByUser,
} = require("../controllers/TaskController");
const { verifyToken } = require("../middleware/auth");
const authorizeTaskAccess = require("../middleware/taskAuthorization");

const router = express.Router();

router.post("/", verifyToken, createTask);
router.get("/", verifyToken, getTasks);
router.get(
  "/:id",
  verifyToken,
  authorizeTaskAccess(["admin", "member", "viewer"]),
  getTaskById
);
router.put(
  "/:id",
  verifyToken,
  authorizeTaskAccess(["admin", "member"]),
  updateTask
);
router.delete("/:id", verifyToken, authorizeTaskAccess(["admin"]), deleteTask);
router.put(
  "/:id/assign",
  verifyToken,
  authorizeTaskAccess(["admin"]),
  assignUserToTask
);
router.put(
  "/:id/unassign",
  verifyToken,
  authorizeTaskAccess(["admin"]),
  unassignUserFromTask
);
router.get("/assigned/:userId", verifyToken, getTasksByUser);

module.exports = router;
