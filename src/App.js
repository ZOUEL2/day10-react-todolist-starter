import { useReducer } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import { initialState, todoReducer } from "./reducers/todoReducer";
import { TodoContext } from "./contexts/TodoContext";
import { NavLink, Outlet, RouterProvider, createBrowserRouter} from "react-router";

function DefaultLayer() {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
              <NavLink to={"/todolist"}>TODO List</NavLink>
            </li>
            <li>
              <NavLink to={"/about"}>About</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <h1>XXX</h1>
        <Outlet></Outlet>
      </main>
      <footer>footer @copyright</footer>
    </>
  );
}

function ErrorPage() {
  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
    </div>
  );
}

const routes = [
  {
    path: "/",
    element: <DefaultLayer />,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "",
        element: <h1>Home Page </h1>,
      },
      {
        path: "todolist",
        element: <TodoList />,
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
