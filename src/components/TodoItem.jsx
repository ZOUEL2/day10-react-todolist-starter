import React, { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';

export const TodoItem = ({ todo }) => {
    const { updateTodo, removeTodo } = useContext(TodoContext);
    
    const handleToggle = () => {
        updateTodo(todo.id, { ...todo, done: !todo.done });
    };
    
    const handleDelete = (e) => {
        e.stopPropagation();
        removeTodo(todo.id);
    };
    
    return (
        <div className={`todo-item ${todo.done ? 'done' : ''}`}>
            <span 
                className="todo-text"
                onClick={handleToggle}
            >
                {todo.text}
            </span>
            <button 
                className="delete-btn"
                onClick={handleDelete}
            >
                ×
            </button>
        </div>
    );
};
