import { useState } from "react";
import { twMerge } from "tailwind-merge";
import type { Todo } from "../type";
import type { FilterStatus } from "../type"

interface FooterProps {
    todos: Todo[];
    onClearCompleted: () => void;
    onFilterChange: (filter: string) => void;
}

export default function MainFooter({ todos, onClearCompleted, onFilterChange }: FooterProps) {
    const [activeFilter, setActiveFilter] = useState<FilterStatus>("all");

    const activeTodos = todos.filter(function (todo) {
        return !todo.completed;
    });

    function handleFilterClick(filter: FilterStatus) {
        setActiveFilter(filter);
        onFilterChange(filter);
    }

    if (todos.length === 0) return null;

    return (
        <footer className="flex flex-col sm:flex-row items-center justify-between px-2 sm:px-4 py-2 sm:py-3 border-t border-gray-100 text-xs sm:text-sm text-gray-600 gap-2 sm:gap-0 w-full">
            <span className="order-1 sm:order-none flex-shrink-0">
                {activeTodos.length} {activeTodos.length === 1 ? "item left" : "items left"}
            </span>

            <ul className="flex gap-2 sm:gap-3 order-2 sm:order-none">
                <li>
                    <button
                        onClick={function () { handleFilterClick("all"); }}
                        className={twMerge(
                            "px-2 py-1 transition text-xs sm:text-sm hover:border hover:border-red-700 focus:ring-2 focus:ring-red-300 focus:outline-none",
                            activeFilter === "all"
                                ? "border border-red-700 rounded"
                                : "border border-transparent"
                        )}
                    >
                        All
                    </button>
                </li>
                <li>
                    <button
                        onClick={function () { handleFilterClick("active"); }}
                        className={twMerge(
                            "px-2 py-1 transition text-xs sm:text-sm hover:border hover:border-red-700 focus:ring-2 focus:ring-red-300 focus:outline-none",
                            activeFilter === "active"
                                ? "border border-red-700 rounded"
                                : "border border-transparent"
                        )}
                    >
                        Active
                    </button>
                </li>
                <li>
                    <button
                        onClick={function () { handleFilterClick("completed"); }}
                        className={twMerge(
                            "px-2 py-1 transition text-xs sm:text-sm hover:border hover:border-red-700 focus:ring-2 focus:ring-red-300 focus:outline-none",
                            activeFilter === "completed"
                                ? "border border-red-700 rounded"
                                : "border border-transparent"
                        )}
                    >
                        Completed
                    </button>
                </li>
            </ul>

            <button
                className="hover:underline text-xs sm:text-sm order-3 sm:order-none flex-shrink-0"
                onClick={onClearCompleted}
            >
                Clear completed
            </button>
        </footer>
    );
}
