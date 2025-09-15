import { PlusOutlined } from '@ant-design/icons';
import { Input, Button, Card, Space } from 'antd';
import { useContext, useState } from 'react';
import { TodoContext } from '../contexts/TodoContext';

export const TodoGenerator = () => {
    const [inputValue, setInputValue] = useState('');
    const { addTodo } = useContext(TodoContext);

    const handleSubmit = () => {
        if (inputValue && inputValue.trim()) {
            addTodo({ text: inputValue.trim(), done: false });
            setInputValue('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <Card 
            size="small" 
            style={{ 
                marginBottom: 16,
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                border: '1px solid #d9d9d9'
            }}
        >
            <Space.Compact style={{ width: '100%' }}>
                <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter new task..."
                    size="large"
                    style={{ flex: 1 }}
                    allowClear
                />
                <Button 
                    type="primary" 
                    icon={<PlusOutlined />} 
                    onClick={handleSubmit}
                    size="large"
                    disabled={!inputValue.trim()}
                >
                    ADD
                </Button>
            </Space.Compact>
        </Card>
    );
};
