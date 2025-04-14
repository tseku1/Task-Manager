const express = require("express");
const {protect, adminOnly} = require("../middlewares/authMiddleware");
const {getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    updateTaskChecklist,
    getDashboardData,
    getUserDashboardData} = require("../controllers/taskController");

const router = express.Router();

// Task management Routes
router.get("/dashboard-data", protect, getDashboardData);
router.get("/user-dashboard-data", protect, getUserDashboardData);
router.get("/", protect, getTasks); // Get all tasks (Admin: all, User: assigned)
router.get("/:id", protect, getTaskById); // Get task by ID
router.post("/", protect, adminOnly, createTask); //Create a task (Admin only)
router.put("/:id", protect, updateTask); //update Task detail
router.delete("/:id", protect, adminOnly, deleteTask); // Delete task (Admin only)
router.put("/:id/status", protect, updateTaskStatus); // update task status
router.put("/:id/todo", protect, updateTaskChecklist); // update task checklist

module.exports = router;