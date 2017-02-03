import React, { Component } from 'react';
import { createStore } from 'redux';

import logo from './logo.svg';
import './App.css';

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
  list.push(0);
  return list;
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
          <h3>yey...</h3>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
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
}

export { addCounter };
export default App;
