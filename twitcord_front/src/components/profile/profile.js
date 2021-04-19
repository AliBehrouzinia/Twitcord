import React from 'react';
import ProfileUserinfo from '../profile_userinfo/ProfileUserinfo';
import './Profile.css';
const Profile = () => {
  return (
    <div className = "profile">
      <div className = "profile_info">
        <ProfileUserinfo>
        </ProfileUserinfo>
      </div>
    </div>
  );
};
export default Profile;
