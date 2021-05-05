import React, {useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import './ProfileUserinfo.css';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import image from '../../assets/image.png';
import * as API from '../../Utils/API/index';
import PropTypes from 'prop-types';
import * as Actions from '../../redux/Actions/index.js';
import * as Constants from '../../Utils/Constants.js';
import {useState} from 'react';
const ProfileUserinfo = () => {
  const dispatch = useDispatch();
  const [profilemail, setprofilemail] = useState('');
  const profileInfo = useSelector((state) => state).tweet.profileInfo;
  const userGeneralInfo = JSON.parse(localStorage.getItem(Constants.GENERAL_USER_INFO));
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
    API.profileinfo({id: 1})
        .then((response) => {
          dispatch(Actions.setProfileInfo(response.data));
        })
        .catch((error) => {
          console.log('failed to load data');
        });
  }, []);
  const date = new Date(profileInfo.date_joined);
  const year = date.getFullYear();
  const month = date.getMonth()+1;
  const dt = date.getDate();
  return (
    <Grid className="user-info" >
      <Grid container direction="column">
        <Grid item className="grid-item">
          <img src={image} alt="img" className="profile_cover" />
          <Avatar className="avatar" />
        </Grid>
      </Grid>
      <div className="info-buttom">
      
      <div container className="grid-info">
        <div className="info1">
          <text className="grid-username" > user
            {profileInfo.username}
          </text>
          <text className="grid-bio" >
            {profileInfo.bio}
          </text>
          <text className="grid-joined" > joined
            { '    '+dt + '    ' + monthNumberToLabelMap[month] + '    ' + year}
          </text>
        </div>
        <div className = "info2">
          <text className = "followers" > followers {' '} 0
            {/* {store.getState().tweet.profileInfo.followers} */}
          </text>
          <text className = "followings" > followings {' '}0
            {/* {store.getState().tweet.profileInfo.followings} */}
          </text>
        </div>
      </div>
      <div className="button-edit">
      { userGeneralInfo.email === profileInfo.email ? (
            <button className="edit-button">edit profile</button>
          ) : (
            <button className="edit-button">follow</button>
          )}
      </div>
      </div>
    </Grid>
  );
};

// eslint-disable-next-line no-unused-vars
const handleFormValidationResults = (values) => {
  if (values.name == null && values.website == null) {
    alert;
  }
};
ProfileUserinfo.propTypes = {
  username: PropTypes.string,
  bio: PropTypes.string,
  joinedat: PropTypes.string,
  followers: PropTypes.number,
  followings: PropTypes.number,
};

export default ProfileUserinfo;
