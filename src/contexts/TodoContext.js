import {createContext} from "react";

export const TodoContext = createContext({
  todos: [],
  loading: false,
  addTodo: () => {},
  removeTodo: () => {},
  updateTodo: () => {},
  loadTodos: () => {}
});