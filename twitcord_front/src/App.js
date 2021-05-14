/* eslint-disable */
import React from 'react';
import ProfileTweetlist from './Components/ProfileTweetlist/ProfileTweetlist.js';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import LogIn from './Components/LogIn/LogIn.js';
import SignUp from './Components/SignUp/SignUp.js';
import HomePage from './Components/HomePage/HomePage.js';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Search from './Components/Search/Search.js';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import EditProfile from './Components/EditProfile/EditProfile.js';
import SideDrawer from './Components/HomePage/SideDrawer/SideDrawer.js';
import Profile from './Components/profile/Profile.js';
/* eslint-disable */



function App() {
  const windowHeight = window['innerHeight'];
  const sideDrawerEnable = useSelector((state) => state).tweet.sideDrawerEnable;

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Grid container className="hp-container">
          {sideDrawerEnable && <Grid item xs={4} className="hp-side-left">
            <SideDrawer />
          </Grid>}
          <Grid item xs>
            <div className="App">
              <div>
                <Route exact path="/" render={() =>
                  (<Redirect to="/homepage" />)} />
                <Route exact path="/tweets" component={ProfileTweetlist} />
                <Route exact path="/search" component={Search} />
                <Route exact path="/homepage" component={HomePage} />
                <Route exact path="/login" component={LogIn} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/edit-profile" component={EditProfile} />
              </div>
            </div>
          </Grid>
          {sideDrawerEnable && <Grid
            item
            xs={12}
            lg={3}
            style={{ height: windowHeight }}
            className="hp-side-right">
          </Grid>}
        </Grid>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
