import { cn } from "../../lib/utils";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { toggleAllTodos } from "../../store/todoSlice";

export default function ToggleAllButton() {
    const dispatch = useAppDispatch();
    const todos = useAppSelector((state) => state.todos.items);
    const allCompleted = todos.length > 0 && todos.every((todo) => todo.completed);

    function handleToggleAll() {
        dispatch(toggleAllTodos());
    }

    return (
        <button
            onClick={handleToggleAll}
            type="button"
            aria-pressed={allCompleted}
            className={cn(
                "w-12 h-full flex items-center justify-center text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-700",
                {
                    "hover:text-gray-600": todos.length > 0,
                    "bg-white text-white": !todos.length
                }
            )}
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
}
