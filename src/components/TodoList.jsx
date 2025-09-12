import { useContext } from "react";
import { TodoContext } from "../contexts/TodoContext";

const TodoList = () => {
  const { state, dispatch } = useContext(TodoContext);

  return (
    <div className="todo-list">
      <div>This is the TodoList Component.</div>
      {state.map((todo) => {
        return <div className="todo-item">{todo.text} </div>;
      })}
    </div>
  );
};

export default TodoList;
