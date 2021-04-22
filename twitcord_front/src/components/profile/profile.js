/* eslint-disable max-len */
import React from 'react';
import ProfileUserinfo from '../ProfileUserinfo/ProfileUserinfo';
import ProfileTweetlist from '../ProfileTweetlist/ProfileTweetlist';
// import {useSelector} from 'react-redux';
import './Profile.css';
import {useState} from 'react';
import PropTypes from 'prop-types';
const Profile = () => {
  const [componentid, setcomponentid] = useState('');
  return (
    <div className = "profile">
      <div className = "profile_info">
        <ProfileUserinfo>
        </ProfileUserinfo>
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
      </div>
      <div className ="profiletabs">
        {componentid === 1 ? (
            <ProfileTweetlist/>
          ) : (
            <div className = "choose">
              <div > choose a tab</div>
            </div>
          )}
      </div>
    </div>
  );
};
Profile.propTypes = {
  componentid: PropTypes.number,
};
export default Profile;
