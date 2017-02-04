import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp, { store } from './App';
import './index.css';

const render = () => {
  ReactDOM.render(
    <TodoApp
      {...store.getState()}
    />,
    document.getElementById('root')
  );
};

store.subscribe(render);
render();
