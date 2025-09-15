export const initialState = [
  { id: 1, text: "the first todo", done: false },
  { id: 2, text: "the second todo", done: false },
];

// reducer is a pure function that define and gather all state update logic
export const todoReducer = (state, action) => {
  switch (action.type) {
    case "DONE":
      return state.map((todo) => {
        if (todo.id === action.id) {
          const done = !todo.done;
          return { ...todo, done: done };
        }
        return todo;
      });
    case "ADD":
      return [...state, { id: action.id, text: action.text, done: false }];
    case "DELETE":
      return state.filter(todo => todo.id !== action.id);
    case "LOAD_TODOS":
      return action.todos || [];
    default:
      return state;
  }
};
