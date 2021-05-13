/* eslint-disable */
import React, { useEffect } from 'react';;

/* eslint-disable */
// import Grid from "@material-ui/core/Grid";
// import Avatar from "@material-ui/core/Avatar";
import './ProfileUserinfo.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import image from '../../assets/image.png';
import * as API from '../../Utils/API/index';
import PropTypes from 'prop-types';
import * as Actions from '../../redux/Actions/index.js';
import * as Constants from '../../Utils/Constants.js';
import { Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid';
const ProfileUserinfo = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const profileInfo = useSelector((state) => state).tweet.profileInfo;
  let profileId = -1;
  const userGeneralInfo = JSON.parse(
    localStorage.getItem(Constants.GENERAL_USER_INFO),
  );
  if (userGeneralInfo != null) {
    profileId = userGeneralInfo.pk;
  }
  const monthNumberToLabelMap = {
    [1]: 'January',
    [2]: 'February',
    [3]: 'March',
    [4]: 'April',
    [5]: 'May',
    [6]: 'June',
    [7]: 'July',
    [8]: 'August',
    [9]: 'September',
    [10]: 'October',
    [11]: 'November',
    [12]: 'December',
  };
  useEffect(() => {
    API.getProfileInfo({ id: profileId })
      .then((response) => {
        dispatch(Actions.setProfileInfo(response.data));
      })
      .catch((error) => {
        console.log('failed to load data');
      });
  }, []);
  const date = new Date(profileInfo.date_joined);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dt = date.getDate();

  const handleEditProfileClick = () => {
    history.push('/edit-profile');
  };

  return (
    <Grid className="user-info" >
      <Grid container direction="column">
        <Grid item className="grid-item">
          <img src={image} alt="img" className="profile_cover" />
          <Avatar className="avatar" />
        </Grid>
      </Grid>
      <Grid container >
        <Grid item className="grid-info1" xs={6}>
          <Grid item className="info1">
            <Typography variant="h5" className="grid-username">
              {' '}
              {profileInfo.username}
            </Typography>
            <Typography className="grid-bio">{profileInfo.bio}</Typography>
            <Typography className="grid-joined">
              {' '}
            joined
              {'    ' + dt + '    ' +
                monthNumberToLabelMap[month] +
                '    ' + year}
            </Typography>
          </Grid>
          <Grid item className="grid-follow-container">
            <button type="followers" className="followers" >
              followers
            </button>
            <button type="followings" className="followings" >
              followings
            </button>

            <button type="requests" className="requests" >
              requests
            </button>
          </Grid>
        </Grid>
        <Grid item xs={6} className="grid-info2">
          {userGeneralInfo !== null &&
            userGeneralInfo.email === profileInfo.email ? (
            <Button
              onClick={handleEditProfileClick}
              variant="outlined"
              color="primary">
              edit profile
            </Button>
          ) : (
            <Button variant="primary" >follow</Button>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};
export default ProfileUserinfo;
