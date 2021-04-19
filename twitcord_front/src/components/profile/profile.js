import React from 'react';
import ProfileUserinfo from '../ProfileUserinfo/ProfileUserinfo';
import './profile.css';
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
