import {
  RouterProvider,
  createBrowserRouter,
  useParams,
} from "react-router";
import { DefaultLayer } from "./_layouts/Layout";
import "./App.css";
import TodoList from "./components/TodoList";
import { TodoContext } from "./contexts/TodoContext";
import { useTodoService } from "./hooks/useTodoService";



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
  const todoService = useTodoService();

  return (
    <div className="App">
      <TodoContext.Provider value={todoService}>
        <RouterProvider router={router} />
      </TodoContext.Provider>
    </div>
  );
}

export default App;
