import { useState } from "react";
import { cn } from "../lib/utils";
import { useAppDispatch } from "../store/hooks";
import { toggleTodo, deleteTodo, editTodo } from "../store/todoSlice";
import type { Todo } from "../type";

interface TodoItemProps {
    todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
    const dispatch = useAppDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.title);

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            const trimmedText = editText.trim();
            if (!trimmedText) return;

            dispatch(editTodo({ id: todo.id, title: trimmedText }));
            setIsEditing(false);
            return;
        }

        if (e.key === "Escape") {
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
                    onChange={(e) => setEditText(e.target.value)}
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
                            onChange={() => dispatch(toggleTodo(todo.id))}
                            className="peer hidden"
                        />
                        <span className="w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center peer-checked:border-green-500 peer-checked:after:content-['✓'] peer-checked:after:text-emerald-500 peer-checked:after:text-lg
        peer-checked:border-emerald-500">
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
                        onDoubleClick={() => {
                            setIsEditing(true);
                            setEditText(todo.title);
                        }}
                        className={cn(
                            "flex-1 min-w-0 whitespace-normal break-words text-sm sm:text-base cursor-pointer pr-2 text-gray-800",
                            {
                                "line-through text-gray-400": todo.completed,
                            }
                        )}
                    >
                        {todo.title}
                    </span>
                    <button
                        onClick={() => dispatch(deleteTodo(todo.id))}
                        className="hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity text-lg sm:text-xl flex-shrink-0 w-6 h-6 flex items-center justify-center"
                    >
                        X
                    </button>
                </>
            )}
        </div>
    );
}
