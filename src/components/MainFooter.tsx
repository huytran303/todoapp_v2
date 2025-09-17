import { cn } from "../lib/utils";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setFilter, clearCompletedTodos } from "../store/todoSlice";
import type { FilterStatus } from "../type";

export default function MainFooter() {
    const dispatch = useAppDispatch();
    const { items: todos, filter: activeFilter } = useAppSelector((state) => state.todos);

    const activeTodos = todos.filter((todo) => !todo.completed);

    function handleFilterClick(filter: FilterStatus) {
        dispatch(setFilter(filter));
    }

    function handleClearCompleted() {
        dispatch(clearCompletedTodos());
    }

    function handleAllClick() {
        handleFilterClick("all");
    }

    function handleActiveClick() {
        handleFilterClick("active");
    }

    function handleCompletedClick() {
        handleFilterClick("completed");
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
                        onClick={handleAllClick}
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
                        onClick={handleActiveClick}
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
                        onClick={handleCompletedClick}
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
                onClick={handleClearCompleted}
            >
                Clear completed
            </button>
        </footer>
    );
}
