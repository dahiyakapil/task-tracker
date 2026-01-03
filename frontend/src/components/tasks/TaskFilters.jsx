import { Select } from '../ui';

const TaskFilters = ({ filters, onFilterChange }) => {
    const statusOptions = [
        { value: 'Pending', label: 'Pending' },
        { value: 'Completed', label: 'Completed' },
    ];

    const priorityOptions = [
        { value: 'Low', label: 'Low' },
        { value: 'Medium', label: 'Medium' },
        { value: 'High', label: 'High' },
    ];

    const sortOptions = [
        { value: '', label: 'Newest First' },
        { value: 'dueDate', label: 'Due Date (Earliest)' },
        { value: 'dueDateDesc', label: 'Due Date (Latest)' },
        { value: 'priority', label: 'Priority (High to Low)' },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        onFilterChange({
            ...filters,
            [name]: value,
        });
    };

    const clearFilters = () => {
        onFilterChange({
            status: '',
            priority: '',
            sortBy: '',
        });
    };

    const hasActiveFilters = filters.status || filters.priority || filters.sortBy;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-end gap-4">
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Select
                        label="Filter by Status"
                        name="status"
                        value={filters.status}
                        onChange={handleChange}
                        options={statusOptions}
                        placeholder="All Status"
                    />
                    <Select
                        label="Filter by Priority"
                        name="priority"
                        value={filters.priority}
                        onChange={handleChange}
                        options={priorityOptions}
                        placeholder="All Priorities"
                    />
                    <Select
                        label="Sort By"
                        name="sortBy"
                        value={filters.sortBy}
                        onChange={handleChange}
                        options={sortOptions}
                        placeholder="Default"
                    />
                </div>
                {hasActiveFilters && (
                    <button
                        onClick={clearFilters}
                        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors whitespace-nowrap"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Clear filters
                    </button>
                )}
            </div>
        </div>
    );
};

export default TaskFilters;
