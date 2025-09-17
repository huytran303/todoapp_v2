import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setFilter, clearCompletedTodos } from "../store/todoSlice";
import type { FilterStatus } from "../type";
import FilterButton from "./ui/FilterButton";

export default function MainFooter() {
    const { items: todos, filter: activeFilter } = useAppSelector((state) => state.todos);

    const dispatch = useAppDispatch();
    const activeTodos = todos.filter((todo) => !todo.completed);

    function handleFilterClick(filter: FilterStatus) {
        dispatch(setFilter(filter));
    }

    if (todos.length === 0) return null;
    return (
        <footer className="flex flex-col sm:flex-row items-center justify-between px-2 sm:px-4 py-2 sm:py-3 border-t border-gray-100 text-xs sm:text-sm text-gray-600 gap-2 sm:gap-0 w-full">
            <span className="order-1 sm:order-none flex-shrink-0">
                {activeTodos.length} item{activeTodos.length !== 1 ? 's' : ''} left
            </span>

            <ul className="flex gap-2 sm:gap-3 order-2 sm:order-none">
                <FilterButton filter="all" activeFilter={activeFilter} onClick={handleFilterClick}>
                    All
                </FilterButton>
                <FilterButton filter="active" activeFilter={activeFilter} onClick={handleFilterClick}>
                    Active
                </FilterButton>
                <FilterButton filter="completed" activeFilter={activeFilter} onClick={handleFilterClick}>
                    Completed
                </FilterButton>
            </ul>

            <button
                className="hover:underline text-xs sm:text-sm order-3 sm:order-none flex-shrink-0"
                onClick={() => dispatch(clearCompletedTodos())}
            >
                Clear completed
            </button>
        </footer>
    );
}
