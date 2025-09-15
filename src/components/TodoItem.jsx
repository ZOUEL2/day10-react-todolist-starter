import { EditOutlined, DeleteOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Input, Modal, Button, Typography, Space, Tooltip, Card } from 'antd';
import { useContext, useState, useRef, useEffect } from 'react';
import { TodoContext } from '../contexts/TodoContext';

const { Text } = Typography;

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
            <Card 
                size="small" 
                className={`todo-item-card ${todo.done ? 'done' : ''}`}
                style={{
                    marginBottom: 8,
                    transition: 'all 0.3s ease',
                    opacity: todo.done ? 0.7 : 1,
                    borderLeft: todo.done ? '4px solid #52c41a' : '4px solid #1890ff'
                }}
                bodyStyle={{ padding: '12px 16px' }}
                hoverable={!isEditing}
            >
                {isEditing ? (
                    <Space.Compact style={{ width: '100%' }}>
                        <Input
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onKeyDown={handleKeyPress}
                            onBlur={handleSaveInline}
                            autoFocus
                            placeholder="请输入任务内容"
                            style={{ flex: 1 }}
                        />
                        <Tooltip title="保存">
                            <Button 
                                type="primary" 
                                icon={<CheckOutlined />} 
                                onClick={handleSaveInline}
                                size="small"
                            />
                        </Tooltip>
                        <Tooltip title="取消">
                            <Button 
                                icon={<CloseOutlined />} 
                                onClick={handleCancelInline}
                                size="small"
                            />
                        </Tooltip>
                    </Space.Compact>
                ) : (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Tooltip title="单击切换完成状态，双击编辑">
                            <Text
                                delete={todo.done}
                                type={todo.done ? 'secondary' : undefined}
                                onClick={handleSingleClick}
                                onDoubleClick={handleDoubleClick}
                                style={{
                                    flex: 1,
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    userSelect: 'none',
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                    transition: 'background-color 0.2s'
                                }}
                                className="todo-text-hover"
                            >
                                {todo.text}
                            </Text>
                        </Tooltip>
                        <Space size="small">
                            {!todo.done && (
                                <Tooltip title="编辑任务">
                                    <Button 
                                        type="text" 
                                        icon={<EditOutlined />} 
                                        size="small"
                                        onClick={handleEdit}
                                        style={{ color: '#52c41a' }}
                                    />
                                </Tooltip>
                            )}
                            <Tooltip title="删除任务">
                                <Button 
                                    type="text" 
                                    icon={<DeleteOutlined />} 
                                    size="small"
                                    onClick={handleDelete}
                                    danger
                                />
                            </Tooltip>
                        </Space>
                    </div>
                )}
            </Card>

            <Modal
                title={
                    <Space>
                        <EditOutlined />
                        编辑任务
                    </Space>
                }
                open={modalVisible}
                onOk={handleSaveModal}
                onCancel={handleCancelModal}
                okText="保存"
                cancelText="取消"
                destroyOnClose={true}
                okButtonProps={{ icon: <CheckOutlined /> }}
                cancelButtonProps={{ icon: <CloseOutlined /> }}
            >
                <Input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    placeholder="请输入任务内容"
                    onPressEnter={handleSaveModal}
                    size="large"
                />
            </Modal>
        </>
    );
};
