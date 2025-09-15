import { EditOutlined } from '@ant-design/icons';
import { Input, Modal } from 'antd';
import { useContext, useState, useRef, useEffect } from 'react';
import { TodoContext } from '../contexts/TodoContext';

export const TodoItem = ({ todo }) => {
    const { updateTodo, removeTodo } = useContext(TodoContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);
    const [modalVisible, setModalVisible] = useState(false);
    const clickTimeoutRef = useRef(null);
    
    // 组件卸载时清理定时器
    useEffect(() => {
        return () => {
            if (clickTimeoutRef.current) {
                clearTimeout(clickTimeoutRef.current);
            }
        };
    }, []);
    
    const handleToggle = () => {
        updateTodo(todo.id, { done: !todo.done });
    };

    const handleSingleClick = () => {
        // 清除之前的定时器
        if (clickTimeoutRef.current) {
            clearTimeout(clickTimeoutRef.current);
        }
        
        // 设置延迟执行单击，给双击事件留出时间
        clickTimeoutRef.current = setTimeout(() => {
            // 只有在非编辑状态下才执行切换
            if (!isEditing) {
                handleToggle();
            }
        }, 300);
    };

    const handleDoubleClick = () => {
        // 立即清除单击的延迟执行
        if (clickTimeoutRef.current) {
            clearTimeout(clickTimeoutRef.current);
            clickTimeoutRef.current = null;
        }
        
        // 只有未完成的任务可以编辑
        if (!todo.done) {
            setEditText(todo.text);
            setIsEditing(true);
        }
    };
    
    const handleDelete = (e) => {
        e.stopPropagation();
        removeTodo(todo.id);
    };

    const handleEdit = (e) => {
        e.stopPropagation();
        setEditText(todo.text);
        setModalVisible(true);
    };

    const handleSaveInline = () => {
        if (editText.trim() && editText.trim() !== todo.text) {
            updateTodo(todo.id, { text: editText.trim() });
        }
        setIsEditing(false);
    };

    const handleCancelInline = () => {
        setEditText(todo.text); // 恢复原始文本
        setIsEditing(false);
    };

    const handleSaveModal = () => {
        if (editText.trim() && editText.trim() !== todo.text) {
            updateTodo(todo.id, { text: editText.trim() });
        }
        setModalVisible(false);
    };

    const handleCancelModal = () => {
        setEditText(todo.text); 
        setModalVisible(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSaveInline();
        } else if (e.key === 'Escape') {
            handleCancelInline();
        }
    };
    
    return (
        <>
            <div className={`todo-item ${todo.done ? 'done' : ''}`}>
                {isEditing ? (
                    <div className="edit-inline">
                        <Input
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onKeyDown={handleKeyPress}
                            onBlur={handleSaveInline}
                            autoFocus
                            className="edit-input"
                        />
                        <div className="edit-buttons">
                            <button className="save-btn" onClick={handleSaveInline}>
                                ✓
                            </button>
                            <button className="cancel-btn" onClick={handleCancelInline}>
                                ✕
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <span 
                            className="todo-text"
                            onClick={handleSingleClick}
                            onDoubleClick={handleDoubleClick}
                            title="单击切换完成状态，双击编辑"
                        >
                            {todo.text}
                        </span>
                        <div className="action-buttons">
                            {!todo.done && (
                                <button 
                                    className="edit-btn"
                                    onClick={handleEdit}
                                    title="编辑"
                                >
                                    <EditOutlined />
                                </button>
                            )}
                            <button 
                                className="delete-btn"
                                onClick={handleDelete}
                                title="删除"
                            >
                                ×
                            </button>
                        </div>
                    </>
                )}
            </div>

            <Modal
                title="编辑任务"
                open={modalVisible}
                onOk={handleSaveModal}
                onCancel={handleCancelModal}
                okText="保存"
                cancelText="取消"
                destroyOnClose={true}
            >
                <Input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    placeholder="请输入任务内容"
                    onPressEnter={handleSaveModal}
                />
            </Modal>
        </>
    );
};
