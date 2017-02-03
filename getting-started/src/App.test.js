import React from 'react';
import ReactDOM from 'react-dom';
import deepFreeze from 'deep-freeze';

import App, {
  addCounter,
  removeCounter,
  incrementCounter,
  toggleTodo,
} from './App';

describe('the app', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });
});

describe('addCounter', () => {
  it('pushes a zero onto the list', () => {
    const listBefore = [];
    const listAfter = [0];

    deepFreeze(listBefore);

    expect(
      addCounter(listBefore)
    ).toEqual(listAfter);
  });
});

describe('removeCounter', () => {
  it('removes counters', () => {
    const listBefore = [0, 10, 20];
    const listAfter = [0, 20];

    deepFreeze(listBefore);

    expect(
      removeCounter(listBefore, 1)
    ).toEqual(listAfter);
  });
});

describe('incrementCounter', () => {
  it('increments a counter', () => {
    const listBefore = [0, 10, 20];
    const listAfter = [0, 11, 20];

    deepFreeze(listBefore);

    expect(
      incrementCounter(listBefore, 1)
    ).toEqual(listAfter);
  });
});

describe('toggleTodo', () => {
  it('toggles a todo', () => {
    const todoBefore = {
      id: 0,
      text: 'Learn Redux',
      completed: false,
    };
    const todoAfter = {
      id: 0,
      text: 'Learn Redux',
      completed: true,
    };

    deepFreeze(todoBefore);

    expect(toggleTodo(todoBefore)).toEqual(todoAfter);
  });
});
