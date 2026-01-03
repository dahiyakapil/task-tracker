// Global error handler middleware
export const errorHandler = (err, req, res, next) => {
    console.error("Error:", err);

    // Mongoose validation error
    if (err.name === "ValidationError") {
        const errors = Object.values(err.errors).map(error => error.message);
        return res.status(400).json({
            success: false,
            message: "Validation Error",
            errors
        });
    }

    // Mongoose CastError (invalid ObjectId)
    if (err.name === "CastError") {
        return res.status(400).json({
            success: false,
            message: "Invalid ID format"
        });
    }

    // Duplicate key error
    if (err.code === 11000) {
        return res.status(400).json({
            success: false,
            message: "Duplicate entry"
        });
    }

    // Default error
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
};

// 404 handler
export const notFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
};
