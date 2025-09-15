import { useReducer } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import { initialState, todoReducer } from "./reducers/todoReducer";
import { TodoContext } from "./contexts/TodoContext";
import { DefaultLayer } from "./_layouts/Layout";
import {
  RouterProvider,
  createBrowserRouter,
  useParams,
} from "react-router";



function ErrorPage() {
  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
    </div>
  );
}

function TodoDetail() {
  const params = useParams();
  return (
    <div>
      <h1>Todo Detail Page - ID: {params.id}</h1>
      <p>Details about a specific todo will be shown here.</p>
    </div>
  );
}

const routes = [
  {
    path: "/",
    element: <DefaultLayer />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <h1>Home Page </h1>,
      },
      {
        path: "todos",
        element: <TodoList />,
      },
      {
        path: "todos/:id",
        element: <TodoDetail />,
      },
      {
        path: "about",
        element: <h1>About Us </h1>,
      },
    ],
  },
];
const router = createBrowserRouter(routes);

function App() {
  // the Hooks API manage component data state
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const value = { state, dispatch };

  return (
    <div className="App">
      <TodoContext.Provider value={value}>
        <RouterProvider router={router} />
        {/* <TodoList/> */}
      </TodoContext.Provider>
    </div>
  );
}

export default App;
