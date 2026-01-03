
import { useState, useEffect, useCallback } from 'react';
import { taskAPI } from './services/api';
import { Header } from './components/layout';
import { TaskForm, TaskList, TaskFilters } from './components/tasks';
import { Button, Modal, Notification } from './components/ui';

function App() {
  // State management
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    sortBy: '',
  });
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'info',
  });

  // Show notification helper
  const showNotification = (message, type = 'info') => {
    setNotification({ show: true, message, type });
  };

  // Fetch tasks
  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await taskAPI.getAllTasks(filters);
      if (response.success) {
        setTasks(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      showNotification(error.response?.data?.message || 'Failed to fetch tasks', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  // Load tasks on mount and when filters change
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Create task
  const handleCreateTask = async (taskData) => {
    try {
      setIsSubmitting(true);
      const response = await taskAPI.createTask(taskData);
      if (response.success) {
        showNotification('Task created successfully!', 'success');
        setIsModalOpen(false);
        fetchTasks();
      }
    } catch (error) {
      console.error('Failed to create task:', error);
      showNotification(error.response?.data?.message || 'Failed to create task', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update task
  const handleUpdateTask = async (taskData) => {
    if (!editingTask) return;

    try {
      setIsSubmitting(true);
      const response = await taskAPI.updateTask(editingTask._id, taskData);
      if (response.success) {
        showNotification('Task updated successfully!', 'success');
        setIsModalOpen(false);
        setEditingTask(null);
        fetchTasks();
      }
    } catch (error) {
      console.error('Failed to update task:', error);
      showNotification(error.response?.data?.message || 'Failed to update task', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete task
  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      const response = await taskAPI.deleteTask(taskId);
      if (response.success) {
        showNotification('Task deleted successfully!', 'success');
        fetchTasks();
      }
    } catch (error) {
      console.error('Failed to delete task:', error);
      showNotification(error.response?.data?.message || 'Failed to delete task', 'error');
    }
  };

  // Toggle task status
  const handleStatusToggle = async (taskId, newStatus) => {
    try {
      const response = await taskAPI.updateTask(taskId, { status: newStatus });
      if (response.success) {
        showNotification(
          `Task marked as ${newStatus.toLowerCase()}!`,
          'success'
        );
        fetchTasks();
      }
    } catch (error) {
      console.error('Failed to update task status:', error);
      showNotification(error.response?.data?.message || 'Failed to update status', 'error');
    }
  };

  // Open edit modal
  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification */}
      <Notification
        show={notification.show}
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ ...notification, show: false })}
      />

      {/* Header */}
      <Header taskCount={tasks.length} />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Your Tasks</h2>
            <p className="text-gray-500 text-sm">
              {tasks.filter(t => t.status === 'Pending').length} pending, {' '}
              {tasks.filter(t => t.status === 'Completed').length} completed
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Task
          </Button>
        </div>

        {/* Filters */}
        <TaskFilters filters={filters} onFilterChange={handleFilterChange} />

        {/* Task List */}
        <TaskList
          tasks={tasks}
          isLoading={isLoading}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onStatusToggle={handleStatusToggle}
        />
      </main>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingTask ? 'Edit Task' : 'Create New Task'}
        size="md"
      >
        <TaskForm
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          initialData={editingTask}
          onCancel={handleCloseModal}
          isLoading={isSubmitting}
        />
      </Modal>
    </div>
  );
}

export default App;
