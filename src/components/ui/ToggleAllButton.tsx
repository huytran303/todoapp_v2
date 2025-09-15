import React from "react";

interface ToggleAllButtonProps {
    onToggleAll: () => void;
    checked: boolean;
}

const ToggleAllButton: React.FC<ToggleAllButtonProps> = ({ onToggleAll, checked }) => {
    return (
        <button
            onClick={onToggleAll}
            type="button"
            aria-pressed={checked}
            className="w-12 h-full flex items-center justify-center
                 text-gray-400 hover:text-gray-600
                 focus:outline-none focus:ring-2 focus:ring-red-700"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-6 h-6 transform transition-transform `}
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
