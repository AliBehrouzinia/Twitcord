/* eslint-disable require-jsdoc */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Icon} from '@material-ui/core';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import * as API from '../../Utils/API/index';
import './UserSearchItem.css';
import * as Constants from '../../Utils/Constants.js';

export const UserSearchItem = (props) => {
  const [followStatus, setFollowStatus] = React.useState(props.status);

  const handleFollowResponse = (status) => {
    if (status == Constants.STATUS_REQUESTED) {
      setFollowStatus(Constants.STATUS_REQUESTED);
    } else {
      setFollowStatus(Constants.STATUS_FOLLOWING);
    }
  };

  const handleFollowClicked = () =>{
    switch (followStatus) {
      case Constants.STATUS_FOLLOW:
        API.follow({request_to: props.id})
            .then((response) => {
              handleFollowResponse(response.data.status);
            }).catch((error) => {

            });
        break;

      case Constants.STATUS_FOLLOWING:
        API.unfollow({id: props.id})
            .then((response) => {
              setFollowStatus(Constants.STATUS_FOLLOW);
            }).catch((error) => {

            });
        break;

      case Constants.STATUS_REQUESTED:
        API.deleteFollowRequest({id: props.id})
            .then((response) => {
              setFollowStatus(Constants.STATUS_FOLLOW);
            }).catch((error) => {

            });
        break;
    }
  };

  return (
    <Grid container
      direction="row"
      spacing={6}
      className="usi-container"
      justify="space-between">
      <Grid item xs={12} sm={9} md={10}>
        <div className="usi-avatar-container">
          <Avatar className="usi-avatar" alt="avatar"/>
          <div className="usi-username-container">
            <div className="usi-name-container">
              <Tooltip title={props.name} placement="top-start">
                <Typography className="usi-name" >{props.name}</Typography>
              </Tooltip>
              {!props.isPublic && <Icon className="usi-lock-icon">lock</Icon>}
            </div>
            <Tooltip title={'@'+props.username} placement="top-start">
              <Typography className="usi-username">
                @{props.username}
              </Typography>
            </Tooltip>
          </div>
        </div>
      </Grid>

      <Grid item xs={12} sm={3} md={2} className="usi-item-follow">
        <Button
          className="usi-follow-button"
          color="primary"
          onClick={handleFollowClicked}
          variant="outlined">
          {followStatus}
        </Button>
      </Grid>

      {(props.bio != null && props.bio != '') &&
       <Grid xs={12} item className="usi-item-desc">
         <Typography className="usi-desc">{props.bio}</Typography>
       </Grid>}
    </Grid>
  );
};

UserSearchItem.propTypes = {
  name: PropTypes.string,
  username: PropTypes.string,
  bio: PropTypes.string,
  id: PropTypes.number,
  isPublic: PropTypes.bool,
  status: PropTypes.string,
};
