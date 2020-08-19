import React, { useEffect, useCallback } from 'react';
import axios from 'axios';

import logo from './logo.svg';
import './App.css';

function App() {
  useEffect(async () => {
    const response = await axios.get('/api/test-with-current-user');
    console.log('make api request', response);
  }, []);

  const onMakeApiRequest = useCallback(async () => {
    const response = await axios.get('/api/test-with-current-user');
    console.log('make api request', response);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <button onClick={onMakeApiRequest}>Make api request</button>
    </div>
  );
}

export default App;
