import React, {useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import './ProfileUserinfo.css';
// import {useStore} from 'react-redux';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
// import dateFormat from 'dateformat';

import image from '../../assets/image.png';
import * as API from '../../Utils/API/index';
import PropTypes from 'prop-types';
// import * as Constants from '../../Utils/Constants.js';
import * as Actions from '../../redux/Actions/index.js';
const ProfileUserinfo = () => {
  // const store = useStore();
  const dispatch = useDispatch();
  const profileInfo = useSelector((state) => state).tweet.profileinfo;
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
  // const [date, setdate] = useState('');
  useEffect(() => {
    API.profileinfo({id: 1})
        .then((response) => {
          console.log(response.data);
          dispatch(Actions.setProfileInfo(response.data));
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
  }, []);
  const date = new Date(profileInfo.date_joined);
  const year = date.getFullYear();
  const month = date.getMonth()+1;
  const dt = date.getDate();
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
          <text className="grid-username" >username
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
          <text className = "followers" > followers 0
            {/* {store.getState().tweet.profileInfo.followers} */}
          </text>
          <text className = "followings" > followings 0
            {/* {store.getState().tweet.profileInfo.followings} */}
          </text>
        </div>
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
ProfileUserinfo.propTypes = {
  username: PropTypes.string,
  bio: PropTypes.string,
  joinedat: PropTypes.string,
  followers: PropTypes.number,
  followings: PropTypes.number,
};

export default ProfileUserinfo;
