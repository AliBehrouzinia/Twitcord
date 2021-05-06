import React from 'react';
import ProfileUserinfo from '../ProfileUserinfo/ProfileUserinfo';
import ProfileTweetlist from '../ProfileTweetlist/ProfileTweetlist';
import './Profile.css';
import {useState} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
const Profile = () => {
  const [componentid, setcomponentid] = useState('');
  return (
    <Grid container item className="grid-item">
      <Grid  xs={12} sm={10} md={8}>
        <ProfileUserinfo/>
        <div className= "info3">
          <button className="button-tweet"
            id='1' onClick={() => setcomponentid(1)}>tweets</button>
          <button className="button"
            id='2'onClick={() => setcomponentid(2)}>replys</button>
          <button className="button"
            id='3' onClick={() => setcomponentid(3)}>likes</button>
          <button className="button-rooms"
            id='4' onClick={() => setcomponentid(4)}>rooms</button>
        </div>
      </Grid>
      <Grid  xs={12} sm={10} md={8}>
        {componentid === 1 ? (
            <ProfileTweetlist/>
          ) : (
            <div className = "choose">
              <div > choose a tab</div>
            </div>
          )}
      </Grid>
    </Grid>
  );
};
Profile.propTypes = {
  componentid: PropTypes.number,
};
export default Profile;
