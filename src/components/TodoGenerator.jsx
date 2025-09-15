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
        <div className="add-todo">
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter new todo..."
                className="todo-input"
            />
            <button type="submit" className="add-btn" onClick={handleSubmit}>
                Add
            </button>
        </div>
    );
};
