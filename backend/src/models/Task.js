import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Task title is required"],
            trim: true,
            maxlength: [100, "Task title cannot exceed 100 characters"]
        },
        description: {
            type: String,
            trim: true,
            maxlength: [500, "Description cannot exceed 500 characters"]
        },
        priority: {
            type: String,
            enum: ["Low", "Medium", "High"],
            default: "Medium"
        },
        dueDate: {
            type: Date,
            required: [true, "Due date is required"]
        },
        status: {
            type: String,
            enum: ["Pending", "Completed"],
            default: "Pending"
        }
    },
    {
        timestamps: true
    }
);

// Index for better query performance
taskSchema.index({ status: 1, priority: 1, dueDate: 1 });

const Task = mongoose.model("Task", taskSchema);

export default Task;
