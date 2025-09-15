import { useEffect, useState } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import MainFooter from "./MainFooter";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    toggleAllTodos,
    clearCompletedTodos,
    setFilter
} from "../store/todoSlice";

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

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && text.trim()) {
            dispatch(addTodo(text.trim()));
            setText("");
        }
    };

    const allCompleted = todos.length > 0 && todos.every((todo) => todo.completed);

    const handleToggleTodo = (id: number) => {
        dispatch(toggleTodo(id));
    };

    const handleDeleteTodo = (id: number) => {
        dispatch(deleteTodo(id));
    };

    const handleEditTodo = (id: number, title: string) => {
        dispatch(editTodo({ id, title }));
    };

    const handleToggleAll = () => {
        dispatch(toggleAllTodos());
    };

    const handleClearCompleted = () => {
        dispatch(clearCompletedTodos());
    };

    const handleFilterChange = (newFilter: typeof filter) => {
        dispatch(setFilter(newFilter));
    };

    const visibleTodos = todos.filter((todo) => {
        return filter === "active"
            ? !todo.completed
            : filter === "completed"
                ? todo.completed
                : true;
    });

    return (
        <div className="flex justify-center sm:px-6 lg:px-8">
            <div className="my-4 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl shadow-lg  bg-white overflow-hidden">
                <TodoInput
                    value={text}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onToggleAll={handleToggleAll}
                    checked={allCompleted}
                    todos={todos}
                />
                <div className="space-y-0">
                    {visibleTodos.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onToggle={() => handleToggleTodo(todo.id)}
                            onDelete={() => handleDeleteTodo(todo.id)}
                            onEdit={(newTitle: string) => handleEditTodo(todo.id, newTitle)}
                        />
                    ))}
                </div>
                <MainFooter
                    todos={todos}
                    onClearCompleted={handleClearCompleted}
                    onFilterChange={handleFilterChange}
                />
            </div>
        </div>
    );
}
