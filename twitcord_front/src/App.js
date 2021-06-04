import React from 'react';
import {Provider} from 'react-redux';
import store from './redux/store.js';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import LogIn from './Components/LogIn/LogIn.js';
import SignUp from './Components/SignUp/SignUp.js';
import HomePage from './Components/HomePage/HomePage.js';
import Search from './Components/Search/Search.js';
import {useSelector} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import EditProfile from './Components/EditProfile/EditProfile.js';
import SideDrawer from './Components/SideDrawer/SideDrawer';
import RoomList from './Components/Room/RoomList/RoomList';
import Profile from './Components/Profile/Profile.js';
import Chat from './Components/Chat/Chat.js';

// eslint-disable-next-line require-jsdoc
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
                <Route exact path="/search" component={Search} />
                <Route exact path="/homepage" component={HomePage} />
                <Route exact path="/login" component={LogIn} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/profile/:id" component={Profile} />
                <Route exact path="/edit-profile" component={EditProfile} />
                <Route exact path="/chat" component={Chat} />
                <Route exact path="/room" component={RoomList} />
              </div>
            </div>
          </Grid>
          {sideDrawerEnable && <Grid
            item
            xs={12}
            lg={3}
            style={{height: windowHeight}}
            className="hp-side-right">
          </Grid>}
        </Grid>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
