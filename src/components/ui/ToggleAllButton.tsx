import React from "react";

interface ToggleAllButtonProps {
    onToggleAll: () => void;
    checked: boolean;
}

const ToggleAllButton: React.FC<ToggleAllButtonProps> = ({ onToggleAll, checked }) => {
    return (
        <button
            onClick={onToggleAll}
            className="flex items-center justify-center w-10 h-10 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            aria-pressed={checked}
            type="button"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
        </button>
    );
};

export default ToggleAllButton;
