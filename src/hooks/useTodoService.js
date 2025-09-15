import { useState, useEffect, useCallback } from 'react';
import { getTodos, addTodo, deleteTodo, updateTodo } from '../apis/todoApi';

export const useTodoService = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadTodos = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getTodos();
            console.log('Todos loaded from server:', response.data);
            setTodos(response.data);
        } catch (err) {
            console.error('加载todos失败:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    const addTodoItem = async (todoData) => {
        const newId = Math.max(...todos.map(todo => todo.id), 0) + 1;
        const newTodo = {
            id: newId,
            ...todoData
        };
        
        try {
            setTodos(prevTodos => [...prevTodos, newTodo]);
            
            await addTodo(newTodo);
            console.log('Todo added to server successfully');
        } catch (err) {
            console.error('添加todo失败:', err);
            setTodos(prevTodos => prevTodos.filter(todo => todo.id !== newId));
        }
    };

    const removeTodo = async (id) => {
        const todoToDelete = todos.find(todo => todo.id === id);
        
        try {
            setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
            
            await deleteTodo(id);
            console.log('Todo deleted from server successfully');
        } catch (err) {
            console.error('删除todo失败:', err);
            if (todoToDelete) {
                setTodos(prevTodos => [...prevTodos, todoToDelete]);
            }
        }
    };

    const updateTodoItem = async (id, todoData) => {
        const originalTodo = todos.find(todo => todo.id === id);
        
        try {
            setTodos(prevTodos => 
                prevTodos.map(todo => 
                    todo.id === id ? { ...todo, ...todoData } : todo
                )
            );
            
            await updateTodo(id, todoData);
            console.log('Todo updated on server successfully');
        } catch (err) {
            console.error('更新todo失败:', err);
            if (originalTodo) {
                setTodos(prevTodos => 
                    prevTodos.map(todo => 
                        todo.id === id ? originalTodo : todo
                    )
                );
            }
        }
    };

    useEffect(() => {
        loadTodos();
    }, [loadTodos]);

    return {
        todos,
        loading,
        addTodo: addTodoItem,
        removeTodo,
        updateTodo: updateTodoItem,
        loadTodos
    };
};
