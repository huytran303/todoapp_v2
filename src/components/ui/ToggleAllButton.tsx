import React from "react";
import type { Todo } from '../../type'
interface ToggleAllButtonProps {
    onToggleAll: () => void;
    checked: boolean;
    todos: Todo[];
}

const ToggleAllButton: React.FC<ToggleAllButtonProps> = ({ onToggleAll, checked, todos }) => {
    return (
        <button
            onClick={onToggleAll}
            type="button"
            aria-pressed={checked}
            className={`w-12 h-full flex items-center justify-center
                 text-gray-400 
                 focus:outline-none focus:ring-2 focus:ring-red-700 ${todos.length > 0 ? "hover:text-gray-600" : "bg-white text-white"}`}
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
