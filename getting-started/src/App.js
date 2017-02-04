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

let nextTodoId = 0;
class TodoApp extends Component {
  render() {
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
          {this.props.todos.map(todo =>
              <li key={todo.id}>
                {todo.text}
              </li>
          )}
        </ul>
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
