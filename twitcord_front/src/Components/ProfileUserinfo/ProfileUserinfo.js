/* eslint-disable no-tabs */
/* eslint-disable max-len */
import React, {useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import {useHistory} from 'react-router-dom';
import {Modal, Typography} from '@material-ui/core';
import './ProfileUserinfo.css';
import Fade from '@material-ui/core/Fade';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import image from '../../assets/image.png';
import * as API from '../../Utils/API/index';
import Backdrop from '@material-ui/core/Backdrop';
import PropTypes from 'prop-types';
import * as Actions from '../../redux/Actions/index.js';
import * as Constants from '../../Utils/Constants.js';
import Followers from '../Follows/Followers';
import Requests from '../Follows/Requests';
import Followings from '../Follows/Followings';
const ProfileUserinfo = () => {
  const dispatch = useDispatch();
  const profileInfo = useSelector((state) => state).tweet.profileInfo;
  const followcount = useSelector((state) => state).tweet.followcount;
  let profileId = -1;
  const userGeneralInfo = JSON.parse(localStorage.getItem(Constants.GENERAL_USER_INFO));
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
  const [open, setOpen] = React.useState(false);
  const [Value, setValue] = React.useState(0);
  const history = useHistory();
  const handleOpenfollowers = () => {
    setOpen(true);
    setValue(1);
  };
  const handlerequests = () => {
    setOpen(true);
    setValue(3);
  };
  const handleOpenfollowing = () => {
    setOpen(true);
    setValue(2);
  };
  const handleedit = () =>{
    history.push('/notification');
  };
  const handleClose = () => {
    setOpen(false);
  };
  const body = (
    <div className="paper" xs={12} md={8}>
      {Value === 1 ?( <Followers /> ): Value === 2 ?( <Followings />): ( <Requests/>)}
    </div>
  );
  useEffect(() => {
    API.getProfileInfo({id: profileId})
        .then((response) => {
          dispatch(Actions.setProfileInfo(response.data));
          console.log(profileInfo.is_public);
        })
        .catch((error) => {
          console.log(error);
        });
  }, []);
  useEffect(() => {
    API.followcount({id: profileId})
        .then((response) => {
          dispatch(Actions.setfollowcount(response.data.results[0]));
        })
        .catch((error) => {
          console.log(error);
        });
  }, []);
  const date = new Date(profileInfo.date_joined);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dt = date.getDate();
  return (
    <Grid className="user-info" >
      <Grid container direction="column">
        <Grid item className="grid-item">
          <img src={image} alt="img" className="profile_cover" />
          <Avatar className="avatar" />
        </Grid>
      </Grid>
      <Grid container xs={12}>
        <Grid item className="grid-info1" xs={8}>
          <Grid item className="info1">
            <Typography variant="h5" className="grid-username">
              {profileInfo.username}
            </Typography>
            <Typography className="grid-bio">{profileInfo.bio}{profileInfo.is_public}</Typography>
            <Typography className="grid-joined">
              {' '}
							joined
              {'    ' + dt + '    ' + monthNumberToLabelMap[month] + '    ' + year}
            </Typography>
          </Grid>
          <Grid item>
            <button type="followers" className="followers" onClick={handleOpenfollowers}>
              {'followers' +'   '+ followcount.followers_count}
            </button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className="modal"
              id="1"
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>{body}</Fade>
            </Modal>
            <button type="followings" className="followings" onClick={handleOpenfollowing}>
              {'followings' +'   '+ followcount.followings_count}
            </button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="sim"
              value="followings"
              id="2"
              BackdropComponent={Backdrop}
              className="modal"
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>{body}</Fade>
            </Modal>
            {profileInfo.is_public === false ?(
              <div>
                <button type="requests" className="requests" onClick={handlerequests}>
              requests
                </button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="sim"
                  value="requests"
                  id="2"
                  BackdropComponent={Backdrop}
                  className="modal"
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={open}>{body}</Fade>
                </Modal>
              </div>):(
              <div/>
            )}


          </Grid>
        </Grid>
        <Grid item xs={4}className="grid-info2">
          <Grid className="button-edit">
            {userGeneralInfo !== null && userGeneralInfo.email === profileInfo.email ? (
						<button className="edit-button" onClick={() => handleedit()}>edit </button>
					) : (
						<button className="edit-button">follow</button>
					)}
          </Grid>
        </Grid>
      </Grid>
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
