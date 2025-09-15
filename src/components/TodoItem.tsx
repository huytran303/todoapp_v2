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
        setEditText(todo.title);
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setEditText(e.target.value);
    }

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            const trimmedText = editText.trim();
            if (trimmedText) {
                onEdit(trimmedText);
            } else {
                setEditText(todo.title);
            }
            setIsEditing(false);
        } else if (e.key === "Escape") {
            setEditText(todo.title);
            setIsEditing(false);
        }
    }

    function handleBlur() {
        setEditText(todo.title);
        setIsEditing(false);
    }

    return (
        <div className="group flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-2 sm:py-3 
             border border-gray-200 hover:bg-gray-50 transition-colors w-full 
             focus-within:border-red-700 focus-within:border-2">
            {isEditing ? (
                <input
                    className="flex-1 p-1 sm:p-2 text-sm sm:text-base rounded outline-none"
                    value={editText}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    autoFocus
                />
            ) : (
                <>
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
                    <span
                        onDoubleClick={handleDoubleClick}
                        className={
                            (todo.completed ? "line-through text-gray-400" : "text-gray-800") +
                            " flex-1 min-w-0 whitespace-normal break-words text-sm sm:text-base cursor-pointer pr-2"
                        }
                    >
                        {todo.title}
                    </span>
                    <button
                        onClick={onDelete}
                        className="hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity text-lg sm:text-xl flex-shrink-0 w-6 h-6 flex items-center justify-center"
                    >
                        X
                    </button>
                </>
            )}
        </div>
    );
}
