// @flow

import React from 'react';
import { createStore } from 'redux';

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
      return {
        ...state,
        completed: !state.completed,
      };
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action),
      ];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT': return state + 1;
    case 'DECREMENT': return state - 1;
    default: return state;
  }
};
const store = createStore(counter);

const Counter = ({
  value,
  onIncrement,
  onDecrement,
}) => (
  <div>
    <h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
);

const addCounter = (list) => {
  return list.concat(0);
};

const removeCounter = (list, index) => {
  return [
    ...list.slice(0, index),
    ...list.slice(index + 1)
  ];
};

const incrementCounter = (list, index: number) => {
  return [
    ...list.slice(0, index),
    list[index] + 1,
    ...list.slice(index + 1),
  ];
}

const App = () => {
  return (
    <div className="app">
      <Counter
        value={store.getState()}
        onIncrement={() => {
          store.dispatch({
            type: 'INCREMENT',
          })
        }}
        onDecrement={() => {
          store.dispatch({
            type: 'DECREMENT',
          })
        }}
      />
    </div>
  );
}

export {
  addCounter,
  removeCounter,
  incrementCounter,
  todos,
};
export default App;
