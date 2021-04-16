/* eslint-disable require-jsdoc */
import React from 'react';
// import LogIn from './components/LogIn/LogIn.js';
import SignUp from './components/SignUp/SignUp.js';
import {Provider} from 'react-redux';
import store from './redux/store.ts';
// import {BrowserRouter, Route} from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <SignUp></SignUp>
        {/* <BrowserRouter>
        <div>
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/SignUp" component={SignUp} />
        </div>
      </BrowserRouter> */}
      </div>
    </Provider>
  );
}

export default App;
