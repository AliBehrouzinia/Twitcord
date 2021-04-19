import React from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import './ProfileUserinfo.css';
import {useStore} from 'react-redux';
import {useDispatch} from 'react-redux';
import image from '../../assets/image.png';
import * as API from '../../Utils/API/index';
// import PropTypes from 'prop-types';
// import * as Constants from '../../Utils/Constants.js';
import * as Actions from '../../redux/Actions/index.js';
const ProfileUserinfo = () => {
  const store = useStore();
  const dispatch = useDispatch();
  API.profileInfo()
      .then((response) => {
        dispatch(Actions.setProfileInfo(response));
        dispatch(
            Actions.setSnackBarState({
              isSnackbarOpen: true,
            }),
        );
      })
      .catch((error) => {
        dispatch(
            Actions.setSnackBarState({
              isSnackbarOpen: true,
            }),
        );
      });
  return (
    <div className="user-info">
      <Grid container direction="column">
        <Grid item className="grid-item" >
          <img src={image} alt="img" className="profile_cover" />
          <Avatar className="avatar" />
        </Grid>
      </Grid>
      <div className="button-edit">
        <button className="edit-button">edit profile</button>
      </div>
      <div container className="grid-info">
        <div className="info1">
          <text className="grid-username" >
            {store.getState().tweet.profileInfo.username}
          </text>
          <text className="grid-bio" >
            {store.getState().tweet.profileInfo.bio}
          </text>
          <text className="grid-joined" >
            {store.getState().tweet.profileInfo.joinedat}
          </text>
        </div>
        <div className = "info2">
          <text className = "followers" > followers
            {store.getState().tweet.profileInfo.followers}
          </text>
          <text className = "followings" > followings
            {store.getState().tweet.profileInfo.followings}
          </text>
        </div>
      </div>
      <div className= "info3">
        <button className="button">tweets</button>
        <button className="button">replys</button>
        <button className="button">likes</button>
        <button className="button">rooms</button>
      </div>
    </div>
  );
};

// eslint-disable-next-line no-unused-vars
const handleFormValidationResults = (values) => {
  if (values.name == null && values.website == null) {
    alert;
  }
};

export default ProfileUserinfo;
