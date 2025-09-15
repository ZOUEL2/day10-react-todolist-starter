import { useContext, useEffect, useState } from "react";
import { TodoContext } from "../contexts/TodoContext";
import "./TodoList.css";
import { getTodos, addTodo, deleteTodo, updateTodo} from "../apis/todoApi";

const TodoList = () => {
  const { state, dispatch } = useContext(TodoContext);
  const [newTodoText, setNewTodoText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        setLoading(true);
        const response = await getTodos();
        console.log("Todos loaded from server:", response.data);
        dispatch({ type: "LOAD_TODOS", todos: response.data });
      } catch (error) {
        console.error("Error loading todos:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, [dispatch]);

  function toggleDone(id) {
    updateTodo(id, { done: !state.find(todo => todo.id === id).done })
      .then((response) => {
        console.log("Todo updated on server:", response.data);
        dispatch({ type: "DONE", id: id });
      })
      .catch((error) => {
        console.error("Error updating todo:", error);
        dispatch({ type: "DONE", id: id });
      });
  }

  function handleDeleteTodo(id) {
    deleteTodo(id)
      .then((response) => {
        console.log("Todo deleted from server:", response.data);
        dispatch({ type: "DELETE", id: id });
      })
      .catch((error) => {
        console.error("Error deleting todo:", error);
        dispatch({ type: "DELETE", id: id });
      });
  }

  function handleAddTodo() {
    if (newTodoText.trim()) {
      const newId = Math.max(...state.map((todo) => todo.id), 0) + 1;
      const newTodo = {
        id: newId,
        text: newTodoText.trim(),
        done: false,
      };

      addTodo(newTodo)
        .then((response) => {
          console.log("Todo added to server:", response.data);
          dispatch({
            type: "ADD",
            id: newId,
            text: newTodoText.trim(),
          });
        })
        .catch((error) => {
          console.error("Error adding todo:", error);
          dispatch({
            type: "ADD",
            id: newId,
            text: newTodoText.trim(),
          });
        });

      setNewTodoText("");
    }
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  }

  if (!state || loading) {
    return <div className="todo-group">Loading...</div>;
  }

  return (
    <div className={"todo-group"}>
      <h1>Todo List</h1>

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
        <button onClick={handleAddTodo}>Add</button>
      </div>

      {state.map(({ id, text, done }) => {
        return (
          <div key={id} className={`todo-item ${done ? "done" : ""}`}>
            <span onClick={() => toggleDone(id)} className="todo-text">
              {text}
            </span>
            <button
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteTodo(id);
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
