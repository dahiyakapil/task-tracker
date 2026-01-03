import Task from "../models/Task.js";

export const createTask = async (req, res) => {
    try {
        const { title, description, priority, dueDate, status } = req.body;

        // Validation
        if (!title || !dueDate) {
            return res.status(400).json({
                success: false,
                message: "Title and due date are required"
            });
        }

        // Create task
        const task = await Task.create({
            title,
            description,
            priority,
            dueDate,
            status
        });

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            data: task
        });
    } catch (error) {
        console.error("Create task error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to create task"
        });
    }
};


export const getAllTasks = async (req, res) => {
    try {
        const { status, priority, sortBy } = req.query;

        // Build filter object
        const filter = {};
        if (status) {
            filter.status = status;
        }
        if (priority) {
            filter.priority = priority;
        }

        // Build sort object
        let sort = {};
        if (sortBy === "dueDate") {
            sort = { dueDate: 1 }; // Ascending order (earliest first)
        } else if (sortBy === "dueDateDesc") {
            sort = { dueDate: -1 }; // Descending order (latest first)
        } else if (sortBy === "priority") {
            // Custom sort: High -> Medium -> Low
            sort = { priority: -1, dueDate: 1 };
        } else {
            sort = { createdAt: -1 }; // Default: newest first
        }

        const tasks = await Task.find(filter).sort(sort);

        res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks
        });
    } catch (error) {
        console.error("Get tasks error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch tasks"
        });
    }
};


export const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            data: task
        });
    } catch (error) {
        console.error("Get task error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch task"
        });
    }
};


export const updateTask = async (req, res) => {
    try {
        const { title, description, priority, dueDate, status } = req.body;

        // Find task
        let task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        // Update fields
        if (title !== undefined) task.title = title;
        if (description !== undefined) task.description = description;
        if (priority !== undefined) task.priority = priority;
        if (dueDate !== undefined) task.dueDate = dueDate;
        if (status !== undefined) task.status = status;

        await task.save();

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: task
        });
    } catch (error) {
        console.error("Update task error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to update task"
        });
    }
};


export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        await Task.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Task deleted successfully"
        });
    } catch (error) {
        console.error("Delete task error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to delete task"
        });
    }
};
