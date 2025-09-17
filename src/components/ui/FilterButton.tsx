import { cn } from "../../lib/utils";
import type { FilterStatus } from "../../type";

interface FilterButtonProps {
    filter: FilterStatus;
    activeFilter: FilterStatus;
    onClick: (filter: FilterStatus) => void;
    children: React.ReactNode;
}

export default function FilterButton({ filter, activeFilter, onClick, children }: FilterButtonProps) {
    return (
        <li>
            <button
                onClick={() => onClick(filter)}
                className={cn(
                    "px-2 py-1 transition text-xs sm:text-sm hover:border hover:border-red-700 focus:ring-2 focus:ring-red-300 focus:outline-none border border-transparent",
                    {
                        "border-red-700 rounded": activeFilter === filter,
                    }
                )}
            >
                {children}
            </button>
        </li>
    );
}