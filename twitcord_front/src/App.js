/* eslint-disable require-jsdoc */
import React from 'react';
import LogIn from './Components/LogIn/LogIn.js';
import SignUp from './Components/SignUp/SignUp.js';
// import TweetBox from './Components/TweetBox/TweetBox';
import {Provider} from 'react-redux';
import store from './redux/store.js';
import {BrowserRouter, Route} from 'react-router-dom';
import Profile from './Components/Profile/Profile.js';
import EditProfile from './Components/EditProfile/EditProfile';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        {/* <SignUp></SignUp>
        <TweetBox /> */}
        <BrowserRouter>
          <div>
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
