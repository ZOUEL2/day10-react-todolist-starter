import { useState, useEffect, useCallback } from 'react';
import { message } from 'antd';
import { getTodos, addTodo, deleteTodo, updateTodo, patchTodo } from '../apis/todoApi';

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
            setTodos(prevTodos => [...prevTodos, newTodo]);
            
            const response = await addTodo(newTodo);
            console.log('Todo added to server successfully', response);
            message.success('任务添加成功！');

            if (response && response.data && response.data.id && response.data.id !== newId) {
                const serverId = response.data.id;
                setTodos(prevTodos => prevTodos.map(t => t.id === newId ? { ...t, id: serverId } : t));
            }
        } catch (err) {
            console.error('添加todo失败:', err);
            message.error('添加任务失败，请重试');
            setTodos(prevTodos => prevTodos.filter(todo => todo.id !== newId));
        }
    };

    const removeTodo = async (id) => {
        const todoToDelete = todos.find(todo => todo.id === id);
        const index = todos.findIndex(todo => todo.id === id);
        
        try {
            setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
            
            await deleteTodo(id);
            console.log('Todo deleted from server successfully');
            message.success('任务删除成功！');
        } catch (err) {
            console.error('删除todo失败:', err);
            message.error('删除任务失败，请重试');
            if (todoToDelete && index >= 0) {
                setTodos(prevTodos => {
                    const copy = [...prevTodos];
                    copy.splice(index, 0, todoToDelete);
                    return copy;
                });
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

            // 后端只支持 PATCH 修改 done 字段
            if (Object.keys(todoData).length === 1 && todoData.hasOwnProperty('done')) {
                await patchTodo(id, { done: todoData.done });
            } else {
                const updatedTodo = { ...originalTodo, ...todoData };
                await updateTodo(id, updatedTodo);
            }

            console.log('Todo updated on server successfully');

            if (todoData.hasOwnProperty('done') && todoData.hasOwnProperty('text')) {
                message.success('任务更新成功！');
            } else if (todoData.hasOwnProperty('done')) {
                message.success(todoData.done ? '任务标记为已完成！' : '任务标记为未完成！');
            } else if (todoData.hasOwnProperty('text')) {
                message.success('任务内容更新成功！');
            } else {
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
        patchTodo,
        loadTodos
    };
};
