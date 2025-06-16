'use client'
import React, { useState } from 'react';

const Toggle = ({
    checked = false,
    onCheckedChange,
    disabled = false,
    size = 'default',
    className = '',
    ...props
}) => {
    const [isChecked, setIsChecked] = useState(checked);

    const handleToggle = () => {
        if (disabled) return;

        const newChecked = !isChecked;
        setIsChecked(newChecked);
        onCheckedChange?.(newChecked);
    };

    const sizeClasses = {
        sm: 'h-4 w-7',
        default: 'h-5 w-9',
        lg: 'h-6 w-11'
    };

    const thumbSizeClasses = {
        sm: 'h-3 w-3',
        default: 'h-4 w-4',
        lg: 'h-5 w-5'
    };

    const translateClasses = {
        sm: isChecked ? 'translate-x-3' : 'translate-x-0',
        default: isChecked ? 'translate-x-4' : 'translate-x-0',
        lg: isChecked ? 'translate-x-5' : 'translate-x-0'
    };

    return (
        <button
            type="button"
            role="switch"
            aria-checked={isChecked}
            disabled={disabled}
            onClick={handleToggle}
            className={`
          ${sizeClasses[size]}
          relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent 
          transition-colors duration-200 ease-in-out outline-none
          ${isChecked
                    ? 'bg-[#17CF62]'
                    : 'bg-[#E2E4E9]'
                }
          ${disabled
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }
          ${className}
        `}
            {...props}
        >
            <span
                className={`
            ${thumbSizeClasses[size]}
            ${translateClasses[size]}
            pointer-events-none inline-block rounded-full bg-white shadow-lg 
            ring-0 transition duration-200 ease-in-out transform
          `}
            />
        </button>
    );
};

export default Toggle