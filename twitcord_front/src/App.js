<<<<<<< HEAD
/* eslint-disable */
import React from "react";
import EditProfile from "./Components/EditProfile/EditProfile";

function App() {
  return <EditProfile />;
=======
/* eslint-disable require-jsdoc */
import React from 'react';
import LogIn from './Components/LogIn/LogIn.js';
import SignUp from './Components/SignUp/SignUp.js';
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
            <Route exact path="/signup" component={SignUp} />
          </div>
        </BrowserRouter>
      </div>
    </Provider>
  );
>>>>>>> 9308cec00155e16d08cedbdb2508e1a9cf26e28e
}

export default App;
