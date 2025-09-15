import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Todo, FilterStatus } from '../type';

interface TodoState {
    items: Todo[];
    filter: FilterStatus;
}

const initialState: TodoState = {
    items: (() => {
        const saved = localStorage.getItem("todos");
        return saved ? JSON.parse(saved) : [];
    })(),
    filter: "all"
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<string>) => {
            const todo: Todo = {
                id: Date.now(),
                title: action.payload,
                completed: false,
            };
            state.items.push(todo);

            // Persist to localStorage
            localStorage.setItem("todos", JSON.stringify(state.items));
        },

        toggleTodo: (state, action: PayloadAction<number>) => {
            const todo = state.items.find(todo => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
                localStorage.setItem("todos", JSON.stringify(state.items));
            }
        },

        deleteTodo: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(todo => todo.id !== action.payload);

            if (state.items.length > 0) {
                localStorage.setItem("todos", JSON.stringify(state.items));
            } else {
                localStorage.removeItem("todos");
            }
        },

        editTodo: (state, action: PayloadAction<{ id: number; title: string }>) => {
            const todo = state.items.find(todo => todo.id === action.payload.id);
            if (todo) {
                todo.title = action.payload.title;
                localStorage.setItem("todos", JSON.stringify(state.items));
            }
        },

        toggleAllTodos: (state) => {
            const allCompleted = state.items.length > 0 && state.items.every(todo => todo.completed);
            state.items.forEach(todo => {
                todo.completed = !allCompleted;
            });
            localStorage.setItem("todos", JSON.stringify(state.items));
        },

        clearCompletedTodos: (state) => {
            state.items = state.items.filter(todo => !todo.completed);

            if (state.items.length > 0) {
                localStorage.setItem("todos", JSON.stringify(state.items));
            } else {
                localStorage.removeItem("todos");
            }
        },

        setFilter: (state, action: PayloadAction<FilterStatus>) => {
            state.filter = action.payload;
        }
    }
});

export const {
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    toggleAllTodos,
    clearCompletedTodos,
    setFilter
} = todoSlice.actions;

export default todoSlice.reducer;