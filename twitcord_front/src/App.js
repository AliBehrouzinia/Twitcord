/* eslint-disable require-jsdoc */
import React from 'react';
import LogIn from './Components/LogIn/LogIn.js';
import SignUp from './Components/SignUp/SignUp.js';
// import TweetBox from './Components/TweetBox/TweetBox';
import {Provider} from 'react-redux';
import store from './redux/store.js';
import {BrowserRouter, Route} from 'react-router-dom';
<<<<<<< HEAD
import {UserSearchItem} from './Components/UserSearchItem/UserSearchItem.js';
import {SearchBar} from './Components/SearchBar/SearchBar.js';
import {Search} from './Components/Search/Search.js';
=======
import EditProfile from './Components/EditProfile/EditProfile';
>>>>>>> c561fe336b74d07327206e2930b781daada91765

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        {/* <SignUp></SignUp> */}
        {/* <TweetBox /> */}
        <BrowserRouter>
          <div>
<<<<<<< HEAD
            <Route exact path="/usi" component={UserSearchItem} />
            <Route exact path="/sb" component={SearchBar} />
            <Route exact path="/search" component={Search} />
=======
            <Route exact path="/edit-profile" component={EditProfile} />
>>>>>>> c561fe336b74d07327206e2930b781daada91765
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/signup" component={SignUp} />
          </div>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
