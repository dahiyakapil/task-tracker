import { useState, useCallback } from 'react';
import { Button, Input, Select, TextArea } from '../ui';

const TaskForm = ({ onSubmit, initialData = null, onCancel, isLoading = false }) => {
    const getInitialFormData = () => ({
        title: initialData?.title || '',
        description: initialData?.description || '',
        priority: initialData?.priority || 'Medium',
        dueDate: initialData?.dueDate 
            ? new Date(initialData.dueDate).toISOString().split('T')[0] 
            : '',
        status: initialData?.status || 'Pending',
    });

    const [formData, setFormData] = useState(getInitialFormData);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    // Validate form
    const validate = useCallback(() => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Task title is required';
        } else if (formData.title.length > 100) {
            newErrors.title = 'Title cannot exceed 100 characters';
        }

        if (formData.description.length > 500) {
            newErrors.description = 'Description cannot exceed 500 characters';
        }

        if (!formData.dueDate) {
            newErrors.dueDate = 'Due date is required';
        }

        return newErrors;
    }, [formData.title, formData.description, formData.dueDate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        
        // Validate on change if field was touched
        if (touched[name]) {
            const newErrors = validate();
            setErrors(newErrors);
        }
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched((prev) => ({
            ...prev,
            [name]: true,
        }));
        const newErrors = validate();
        setErrors(newErrors);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Mark all fields as touched
        setTouched({
            title: true,
            description: true,
            priority: true,
            dueDate: true,
            status: true,
        });

        const newErrors = validate();
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            onSubmit(formData);
        }
    };

    const isFormValid = formData.title.trim() && formData.dueDate && Object.keys(errors).length === 0;

    const priorityOptions = [
        { value: 'Low', label: 'Low' },
        { value: 'Medium', label: 'Medium' },
        { value: 'High', label: 'High' },
    ];

    const statusOptions = [
        { value: 'Pending', label: 'Pending' },
        { value: 'Completed', label: 'Completed' },
    ];

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                label="Task Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter task title"
                error={touched.title && errors.title}
                required
                maxLength={100}
            />

            <TextArea
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter task description (optional)"
                error={touched.description && errors.description}
                rows={3}
                maxLength={500}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                    label="Priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    options={priorityOptions}
                    placeholder="Select priority"
                />

                <Input
                    label="Due Date"
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.dueDate && errors.dueDate}
                    required
                    min={new Date().toISOString().split('T')[0]}
                />
            </div>

            {initialData && (
                <Select
                    label="Status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    options={statusOptions}
                    placeholder="Select status"
                />
            )}

            <div className="flex justify-end gap-3 pt-4">
                {onCancel && (
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onCancel}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                )}
                <Button
                    type="submit"
                    variant="primary"
                    disabled={!isFormValid || isLoading}
                >
                    {isLoading ? 'Saving...' : initialData ? 'Update Task' : 'Create Task'}
                </Button>
            </div>
        </form>
    );
};

export default TaskForm;
