import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp, { store } from './App';
import './index.css';

const render = () => {
  ReactDOM.render(
    <TodoApp
      todos={store.getState().todos}
    />,
    document.getElementById('root')
  );
};

store.subscribe(render);
render();
