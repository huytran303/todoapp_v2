import { useState } from "react";
import classNames from "classnames";
import type { Todo } from "../type";

interface FooterProps {
    todos: Todo[];
    onClearCompleted: () => void;
    onFilterChange: (filter: string) => void;
}

export default function MainFooter({ todos, onClearCompleted, onFilterChange }: FooterProps) {
    const [activeFilter, setActiveFilter] = useState("all");

    const activeTodos = todos.filter((todo) => !todo.completed)

    const handleFilterClick = (filter: string) => {
        setActiveFilter(filter);
        onFilterChange(filter);
    };

    if (todos.length === 0) return null;

    return (
        <footer className="flex flex-col sm:flex-row items-center justify-between px-2 sm:px-4 py-2 sm:py-3 border-t border-gray-100 text-xs sm:text-sm text-gray-600 gap-2 sm:gap-0 w-full">
            <span className="order-1 sm:order-none flex-shrink-0">
                {activeTodos.length} {activeTodos.length === 1 ? "item left" : "items left"}
            </span>

            <ul className="flex gap-2 sm:gap-3 order-2 sm:order-none">
                <li>
                    <button
                        onClick={() => handleFilterClick("all")}
                        className={classNames(
                            "px-2 py-1 transition text-xs sm:text-sm",
                            activeFilter === "all" &&
                            "border border-red-700 rounded shadow-[0_0_4px_rgba(239,68,68,0.6)]"
                        )}
                    >
                        All
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => handleFilterClick("active")}
                        className={classNames(
                            "px-2 py-1 transition text-xs sm:text-sm",
                            activeFilter === "active" &&
                            "border border-red-700 rounded shadow-[0_0_4px_rgba(239,68,68,0.6)]"
                        )}
                    >
                        Active
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => handleFilterClick("completed")}
                        className={classNames(
                            "px-2 py-1 transition text-xs sm:text-sm",
                            activeFilter === "completed" &&
                            "border border-red-700 rounded shadow-[0_0_4px_rgba(239,68,68,0.6)]"
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
