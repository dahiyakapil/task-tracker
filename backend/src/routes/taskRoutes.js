import express from "express";
import {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
} from "../controllers/taskController.js";

const taskRouter = express.Router();



taskRouter.post("/create-task", createTask);
taskRouter.get("/", getAllTasks);
taskRouter.get("/:id", getTaskById);
taskRouter.put("/:id", updateTask);
taskRouter.delete("/:id", deleteTask);

export default taskRouter;