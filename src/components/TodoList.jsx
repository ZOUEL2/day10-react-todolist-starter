import { useContext } from "react";
import { TodoContext } from "../contexts/TodoContext";
import './TodoList.css';

const TodoList = () => {
  const { state, dispatch } = useContext(TodoContext);

  function toggleDone(id){
    dispatch({type: 'DONE', id: id});
  }

  if (!state) {
    return <div className="todo-group">Loading...</div>;
  }

  return (
    <div className={'todo-group'}>
      <div>This is the TodoList Component.</div>
      {state.map(({id,text,done}) => {
        return (
          <div
            key={id}
            className={`todo-item ${done ? 'done' : ''}`}
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
