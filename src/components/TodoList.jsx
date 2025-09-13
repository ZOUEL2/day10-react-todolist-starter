import { useContext, useState } from "react";
import { TodoContext } from "../contexts/TodoContext";
import "./TodoList.css";

const TodoList = () => {
  const { state, dispatch } = useContext(TodoContext);
  const [newTodoText, setNewTodoText] = useState("");

  function toggleDone(id) {
    dispatch({ type: "DONE", id: id });
  }

  function addTodo() {
    if (newTodoText.trim()) {
      const newId = Math.max(...state.map(todo => todo.id), 0) + 1;
      dispatch({ 
        type: "ADD", 
        id: newId, 
        text: newTodoText.trim() 
      });
      setNewTodoText("");
    }
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      addTodo();
    }
  }

  if (!state) {
    return <div className="todo-group">Loading...</div>;
  }

  return (
    <div className={"todo-group"}>
      <div>This is the TodoList Component.</div>
      
      {/* Add new todo input */}
      <div className="add-todo">
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter new todo..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
      
      {state.map(({ id, text, done }) => {
        return (
          <div
            key={id}
            className={`todo-item ${done ? "done" : ""}`}
            onClick={() => toggleDone(id)}
          >
            {text}
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
