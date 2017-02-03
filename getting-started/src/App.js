import React from 'react';
import { createStore } from 'redux';

import './App.css';

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false,
        },
      ];
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

const incrementCounter = (list, index) => {
  return [
    ...list.slice(0, index),
    list[index] + 1,
    ...list.slice(index + 1),
  ];
}

const toggleTodo = (todo) => {
  return {
    ...todo,
    completed: !todo.completed,
  }
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
  toggleTodo,
  todos,
};
export default App;
