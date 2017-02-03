import React from 'react';
import ReactDOM from 'react-dom';
import deepFreeze from 'deep-freeze';

import App, {
  addCounter,
  removeCounter,
  incrementCounter,
  todos,
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

describe('todos reducer', () => {
  it('adds a todo', () => {
    const stateBefore = [];
    const action = {
      type: 'ADD_TODO',
      id: 0,
      text: 'yey',
    };
    const stateAfter = [
      {
        id: 0,
        text: 'yey',
        completed: false,
      },
    ];

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(todos(stateBefore, action)).toEqual(stateAfter);
  });

  it('toggles a todo', () => {
    const stateBefore = [
      {
        id: 0,
        text: 'yey',
        completed: false,
      },
      {
        id: 1,
        text: 'bravo',
        completed: false,
      },
    ];
    const action = {
      type: 'TOGGLE_TODO',
      id: 1
    };
    const stateAfter = [
      {
        id: 0,
        text: 'yey',
        completed: false,
      },
      {
        id: 1,
        text: 'bravo',
        completed: true,
      },
    ];

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(todos(stateBefore, action)).toEqual(stateAfter);
  });
});
