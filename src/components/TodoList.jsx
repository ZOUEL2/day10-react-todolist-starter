import { useContext, useState } from "react";
import { TodoContext } from "../contexts/TodoContext";
import "./TodoList.css";

const TodoList = () => {
  const { state, dispatch } = useContext(TodoContext);
  const [newTodoText, setNewTodoText] = useState("");

  function toggleDone(id) {
    dispatch({ type: "DONE", id: id });
  }

  function deleteTodo(id) {
    dispatch({ type: "DELETE", id: id });
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
      <h1>Todo  List</h1>
      
      {/* Show message when no todos */}
      {state.length === 0 && (
        <p className="empty-message">Add the thing you need to do today...</p>
      )}
      
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
          >
            <span onClick={() => toggleDone(id)} className="todo-text">
              {text}
            </span>
            <button 
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                deleteTodo(id);
              }}
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
