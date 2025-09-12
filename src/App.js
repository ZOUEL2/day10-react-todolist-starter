import { useReducer } from "react";
import './App.css';
import TodoList from "./components/TodoList";
import { initialState, todoReducer } from "./reducers/todoReducer";
import { TodoContext } from "./contexts/TodoContext";

function App() {
  // the Hooks API manage component data state
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const value = {state, dispatch};

  return (
    <div className="App">
      <TodoContext.Provider value={{value}}>
        <TodoList/>
      </TodoContext.Provider>
    </div>
  );
}

export default App;
