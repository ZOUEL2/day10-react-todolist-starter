import { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { TodoItem } from './TodoItem';

const TodoGroup = () => {
    const { todos } = useContext(TodoContext);

    return (
        <div className="todo-items">
            {todos.map(todo => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </div>
    );
};

export default TodoGroup;
