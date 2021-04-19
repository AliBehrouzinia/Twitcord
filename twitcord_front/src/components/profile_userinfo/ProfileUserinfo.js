import React from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import './ProfileUserinfo.css';
import image from '../../assets/image.png';
const ProfileUserinfo = () => {
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
          <text className="grid-username" >username</text>
          <text className="grid-bio" >bio</text>
          <text className="grid-joined" >joined at</text>
        </div>
        <div className = "info2">
          <text className = "followers" > followers 0</text>
          <text className = "followings" > followings 0</text>
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
