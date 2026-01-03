import { Badge, Button, Card } from '../ui';

const TaskCard = ({ task, onEdit, onDelete, onStatusToggle }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const isOverdue = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const dueDate = new Date(task.dueDate);
        dueDate.setHours(0, 0, 0, 0);
        return dueDate < today && task.status !== 'Completed';
    };

    const getPriorityVariant = (priority) => {
        const variants = {
            Low: 'low',
            Medium: 'medium',
            High: 'high',
        };
        return variants[priority] || 'default';
    };

    return (
        <Card hover className={`${isOverdue() ? 'border-l-4 border-l-red-500' : ''}`}>
            <Card.Body>
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        {/* Title and Status Toggle */}
                        <div className="flex items-center gap-3 mb-2">
                            <button
                                onClick={() => onStatusToggle(task._id, task.status === 'Pending' ? 'Completed' : 'Pending')}
                                className={`
                                    flex-shrink-0 w-5 h-5 rounded-full border-2 transition-all duration-200
                                    flex items-center justify-center
                                    ${task.status === 'Completed' 
                                        ? 'bg-green-500 border-green-500' 
                                        : 'border-gray-300 hover:border-green-400'}
                                `}
                            >
                                {task.status === 'Completed' && (
                                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </button>
                            <h3 className={`font-semibold text-gray-900 truncate ${task.status === 'Completed' ? 'line-through text-gray-400' : ''}`}>
                                {task.title}
                            </h3>
                        </div>

                        {/* Description */}
                        {task.description && (
                            <p className={`text-gray-600 text-sm mb-3 line-clamp-2 ${task.status === 'Completed' ? 'text-gray-400' : ''}`}>
                                {task.description}
                            </p>
                        )}

                        {/* Badges */}
                        <div className="flex flex-wrap items-center gap-2">
                            <Badge variant={getPriorityVariant(task.priority)} size="sm">
                                {task.priority}
                            </Badge>
                            <Badge variant={task.status === 'Completed' ? 'completed' : 'pending'} size="sm">
                                {task.status}
                            </Badge>
                            {isOverdue() && (
                                <Badge variant="danger" size="sm">
                                    Overdue
                                </Badge>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onEdit(task)}
                            className="!px-2 !py-1"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </Button>
                        <Button
                            variant="danger"
                            size="sm"
                            onClick={() => onDelete(task._id)}
                            className="!px-2 !py-1"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </Button>
                    </div>
                </div>

                {/* Due Date */}
                <div className={`mt-3 pt-3 border-t border-gray-100 flex items-center text-sm ${isOverdue() ? 'text-red-500' : 'text-gray-500'}`}>
                    <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Due: {formatDate(task.dueDate)}
                </div>
            </Card.Body>
        </Card>
    );
};

export default TaskCard;
