/* eslint-disable max-len */
import React from 'react';
import ProfileUserinfo from '../ProfileUserinfo/ProfileUserinfo';
import ProfileTweetlist from '../ProfileTweetlist/ProfileTweetlist';
import * as Actions from '../../redux/Actions/index.js';
// import {useStore} from 'react-redux';
import './Profile.css';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
const Profile = () => {
  const dispatch = useDispatch();
  // const store = useStore();
  return (
    <div className = "profile">
      <div className = "profile_info">
        <ProfileUserinfo>
        </ProfileUserinfo>
        <div className= "info3">
          <button className="button-tweet"
            id='1' onClick={() => dispatch(Actions.setcomponentid(1))}>tweets</button>
          <button className="button"
            id='2' onClick={() => dispatch(Actions.setcomponentid(2))}>replys</button>
          <button className="button"
            id='3' onClick={() => dispatch(Actions.setcomponentid(3))}>likes</button>
          <button className="button-rooms"
            id='4' onClick={() => dispatch(Actions.setcomponentid(4))}>rooms</button>
        </div>
      </div>
      <div className ="profiletabs">
        <ProfileTweetlist/>
      </div>
    </div>
  );
};
Profile.propTypes = {
  componentid: PropTypes.number,
};
export default Profile;
