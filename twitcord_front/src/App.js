/* eslint-disable require-jsdoc */
import React from 'react';
import LogIn from './components/LogIn/LogIn.js';
import SignUp from './components/SignUp/SignUp.js';
// import TweetBox from './Components/TweetBox/TweetBox';
import {Provider} from 'react-redux';
import store from './redux/store.js';
import {BrowserRouter, Route} from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        {/* <SignUp></SignUp> */}
        {/* <TweetBox /> */}
        <BrowserRouter>
          <div>
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/SignUp" component={SignUp} />
          </div>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
