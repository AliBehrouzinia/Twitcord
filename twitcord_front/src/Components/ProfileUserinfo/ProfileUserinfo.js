import React, {useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import './ProfileUserinfo.css';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import image from '../../assets/image.png';
import * as API from '../../Utils/API/index';
import * as Actions from '../../redux/Actions/index.js';
import * as Constants from '../../Utils/Constants.js';
import {Button} from '@material-ui/core';
import {Typography} from '@material-ui/core';
import {useHistory, useParams} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import DateRangeIcon from '@material-ui/icons/DateRange';

const ProfileUserinfo = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const profileInfo = useSelector((state) => state).tweet.profileInfo;
  const userId = JSON.parse(
      localStorage.getItem(Constants.GENERAL_USER_INFO),
  )?.pk;
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
    API.getProfileInfo({id: id})
        .then((response) => {
          dispatch(Actions.setProfileInfo(response.data));
        })
        .catch((error) => {
          console.log('failed to load data');
        });
  }, [id]);
  const date = new Date(profileInfo.date_joined);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dt = date.getDate();

  const handleEditProfileClick = () => {
    history.push('/edit-profile');
  };

  return (
    <Box>
      <Box className="position-relative">
        <img src={image} alt="img" className="profile_cover" />
        <Avatar className="p-avatar" />
      </Box>
      <Box className="text-right p-3">
        {userId == id ? <Button
          onClick={handleEditProfileClick}
          variant="contained"
          color="primary">
              edit profile
        </Button> :
            <Button color="primary" variant="contained">follow</Button>}
      </Box>
      <Box className="px-3">
        <Typography className="fs-25 b-900 lh-1">
          {profileInfo.firstName + ' ' + profileInfo.lastName}
        </Typography>
        <Typography className="color-gray">
          @{profileInfo.username}
        </Typography>
        <Typography className="mt-3">{profileInfo.bio}</Typography>
        <Box display="flex" alignItems="center" className="color-gray">
          <DateRangeIcon fontSize="small" className="mr-1"/>
           Joined
          { ' ' + dt + ' ' +
          monthNumberToLabelMap[month] +
          ' ' + year}
        </Box>
        <Box display="flex" className="mt-2">
          <button type="followers" className="btn-underline">
            <Box component="span" className="p-follower-number">
              {profileInfo.followers_count}
            </Box>
          Followers
          </button>
          <button type="followings" className="btn-underline" >
            <Box component="span" className="p-follower-number">
              {profileInfo.followings_count}
            </Box>
          Followings
          </button>
        </Box>
      </Box>
    </Box>
  );
};
export default ProfileUserinfo;
