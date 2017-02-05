import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux';

import './App.css';

const todo = (state = {}, action) => {
  switch (action.type) {

    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false,
      };

    case 'TOGGLE_TODO':
      if (state.id !== action.id) return state;
      return { ...state,
        completed: !state.completed,
      };

    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {

    case 'ADD_TODO':
      return [ ...state,
        todo(undefined, action),
      ];

    case 'TOGGLE_TODO':
      return state.map( t => todo(t, action) );

    default:
      return state;
  }
};

const visFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VIS_FILTER': return action.filter;
    default: return state;
  }
};

const todoApp = combineReducers({
  todos,
  visFilter,
});

const store = createStore(todoApp);

let nextTodoId = 0;
const AddTodo = () => {
  let input;
  return (
    <div>
      <input ref={node => {
          input = node;
        }} />
      <button onClick={() => {
        store.dispatch({
          type: 'ADD_TODO',
          id: nextTodoId++,
          text: input.value,
        });
        input.value = '';
      }}>
        Add Todo
      </button>
    </div>
  );
};

const Todo = ({
  onClick,
  completed,
  text
  }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ?
        'line-through' :
        'none'
    }}>
    {text}
  </li>
);

const getVisTodos = (
  todos,
  filter
  ) => {
  switch (filter) {
    case 'SHOW_ALL': return todos;
    case 'SHOW_COMPLETED': return todos.filter(
      t => t.completed
    );
    case 'SHOW_ACTIVE': return todos.filter(
      t => !t.completed
    );
    default: return todos;
  }
};

const TodoList = ({
  todos,
  onTodoClick,
  }) => (
  <ul>
    {todos.map(todo =>
      <Todo
        {...todo}
        onClick={() => onTodoClick(todo.id)}
        key={todo.id}
      />
    )}
  </ul>
);

const Link = ({
  active,
  children,
  onClick,
  }) =>  {
  if (active) {
    return (<span>{children}</span>);
  }
  return (
    <a
      href='#'
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  );
};

class FilterLink extends Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    const props = this.props;
    const state = store.getState();

    return (
      <Link
        active={props.filter === state.visFilter}
        onClick={() =>
          store.dispatch({
            type: 'SET_VIS_FILTER',
            filter: props.filter,
          })
        }
      >
        {props.children}
      </Link>
    );
  }
}

const Footer = () => (
  <p>
    Show:
    {' '}
    <FilterLink
      filter='SHOW_ALL'
    >All</FilterLink>
    {', '}
    <FilterLink
      filter='SHOW_ACTIVE'
    >Active</FilterLink>
    {', '}
    <FilterLink
      filter='SHOW_COMPLETED'
    >Completed</FilterLink>
  </p>
);

class VisTodoList extends Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    //const props = this.props;
    const state = store.getState();

    return (
      <TodoList
        todos={
          getVisTodos(
            state.todos,
            state.visFilter
          )
        }
        onTodoClick={id =>
          store.dispatch({
            type: 'TOGGLE_TODO',
            id,
          })
        }
      />
    );
  }
}

const TodoApp = () => (
  <div>

    <AddTodo />
    <VisTodoList />
    <Footer />
  </div>
);

export {
  todos,
  todoApp,
  store,
};
export default TodoApp;
