/* eslint-disable require-jsdoc */
import React from 'react';
import Login from './components/Login.tsx';
import SignUp from './components/SignUp.tsx';
import {BrowserRouter, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
      <BrowserRouter>
        <div>
          <Route exact path="/login" component={Login} />
          <Route exact path="/SignUp" component={SignUp} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
