import { useEffect, useState } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import MainFooter from "./MainFooter";
import type { Todo } from "../type";

export default function Main() {

    const [text, setText] = useState<string>(() => {
        return localStorage.getItem("todoInputValue") || "";
    });


    const [todos, setTodos] = useState<Todo[]>(() => {
        const saved = localStorage.getItem("todos");
        return saved ? JSON.parse(saved) : [];
    });

    const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

    useEffect(() => {
        if (todos.length > 0) {
            localStorage.setItem("todos", JSON.stringify(todos));
        } else {
            localStorage.removeItem("todos");
        }
    }, [todos]);

    useEffect(() => {
        if (text.trim()) {
            localStorage.setItem("todoInputValue", text);
        } else {
            localStorage.removeItem("todoInputValue");
        }
    }, [text]);

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && text.trim() !== "") {
            const todo: Todo = {
                id: Date.now(),
                title: text,
                completed: false,
            };
            setTodos([...todos, todo]);
            setText("");
        }
    };

    const allCompleted = todos.length > 0 && todos.every((todo) => todo.completed);

    const toggleTodo = (index: number) => {
        const newTodos = [...todos];
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);
    };

    const clearCompleted = () => {
        const activeTodos = todos.filter((todo) => !todo.completed);
        setTodos(activeTodos);

        if (activeTodos.length > 0) {
            localStorage.setItem("todos", JSON.stringify(activeTodos));
        } else {
            localStorage.removeItem("todos");
        }
    };

    const toggleAll = () => {
        const newTodos = todos.map((todo) => ({ ...todo, completed: !allCompleted }));
        setTodos(newTodos);
    };


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
                    onToggleAll={toggleAll}
                    checked={allCompleted}
                    todos={todos}
                />
                <div className="space-y-0">
                    {visibleTodos.map((todo, idx) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onToggle={() => toggleTodo(idx)}
                            onDelete={() => {
                                const newTodos = todos.filter((t) => t.id !== todo.id);
                                setTodos(newTodos);
                            }}
                            onEdit={(newTitle: string) => {
                                const newTodos = [...todos];
                                newTodos[idx].title = newTitle;
                                setTodos(newTodos);
                            }}
                        />
                    ))}
                </div>
                <MainFooter
                    todos={todos}
                    onClearCompleted={clearCompleted}
                    onFilterChange={(f) => setFilter(f as "all" | "active" | "completed")}
                />
            </div>
        </div>
    );
}
