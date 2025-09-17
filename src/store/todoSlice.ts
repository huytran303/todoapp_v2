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

function saveTodos(items: Todo[]) {
    if (items.length > 0) {
        localStorage.setItem("todos", JSON.stringify(items));
    } else {
        localStorage.removeItem("todos");
    }
}

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
            saveTodos(state.items);
        },

        toggleTodo: (state, action: PayloadAction<number>) => {
            const todo = state.items.find(todo => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
                saveTodos(state.items);
            }
        },

        deleteTodo: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(todo => todo.id !== action.payload);
            saveTodos(state.items);
        },

        editTodo: (state, action: PayloadAction<{ id: number; title: string }>) => {
            const todo = state.items.find(todo => todo.id === action.payload.id);
            if (todo) {
                todo.title = action.payload.title;
                saveTodos(state.items);
            }
        },

        toggleAllTodos: (state) => {
            const allCompleted = state.items.length > 0 && state.items.every(todo => todo.completed);
            state.items.forEach(todo => {
                todo.completed = !allCompleted;
            });
            saveTodos(state.items);
        },

        clearCompletedTodos: (state) => {
            state.items = state.items.filter(todo => !todo.completed);
            saveTodos(state.items);
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