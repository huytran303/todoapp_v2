import { useState } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import ToggleAllButton from "./ui/ToggleAllButton";
import type { Todo } from "../type";

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
    const [inputFocused, setInputFocused] = useState(false);

    return (
        <div className={`flex items-center h-15 border-2 ${inputFocused ? 'border-red-700' : 'border-gray-200'}`}>
            {todos?.length > 0 && (
                <ToggleAllButton onToggleAll={onToggleAll} checked={checked} />
            )}
            <input
                className="flex-1 h-full px-3 text-lg italic text-gray-500
               placeholder:italic placeholder:text-gray-400
               outline-none border-0"
                placeholder="What needs to be done?"
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
            />
        </div>


    );
}
