import { useState, useEffect, useCallback } from 'react';
import { message } from 'antd';
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
            if (response.data.length > 0) {
                message.success(`成功加载 ${response.data.length} 个任务`);
            }
        } catch (err) {
            console.error('加载todos失败:', err);
            message.error('加载任务失败，请检查网络连接');
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
            // 乐观更新
            setTodos(prevTodos => [...prevTodos, newTodo]);
            
            await addTodo(newTodo);
            console.log('Todo added to server successfully');
            message.success('任务添加成功！');
        } catch (err) {
            console.error('添加todo失败:', err);
            message.error('添加任务失败，请重试');
            setTodos(prevTodos => prevTodos.filter(todo => todo.id !== newId));
        }
    };

    const removeTodo = async (id) => {
        const todoToDelete = todos.find(todo => todo.id === id);
        
        try {
            setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
            
            await deleteTodo(id);
            console.log('Todo deleted from server successfully');
            message.success('任务删除成功！');
        } catch (err) {
            console.error('删除todo失败:', err);
            message.error('删除任务失败，请重试');
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
            
            if (todoData.hasOwnProperty('done') && todoData.hasOwnProperty('text')) {
                // 同时更新了完成状态和文本内容
                message.success('任务更新成功！');
            } else if (todoData.hasOwnProperty('done')) {
                // 只更新了完成状态
                message.success(todoData.done ? '任务标记为已完成！' : '任务标记为未完成！');
            } else if (todoData.hasOwnProperty('text')) {
                // 只更新了文本内容
                message.success('任务内容更新成功！');
            } else {
                // 其他更新
                message.success('任务更新成功！');
            }
        } catch (err) {
            console.error('更新todo失败:', err);
            message.error('更新任务失败，请重试');
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
