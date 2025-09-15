import type { ChangeEvent, KeyboardEvent } from "react";
import type { Todo } from "../type";
import ToggleAllButton from "./ui/ToggleAllButton";

interface TodoInputProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
    onToggleAll: () => void;
    checked: boolean;
    todos: Todo[];
}

export default function TodoInput({
    value,
    onChange,
    onKeyDown,
    onToggleAll,
    checked,
    todos,
}: TodoInputProps) {
    return (
        <div className="flex items-center w-full shadow-sm border-b border-gray-200">
            {todos?.length > 0 ? (
                <ToggleAllButton onToggleAll={onToggleAll} checked={checked} />
            ) : null}
            <input
                className="flex-1 w-full p-3 sm:p-4 text-lg sm:text-xl md:text-2xl italic text-gray-500 placeholder:text-lg sm:placeholder:text-xl md:placeholder:text-2xl placeholder:italic placeholder:text-gray-400 outline-none border-0 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                placeholder="What needs to be done?"
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
            />
        </div>
    );
}
