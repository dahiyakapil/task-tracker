# Task Tracker Backend API

Backend API for the Task Tracker application built with Node.js, Express, and MongoDB.

## Features

### Core Features
- ✅ Create new tasks
- ✅ Get all tasks
- ✅ Update task (including status)
- ✅ Delete tasks
- ✅ Proper MongoDB schema with timestamps

### Bonus Features
- ✅ Filter tasks by status or priority
- ✅ Sort tasks by due date
- ✅ Success and error notifications
- ✅ Environment variable usage
- ✅ Clean project structure
- ✅ Task statistics endpoint

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Environment Variables:** dotenv
- **CORS:** Enabled for frontend integration

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── connectDB.js       # Database connection
│   ├── controllers/
│   │   └── taskController.js  # Business logic
│   ├── models/
│   │   └── Task.js            # Task schema
│   ├── routes/
│   │   └── taskRoutes.js      # API routes
│   ├── utils/
│   │   └── errorHandler.js    # Error handling middleware
│   └── index.js               # Entry point
├── .env                       # Environment variables
├── .env.example              # Example environment variables
└── package.json              # Dependencies
```

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   ```bash
   # Copy .env.example to .env
   cp .env.example .env
   
   # Update .env with your MongoDB URI
   PORT=4000
   MONGO_URI=mongodb://localhost:27017/tasktracker
   ```

3. **Start the Server**
   ```bash
   # Development mode (with auto-reload)
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Base URL
```
http://localhost:4000/api
```

### Tasks

#### 1. Create Task
- **POST** `/tasks`
- **Body:**
  ```json
  {
    "title": "Complete project",
    "description": "Finish the task tracker app",
    "priority": "High",
    "dueDate": "2024-12-31",
    "status": "Pending"
  }
  ```
- **Required Fields:** `title`, `dueDate`
- **Optional Fields:** `description`, `priority`, `status`
- **Success Response:** `201 Created`

#### 2. Get All Tasks
- **GET** `/tasks`
- **Query Parameters:**
  - `status` - Filter by status (Pending/Completed)
  - `priority` - Filter by priority (Low/Medium/High)
  - `sortBy` - Sort tasks (dueDate/dueDateDesc/priority)
- **Examples:**
  ```
  GET /tasks                              # All tasks
  GET /tasks?status=Pending               # Pending tasks only
  GET /tasks?priority=High                # High priority tasks
  GET /tasks?status=Pending&priority=High # Combined filter
  GET /tasks?sortBy=dueDate               # Sort by due date (ascending)
  GET /tasks?sortBy=dueDateDesc           # Sort by due date (descending)
  ```
- **Success Response:** `200 OK`

#### 3. Get Single Task
- **GET** `/tasks/:id`
- **Success Response:** `200 OK`
- **Error Response:** `404 Not Found`

#### 4. Update Task
- **PUT** `/tasks/:id`
- **Body:** (All fields optional)
  ```json
  {
    "title": "Updated title",
    "description": "Updated description",
    "priority": "Medium",
    "dueDate": "2024-12-31",
    "status": "Completed"
  }
  ```
- **Success Response:** `200 OK`
- **Error Response:** `404 Not Found`

#### 5. Delete Task
- **DELETE** `/tasks/:id`
- **Success Response:** `200 OK`
- **Error Response:** `404 Not Found`

#### 6. Get Task Statistics
- **GET** `/tasks/stats/summary`
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "total": 10,
      "pending": 6,
      "completed": 4,
      "highPriority": 3
    }
  }
  ```

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message here"
}
```

## Task Schema

```javascript
{
  title: String (required, max 100 chars)
  description: String (optional, max 500 chars)
  priority: String (enum: Low/Medium/High, default: Medium)
  dueDate: Date (required)
  status: String (enum: Pending/Completed, default: Pending)
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-generated)
}
```

## Error Handling

The API includes comprehensive error handling for:
- Validation errors
- Invalid ObjectId format
- Duplicate entries
- 404 Not Found
- 500 Internal Server Error

## Testing the API

You can test the API using:
- **Postman** - Import the endpoints
- **Thunder Client** - VS Code extension
- **cURL** - Command line
- **Frontend Application** - React app

### Example cURL Commands

```bash
# Create a task
curl -X POST http://localhost:4000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Task","dueDate":"2024-12-31","priority":"High"}'

# Get all tasks
curl http://localhost:4000/api/tasks

# Get filtered tasks
curl "http://localhost:4000/api/tasks?status=Pending&sortBy=dueDate"

# Update task status
curl -X PUT http://localhost:4000/api/tasks/TASK_ID \
  -H "Content-Type: application/json" \
  -d '{"status":"Completed"}'

# Delete task
curl -X DELETE http://localhost:4000/api/tasks/TASK_ID
```

## Development Notes

- The API uses ES modules (`type: "module"` in package.json)
- CORS is enabled for all origins (configure for production)
- MongoDB indexes are created for optimized queries
- Auto-reload enabled in dev mode with `--watch` flag

## Deployment Considerations

1. Update CORS configuration for production
2. Set appropriate MongoDB connection string
3. Configure environment variables on hosting platform
4. Enable MongoDB Atlas for cloud database
5. Add rate limiting and security middleware
6. Use process manager like PM2 for production

## License

ISC
