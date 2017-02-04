// @flow

import React, { Component } from 'react';
import {
  createStore,
  combineReducers,
} from 'redux';

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

// same as:
//
//const todoApp = (state = {}, action) => {
//  return {
//    todos: todos(state.todos, action),
//    visFilter: visFilter(state.visFilter, action),
//  };
//};

const store = createStore(todoApp);

const FilterLink = ({
  currFilter,
  filter,
  children
}) =>  { // href='#' -> e.preventDefault() ?
  if (filter === currFilter) {
    return (<span>{children}</span>);
  }
  return (
    <a
      href='#'
      onClick={e => {
        e.preventDefault();
        store.dispatch({
          type: 'SET_VIS_FILTER',
          filter,
        })
      }}
    >
      {children}
    </a>
  );
};

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

let nextTodoId = 0;
class TodoApp extends Component {
  render() {
    const {
      todos,
      visFilter
    } = this.props;
    const visTodos = getVisTodos(
      todos,
      visFilter,
    );
    console.log(visTodos);
    return (
      <div>
        <input ref={node => {
            this.input = node;
          }} />
        <button onClick={() => {
            store.dispatch({
              type: 'ADD_TODO',
              text: this.input.value,
              id: nextTodoId++,
            });
            this.input.value = '';
          }}>
          Add Todo
        </button>
        <ul>
          {visTodos.map(todo =>
            <li
              key={todo.id}
              onClick={() => {
                store.dispatch({
                  type: 'TOGGLE_TODO',
                  id: todo.id,
                });
              }}
              style={{
                textDecoration: todo.completed ?
                  'line-through' :
                  'none'
              }}>
              {todo.text}
            </li>
          )}
        </ul>
        <p>
          Show:
          {' '}
          <FilterLink
            filter='SHOW_ALL'
            currFilter={visFilter}
          > All </FilterLink>
          {' '}
          <FilterLink
            filter='SHOW_ACTIVE'
            currFilter={visFilter}
          > Active </FilterLink>
          {' '}
          <FilterLink
            filter='SHOW_COMPLETED'
            currFilter={visFilter}
          > Completed </FilterLink>
        </p>
      </div>
    )
  }
}

export {
  todos,
  todoApp,
  store,
};
export default TodoApp;
