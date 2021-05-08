/* eslint-disable require-jsdoc */
import React from 'react';
import LogIn from './Components/LogIn/LogIn.js';
import SignUp from './Components/SignUp/SignUp.js';
<<<<<<< HEAD
import HomePage from './Components/HomePage/HomePage.js';
// import TweetBox from './Components/TweetBox/TweetBox';
=======
import TweetBox from './Components/TweetBox/TweetBox';
>>>>>>> 3428b6f1a781d9c0f2d08d8ac6565c99217ed189
import {Provider} from 'react-redux';
import store from './redux/store.js';
import {BrowserRouter, Route} from 'react-router-dom';
import Search from './Components/Search/Search.js';
import Profile from './Components/Profile/Profile.js';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        {/* <SignUp></SignUp>
        <TweetBox /> */}
        <BrowserRouter>
          <div>
<<<<<<< HEAD
            <Route exact path="/hp" component={HomePage} />
            <Route exact path="/edit-profile" component={EditProfile} />
=======
            <Route exact path="/tb" component={TweetBox} />
            <Route exact path="/search" component={Search} />
>>>>>>> 3428b6f1a781d9c0f2d08d8ac6565c99217ed189
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
