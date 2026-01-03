const TextArea = ({
    label,
    name,
    value,
    onChange,
    placeholder,
    error,
    required = false,
    disabled = false,
    rows = 3,
    maxLength,
    className = '',
    ...props
}) => {
    return (
        <div className="w-full">
            {label && (
                <label 
                    htmlFor={name} 
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
                rows={rows}
                maxLength={maxLength}
                className={`
                    w-full px-4 py-2 border rounded-lg transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    disabled:bg-gray-100 disabled:cursor-not-allowed resize-none
                    ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}
                    ${className}
                `}
                {...props}
            />
            <div className="flex justify-between mt-1">
                {error && (
                    <p className="text-sm text-red-500">{error}</p>
                )}
                {maxLength && (
                    <p className={`text-sm ml-auto ${value.length > maxLength ? 'text-red-500' : 'text-gray-400'}`}>
                        {value.length}/{maxLength}
                    </p>
                )}
            </div>
        </div>
    );
};

export default TextArea;
