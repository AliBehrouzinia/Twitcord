/* eslint-disable require-jsdoc */
import React from 'react';
import LogIn from './Components/LogIn/LogIn.js';
import SignUp from './Components/SignUp/SignUp.js';
import HomePage from './Components/HomePage/HomePage.js';
import {Provider} from 'react-redux';
import store from './redux/store.js';
import {BrowserRouter, Route} from 'react-router-dom';
import Profile from './Components/Profile/Profile.js';
import Search from './Components/Search/Search.js';
import Grid from '@material-ui/core/Grid';
import EditProfile from './Components/EditProfile/EditProfile.js';
import SideDrawer from './Components/HomePage/SideDrawer/SideDrawer.js';

function App() {
  const windowHeight = window['innerHeight'];

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Grid container className="hp-container">
          <Grid item xs={4} className="hp-side-left">
            <SideDrawer />
          </Grid>
          <Grid item xs>
            <div className="App">
              <div>
                <Route exact path="/search" component={Search} />
                <Route exact path="/homepage" component={HomePage} />
                <Route exact path="/login" component={LogIn} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/notification" component={EditProfile} />
              </div>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            lg={3}
            style={{height: windowHeight}}
            className="hp-side-right">
          </Grid>
        </Grid>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
