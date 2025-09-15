import { useState } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import type { Todo } from "../type";

interface TodoItemProps {
    todo: Todo;
    onToggle: () => void;
    onDelete: () => void;
    onEdit: (newTitle: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.title);

    function handleDoubleClick() {
        setIsEditing(true);
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setEditText(e.target.value);
    }

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") finishEdit();
    }

    function finishEdit() {
        if (editText.trim() === "") {
            onDelete();
        } else {
            onEdit(editText.trim());
        }
        setIsEditing(false);
    }

    return (
        <div className="group flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-2 sm:py-3 border-b hover:bg-gray-50 transition-colors w-full">
            <label className="relative flex items-center cursor-pointer flex-shrink-0">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={onToggle}
                    className="peer hidden"
                />
                <span className="w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center peer-checked:border-green-500">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-green-500 hidden peer-checked:block"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </span>
            </label>

            {isEditing ? (
                <input
                    className="flex-1 p-1 sm:p-2 text-sm sm:text-base border rounded outline-none focus:ring-2 focus:ring-blue-200"
                    value={editText}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onBlur={finishEdit}
                    autoFocus
                />
            ) : (
                <span
                    onDoubleClick={handleDoubleClick}
                    className={
                        todo.completed
                            ? "line-through text-gray-400 flex-1 text-sm sm:text-base cursor-pointer"
                            : "text-gray-800 flex-1 text-sm sm:text-base cursor-pointer"
                    }
                >
                    {todo.title}
                </span>
            )}

            <button
                onClick={onDelete}
                className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity text-lg sm:text-xl flex-shrink-0 w-6 h-6 flex items-center justify-center"
            >
                ×
            </button>
        </div>
    );
}
