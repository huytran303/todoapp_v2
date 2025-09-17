import { useEffect, useState } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import MainFooter from "./MainFooter";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addTodo } from "../store/todoSlice";

export default function Main() {
    const dispatch = useAppDispatch();
    const { items: todos, filter } = useAppSelector((state) => state.todos);

    const [text, setText] = useState<string>(() => {
        return localStorage.getItem("todoInputValue") || "";
    });

    useEffect(() => {
        text.trim()
            ? localStorage.setItem("todoInputValue", text)
            : localStorage.removeItem("todoInputValue");
    }, [text]);

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key !== "Enter" || !text.trim()) return;

        dispatch(addTodo(text.trim()));
        setText("");
    }

    const visibleTodos = todos.filter((todo) => {
        if (filter === "active") return !todo.completed;
        if (filter === "completed") return todo.completed;
        return true;
    });

    return (
        <div className="flex justify-center sm:px-6 lg:px-8">
            <div className="my-4 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl shadow-lg  bg-white overflow-hidden">
                <TodoInput
                    value={text}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <div className="space-y-0">
                    {visibleTodos.map((todo) => (
                        <TodoItem key={todo.id} todo={todo} />
                    ))}
                </div>
                <MainFooter />
            </div>
        </div>
    );
}
