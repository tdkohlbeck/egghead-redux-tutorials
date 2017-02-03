import React from 'react';
import ReactDOM from 'react-dom';
import App, { addCounter } from './App';
import deepFreeze from 'deep-freeze';

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

    //deepFreeze(listBefore);

    expect(
      addCounter(listBefore)
    ).toEqual(listAfter);
  });
});
