import React from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Icon} from '@material-ui/core';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import './UserSearchItem.css';
/* eslint-disable */

export const UserSearchItem = (props) => {
  return (
    <Grid container
      direction="row"
      spacing={6}
      className="usi-container"
      justify="space-between">
      <Grid item xs={12} sm={9} md={10}>
        <div className="usi-avatar-container">
          <Avatar 
          src={props.profileImg}
          className="usi-avatar" 
          alt="avatar"
          />
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
          variant="outlined">
             follow
        </Button>
      </Grid>

      {props.bio != null && <Grid xs={12} item className="usi-item-desc">
        <Typography className="usi-desc">{props.bio}</Typography>
      </Grid>}
    </Grid>
  );
};

UserSearchItem.propTypes = {
  name: PropTypes.string,
  username: PropTypes.string,
  bio: PropTypes.string,
  isPublic: PropTypes.bool,
};
