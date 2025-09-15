import React, { useContext } from "react";
import { TodoContext } from "../contexts/TodoContext";
import "./TodoList.css";
import TodoGroup from "./TodoGroup";
import { TodoGenerator } from "./TodoGenerator";

const TodoList = () => {
  const { todos, loading } = useContext(TodoContext);

  if (loading) {
    return <div className="todo-group">Loading...</div>;
  }

  return (
    <div className="todo-list">
      <h1 className="todo-title">Todo List</h1>
      <TodoGenerator />

      {/* Show message when no todos */}
      {todos.length === 0 && (
        <p className="empty-message">Add the thing you need to do today...</p>
      )}
      <TodoGroup />
    </div>
  );
};

export default TodoList;
