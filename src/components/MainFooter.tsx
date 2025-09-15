import { cn } from "../lib/utils";
import type { Todo } from "../type";
import type { FilterStatus } from "../type";
import { useAppSelector } from "../store/hooks";

interface FooterProps {
    todos: Todo[];
    onClearCompleted: () => void;
    onFilterChange: (filter: FilterStatus) => void;
}

export default function MainFooter({ todos, onClearCompleted, onFilterChange }: FooterProps) {
    const activeFilter = useAppSelector((state) => state.todos.filter);

    const activeTodos = todos.filter((todo) => !todo.completed);

    function handleFilterClick(filter: FilterStatus) {
        onFilterChange(filter);
    }

    if (todos.length === 0) return null;

    return (
        <footer className="flex flex-col sm:flex-row items-center justify-between px-2 sm:px-4 py-2 sm:py-3 border-t border-gray-100 text-xs sm:text-sm text-gray-600 gap-2 sm:gap-0 w-full">
            <span className="order-1 sm:order-none flex-shrink-0">
                {activeTodos.length} {activeTodos.length === 1 && "item left"}{activeTodos.length !== 1 && "items left"}
            </span>

            <ul className="flex gap-2 sm:gap-3 order-2 sm:order-none">
                <li>
                    <button
                        onClick={() => handleFilterClick("all")}
                        className={cn(
                            "px-2 py-1 transition text-xs sm:text-sm hover:border hover:border-red-700 focus:ring-2 focus:ring-red-300 focus:outline-none border border-transparent",
                            {
                                "border-red-700 rounded": activeFilter === "all",
                            }
                        )}
                    >
                        All
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => handleFilterClick("active")}
                        className={cn(
                            "px-2 py-1 transition text-xs sm:text-sm hover:border hover:border-red-700 focus:ring-2 focus:ring-red-300 focus:outline-none border border-transparent",
                            {
                                "border-red-700 rounded": activeFilter === "active",
                            }
                        )}
                    >
                        Active
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => handleFilterClick("completed")}
                        className={cn(
                            "px-2 py-1 transition text-xs sm:text-sm hover:border hover:border-red-700 focus:ring-2 focus:ring-red-300 focus:outline-none border border-transparent",
                            {
                                "border-red-700 rounded": activeFilter === "completed",
                            }
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
