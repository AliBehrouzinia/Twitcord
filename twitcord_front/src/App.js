/* eslint-disable require-jsdoc */
import React from 'react';
import LogIn from './Components/LogIn/LogIn.js';
import SignUp from './Components/SignUp/SignUp.js';
import HomePage from './Components/HomePage/HomePage.js';
import {Provider} from 'react-redux';
import store from './redux/store.js';
import {BrowserRouter, Route} from 'react-router-dom';
import Profile from './Components/Profile/Profile.js';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        {/* <SignUp></SignUp>
        <TweetBox /> */}
        <BrowserRouter>
          <div>
            <Route exact path="/hp" component={HomePage} />
            <Route exact path="/edit-profile" component={EditProfile} />
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/profile" component={Profile} />
          </div>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
